import type { BodyItem, Img, Section, Variant } from "./content"

// Subset of markdown: # title, text before first ## = intro, ## = section, "- " = bullets, "1. " = steps.
// Optional "Date: October 6, 2026" line under the title sets the dateline.
// Image on its own line: ![alt](images/x.png), path relative to content/. First one right under the # title = hero.
// ponytail: no inline markdown (bold/links); add `marked` if writers need it.
export function parseArticle(slug: string, md: string): Variant | null {
  // <!-- ... --> lines are metadata (see scripts/translate.ts), not content
  const [head, ...rest] = md.replace(/\r\n/g, "\n").replace(/^<!--.*-->[ \t]*$/gm, "").split(/^## /m)
  const title = head.match(/^# (.+)$/m)?.[1].trim()
  if (!title) return null

  const blocks = (text: string) => text.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean)
  const lines = (b: string) => b.split("\n").map(l => l.trim())
  const isList = (b: string, re: RegExp) => lines(b).every(l => re.test(l))
  const image = (b: string): Img | null => {
    const m = b.match(/^!\[(.*)\]\((.+)\)$/)
    return m ? { img: "/content/" + encodeURI(m[2].trim().replace(/^\.?\//, "")), alt: m[1] } : null
  }
  const body = (text: string): { body: BodyItem[]; steps?: string[] } => {
    const out: { body: BodyItem[]; steps?: string[] } = { body: [] }
    for (const b of blocks(text)) {
      const img = image(b)
      if (img) out.body.push(img)
      else if (isList(b, /^\d+\. /)) out.steps = lines(b).map(l => l.replace(/^\d+\. /, ""))
      else if (isList(b, /^[-*] /)) out.body.push(lines(b).map(l => "•  " + l.slice(2)))
      else out.body.push(lines(b).join(" "))
    }
    return out
  }

  const sections: Section[] = rest.map(s => {
    const [h, ...r] = s.split("\n")
    return { h: h.trim(), ...body(r.join("\n")) }
  })
  const date = head.match(/^Date:\s*(.+)$/im)?.[1].trim()
  const intro = body(head.replace(/^# .+$/m, "").replace(/^Date:.*$/im, "")).body
  const first = intro[0]
  const hero = first && typeof first === "object" && !Array.isArray(first) ? (intro.shift() as Img) : undefined
  return { slug, label: slug, newsroom: true, date, title, hero, intro, sections }
}

if (process.argv[1]?.endsWith("markdown.ts")) {
  const v = parseArticle("x", "# T\n\nintro a\nstill a\n\nintro b\n\n## S1\n\ntext\n\n- a\n- b\n\n1. one\n2. two\n\n## S2\n\nz\n")!
  console.assert(v.title === "T" && v.intro.length === 2 && v.intro[0] === "intro a still a")
  console.assert(v.sections.length === 2 && v.sections[0].h === "S1")
  console.assert(JSON.stringify(v.sections[0].body[1]) === '["•  a","•  b"]')
  console.assert(v.sections[0].steps?.join() === "one,two" && v.sections[1].body[0] === "z")
  const h = parseArticle("x", "# T\n\n![a b](images/h 1.png)\n\nhi\n\n![c](./images/c.png)\n\n## S\n\n![d](/images/d.png)\n")!
  console.assert(h.hero?.img === "/content/images/h%201.png" && h.hero.alt === "a b" && h.intro.length === 2)
  console.assert(typeof h.intro[1] === "object" && h.sections[0].body.length === 1)
  console.assert(parseArticle("x", "# T\n\nDate: May 1, 2026\n\nhi\n")?.date === "May 1, 2026")
  console.assert(parseArticle("x", "no title") === null)
  console.log("ok")
}
