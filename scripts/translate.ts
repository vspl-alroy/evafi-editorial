// AI-drafts translations of content/<slug>.md into content/<locale>/<slug>.md. Run with: npx tsx scripts/translate.ts
//
//   (no flags)          translate every English article that has no translation yet -> status=draft
//   --locale es         only this locale (default: all non-default locales)
//   --only <slug>       only this article
//   --force <slug>      regenerate a *draft*; refuses anything reviewed or hand-written
//   --dry-run           print what would be translated, no API call
//   --check             report missing / stale / draft translations (never edits)
//   --check --strict    ...and exit 1 if any draft exists (PR gate: nothing unreviewed gets merged)
//   --fix-hash <slug>   after manually syncing a reviewed file with new English, store the new source hash
//   --selftest          run the structure-validation checks (no API)
//
// Ownership rule: a file is AI-owned only while its first line says `status=draft`. A reviewer flips it to
// `status=reviewed` (or removes the line); from then on this script never writes to it.
import fs from "fs"
import path from "path"
import crypto from "crypto"
import Anthropic from "@anthropic-ai/sdk"
import { parseArticle } from "../src/markdown"
import { defaultLocale, locales } from "../src/i18n"

const CONTENT = path.resolve("content")
const MODEL = "claude-sonnet-5-5"
const META = /^<!--\s*i18n:\s*source=(\w+)\s+status=(draft|reviewed)\s*-->/

const args = process.argv.slice(2)
const flag = (n: string) => args.includes(n)
const opt = (n: string) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined)

const hash = (en: string) => crypto.createHash("sha256").update(en.replace(/\r\n/g, "\n")).digest("hex").slice(0, 12)
const header = (src: string, status: "draft" | "reviewed") => `<!-- i18n: source=${src} status=${status} -->`
const meta = (md: string) => md.match(META)?.slice(1) as [string, "draft" | "reviewed"] | undefined

// Everything that must survive translation unchanged in shape: block structure, images, {State} tokens, Date line.
export function fingerprint(md: string): string | null {
  const v = parseArticle("x", md)
  if (!v) return null
  const blocks = (items: typeof v.intro) =>
    items.map(b => (typeof b === "string" ? "p" : Array.isArray(b) ? `ul${b.length}` : `img:${b.img}`))
  return JSON.stringify({
    hero: v.hero?.img ?? null,
    date: !!v.date,
    intro: blocks(v.intro),
    sections: v.sections.map(s => [blocks(s.body), s.steps?.length ?? 0]),
    state: (md.match(/\{State\}/g) ?? []).length,
    imgs: [...md.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map(m => m[1]),
  })
}

export function validate(en: string, tr: string): string | null {
  const a = fingerprint(en), b = fingerprint(tr)
  if (!b) return 'translation has no "# Title" line'
  return a === b ? null : `structure differs.\nEnglish:     ${a}\nTranslation: ${b}`
}

function system(locale: string) {
  const gf = path.join(CONTENT, "i18n", `glossary.${locale}.json`)
  const glossary = fs.existsSync(gf) ? fs.readFileSync(gf, "utf8") : "{}"
  return `You are a professional translator for US consumer-finance (debt relief) editorial content. Translate the markdown article from English into the language with code "${locale}" (neutral US variant).

Hard rules:
- Output ONLY the translated markdown. No preface, no code fences, no notes.
- Keep the markdown structure identical: same headings (#, ##), same blocks in the same order, same list markers ("- " bullets, "1. " numbered), same blank lines.
- Do not change, translate, add or remove: {State} tokens, image lines (![alt](path)) except the alt text, numbers, currency amounts, percentages, "EvaFi", personal names (e.g. "Allison R."), the "Date:" label (translate only its value).
- Do not add claims, soften or strengthen statements, or drop any disclaimer. Translate faithfully; this is regulated financial copy.
- Use this glossary for these terms (English -> target): ${glossary}`
}

async function translate(en: string, locale: string): Promise<string> {
  const client = new Anthropic()
  let feedback = ""
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 8000,
      system: system(locale),
      messages: [{ role: "user", content: en + feedback }],
    })
    const text = res.content.map(c => (c.type === "text" ? c.text : "")).join("").trim().replace(/^```(?:markdown)?\n|\n```$/g, "")
    const problem = validate(en, text)
    if (!problem) return text
    console.warn(`  attempt ${attempt + 1} rejected: ${problem}`)
    feedback = `\n\n---\nYour previous translation was rejected: ${problem}\nTranslate again, keeping the structure identical.`
  }
  throw new Error("translation failed structure validation twice; nothing written")
}

