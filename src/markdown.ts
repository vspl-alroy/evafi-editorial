import type { BodyItem, Btn, Img, Section, Variant } from "./content"

// Subset of markdown: # title, text before first ## = intro, ## = section, "- " = bullets, "1. " = steps.
// Optional "Date: October 6, 2026" line under the title sets the dateline.
// Image on its own line: ![alt](images/x.png), path relative to content/. First one right under the # title = hero.
// A link alone on a line anywhere else, [Text](https://...), renders as a button with that text.
// Quiz link: the LAST line of the file, alone: "@quiz-link:https://..." (http/https only).
//   It becomes the CTA button (and is removed from the text). No line = no button.
// ponytail: no inline markdown (bold/links); add `marked` if writers need it.
export function parseArticle(slug: string, md: string): Variant | null {
  // <!-- ... --> lines are comments, not content
  let text = md.replace(/\r\n/g, "\n").replace(/^<!--.*-->[ \t]*$/gm, "").trimEnd()
  let cta: Variant["cta"]
  const last = text.match(/(?:^|\n)[ \t]*(?:\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/\S+))[ \t]*$/)
  if (last) {
    cta = { href: last[2] ?? last[3], label: last[1]?.trim() || undefined }
    text = text.slice(0, last.index).trimEnd()
  }
  const [head, ...rest] = text.split(/^## /m)
  const title = head.match(/^# (.+)$/m)?.[1].trim()
  if (!title) return null

  const blocks = (text: string) => text.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean)
  const lines = (b: string) => b.split("\n").map(l => l.trim())
  const isList = (b: string, re: RegExp) => lines(b).every(l => re.test(l))
  const image = (b: string): Img | null => {
    const m = b.match(/^!\[(.*)\]\((.+)\)$/)
    return m ? { img: "/content/" + encodeURI(m[2].trim().replace(/^\.?\//, "")), alt: m[1] } : null
  }
  const button = (b: string): Btn | null => {
    const m = b.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/)
    return m ? { btn: m[1].trim(), href: m[2] } : null
  }
  const body = (text: string): { body: BodyItem[]; steps?: string[] } => {
    const out: { body: BodyItem[]; steps?: string[] } = { body: [] }
    for (const b of blocks(text)) {
      const img = image(b)
      const btn = button(b)
      if (img) out.body.push(img)
      else if (btn) out.body.push(btn)
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
  const hero = first && typeof first === "object" && "img" in first ? (intro.shift() as Img) : undefined
  return { slug, label: slug, date, cta, title, hero, intro, sections }
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
  const q = parseArticle("x", "# T\n\nhi\n\n## S\n\ntext\n\n[Start the quiz](https://example.com/quiz?a=1)\n")!
  console.assert(q.cta?.href === "https://example.com/quiz?a=1" && q.cta.label === "Start the quiz", "markdown link")
  console.assert(q.sections[0].body.length === 1 && q.sections[0].body[0] === "text", "link removed from text")
  const bare = parseArticle("x", "# T\n\n## S\n\ntext\n\nhttps://example.com/q\n")!
  console.assert(bare.cta?.href === "https://example.com/q" && bare.cta.label === undefined, "bare url")
  console.assert(parseArticle("x", "# T\n\n## S\n\nsee [docs](https://a.com) for more\n")!.cta === undefined, "inline link is not a CTA")
  console.assert(parseArticle("x", "# T\n\n## S\n\ntext\n\n[x](javascript:alert(1))\n")!.cta === undefined, "only http(s)")
  const mid = parseArticle("x", "# T\n\nintro\n\n[Check if you qualify](https://a.com/q)\n\n## S\n\ntext\n\n[Go](https://b.com)\n\nmore text\n\n[Main quiz](https://c.com/quiz)\n")!
  console.assert(JSON.stringify(mid.intro[1]) === '{"btn":"Check if you qualify","href":"https://a.com/q"}', "intro button")
  console.assert(JSON.stringify(mid.sections[0].body) === '["text",{"btn":"Go","href":"https://b.com"},"more text"]', "section button")
  console.assert(mid.cta?.href === "https://c.com/quiz", "last line is still the main CTA")
  console.assert(parseArticle("x", "# T\n\nsee [here](https://a.com) now\n")!.intro[0] === "see [here](https://a.com) now", "inline link stays text")
  console.assert(parseArticle("x", "# T\n\n[x](javascript:alert(1))\n")!.intro[0] === "[x](javascript:alert(1))", "only http(s)")
  console.assert(parseArticle("x", "no title") === null)
  console.log("ok")
}