// --force and --fix-hash act on exactly one article
const only = opt("--only") ?? opt("--force") ?? opt("--fix-hash")
const english = () =>
  fs.readdirSync(CONTENT).filter(f => f.endsWith(".md")).map(f => f.slice(0, -3)).filter(s => !only || s === only)

async function main() {
  const targets = (opt("--locale") ? [opt("--locale")!] : locales.filter(l => l !== defaultLocale)) as string[]
  let draftCount = 0, problems = 0

  for (const locale of targets) {
    const dir = path.join(CONTENT, locale)
    for (const slug of english()) {
      const enText = fs.readFileSync(path.join(CONTENT, `${slug}.md`), "utf8")
      const file = path.join(dir, `${slug}.md`)
      const rel = path.relative(process.cwd(), file)
      const exists = fs.existsSync(file)
      const m = exists ? meta(fs.readFileSync(file, "utf8")) : undefined

      if (flag("--check")) {
        if (!exists) { console.log(`MISSING  ${rel}`); continue }
        if (m?.[0] !== hash(enText) && m) console.log(`STALE    ${rel} (English changed since this was translated, source=${m[0]})`)
        if (m?.[1] === "draft") { draftCount++; console.log(`DRAFT    ${rel} (needs review)`) }
        continue
      }
      if (opt("--fix-hash") === slug) {
        if (!exists || !m) { console.error(`${rel}: no i18n marker to update`); problems++; continue }
        fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace(META, header(hash(enText), m[1])))
        console.log(`updated source hash in ${rel}`)
        continue
      }

      const forced = opt("--force") === slug
      if (exists && !forced) continue // never touch existing files by default
      if (exists && m?.[1] !== "draft") {
        console.error(`REFUSED  ${rel} is ${m ? "reviewed" : "hand-written"}; AI never overwrites it`)
        problems++
        continue
      }
      if (flag("--dry-run")) { console.log(`would translate ${slug} -> ${rel}`); continue }

      console.log(`translating ${slug} -> ${locale} ...`)
      const out = await translate(enText, locale)
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(file, `${header(hash(enText), "draft")}\n${out}\n`)
      console.log(`  wrote ${rel} (draft)`)
    }
    // translations whose English source was deleted
    if (flag("--check") && fs.existsSync(dir))
      for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".md")))
        if (!fs.existsSync(path.join(CONTENT, f))) console.log(`ORPHAN   content/${locale}/${f} (no English source)`)
  }
  if (flag("--check") && flag("--strict") && draftCount) {
    console.error(`\n${draftCount} translation(s) are still status=draft. A reviewer must set status=reviewed.`)
    process.exit(1)
  }
  if (problems) process.exit(1)
}

function selftest() {
  const en = "# T {State}\n\nintro\n\n![a](images/a.png)\n\n## S\n\n- x\n- y\n\n1. one\n2. two\n"
  const ok = "<!-- i18n: source=abc status=draft -->\n# T {State}\n\nintroducción\n\n![b](images/a.png)\n\n## S\n\n- x\n- y\n\n1. uno\n2. dos\n"
  console.assert(validate(en, ok) === null, "good translation passes")
  console.assert(validate(en, ok.replace("- y\n", "")) !== null, "dropped bullet fails")
  console.assert(validate(en, ok.replace("{State}", "Texas")) !== null, "lost {State} fails")
  console.assert(validate(en, ok.replace("images/a.png", "images/b.png")) !== null, "changed image fails")
  console.assert(validate(en, ok.replace("## S", "## S\n\nextra")) !== null, "added paragraph fails")
  console.assert(validate(en, "no title") !== null, "no title fails")
  console.assert(meta("<!-- i18n: source=abc123 status=reviewed -->\n# x")?.[1] === "reviewed", "meta parses")
  console.assert(hash("a\r\nb") === hash("a\nb"), "hash ignores CRLF")
  console.log("selftest ok")
}

if (flag("--selftest")) selftest()
else main().catch(e => { console.error(e.message); process.exit(1) })
