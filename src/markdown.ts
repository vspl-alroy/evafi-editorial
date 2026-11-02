import type { BodyItem, Box, Cta, Btn, Img, Section, Variant } from "./content"

// Subset of markdown: # title, text before first ## = intro, ## = section, "- " = bullets, "1. " = steps.
// Optional "Date: October 6, 2026" line under the title sets the dateline.
// Image on its own line: ![alt](images/x.png), path relative to content/. First one right under the # title = hero.
// A link alone on a line anywhere else, [Text](https://...), renders as a button with that text.
// Quiz link: the LAST line of the file, alone: "@quiz-link:https://..." (http/https only).
//   It becomes the CTA button (and is removed from the text). No line = no button.
// Optional header lines under the title: Date, Kicker, Byline (parts split by " | "), Description, Tracking.
//   Stats: label | value | source ;; label | value | source   replaces the "By the numbers" strip on this page.
//   Part labels: off                                           hides "Question 1 of 4" above each section.
//   Alt headlines: second headline || third headline          } together with the # title and the top image
//   Alt heroes: images/b.jpg | alt text || images/c.jpg | alt  } one URL, the variant is picked from ?utm_content, see expandVariants.
// Inline text may use **bold** and [links](https://... or #anchor); they render in the template, the parser keeps raw text.
// An image block may carry a caption on the next line: "Caption text | Credit".
// Boxes: "::: name optional heading" ... ":::" (see docs/adding-an-article.md): takeaways, stat, statement, tip, ways,
//   check, next, rail, soft, related, method. check/next/soft/related/method close the article, rail is the side CTA.
//   Also split (two-part bar + legend), quiz (question with answer buttons, or a button), link (tracked line mid-article).
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

  // blocks are separated by blank lines; a "::: name" ... ":::" box stays one block
  const blocks = (text: string) => {
    const out: string[] = []
    let cur: string[] = []
    let inBox = false
    const flush = () => { const b = cur.join("\n").trim(); if (b) out.push(b); cur = [] }
    for (const l of text.split("\n")) {
      if (!inBox && /^:::\s*\S/.test(l.trim())) { flush(); inBox = true; cur.push(l.trim()) }
      else if (inBox && l.trim() === ":::") { cur.push(":::"); flush(); inBox = false }
      else if (!inBox && !l.trim()) flush()
      else cur.push(inBox ? l.trim() : l)
    }
    flush()
    return out
  }
  const lines = (b: string) => b.split("\n").map(l => l.trim())
  const isList = (b: string, re: RegExp) => lines(b).every(l => re.test(l))
  const image = (b: string): Img | null => {
    const [first, cap, ...more] = lines(b)
    const m = more.length === 0 && first.match(/^!\[(.*)\]\((.+)\)$/)
    if (!m) return null
    const [caption, credit] = (cap ?? "").split(/\s+\|\s+/)
    return { img: "/content/" + encodeURI(m[2].trim().replace(/^\.?\//, "")), alt: m[1], ...(caption && { caption }), ...(credit && { credit }) }
  }
  const box = (b: string): Box | null => {
    const m = b.match(/^::: *(\S+)[ \t]*(.*)\n([\s\S]*)\n:::$/)
    if (!m) return null
    const [, name, arg, inner] = m
    const ls = lines(inner).filter(Boolean)
    const items = ls.filter(l => l.startsWith("- ")).map(l => l.slice(2))
    const para = ls.filter(l => !l.startsWith("- ") && !/^(Callout|Note|Link|Check|How it works|Source):/i.test(l))
    const kv = (k: string) => ls.find(l => l.toLowerCase().startsWith(k.toLowerCase() + ":"))?.slice(k.length + 1).trim() ?? ""
    const link = para.join(" ").match(/\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/)
    switch (name) {
      case "takeaways": return { box: "takeaways", h: arg, items }
      case "stat": { const [num, of] = (para[0] ?? "").split(/\s+\|\s+/); return { box: "stat", num, of: of ?? "", cap: para.slice(1).join(" ") } }
      case "statement": return { box: "statement", alt: kv("Alt"), balance: kv("Balance"), minimum: kv("Minimum"), apr: kv("APR"), caption: kv("Caption"), rows: items.map(r => r.split(/\s+\|\s+/)) }
      case "tip": return { box: "tip", h: arg, text: para.join(" "), items, src: kv("Source") }
      case "split": {
        const bars = items.map(i => { const [h, w] = i.split(/\s+\|\s+/); return { h, w: Number(w) || 1 } })
        return { box: "split", h: arg, sub: para[0] ?? "", bars, callout: kv("Callout"), note: kv("Note") }
      }
      case "quiz": {
        const btn = para.map(l => l.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/)).find(Boolean)
        const text = para.filter(l => !/^\[[^\]]+\]\(https?:/.test(l))
        const options = items.map(i => { const [h, a] = i.split(/\s+\|\s+/); return { h, a: a ?? "" } })
        const href = btn?.[2] ?? kv("Link")
        return { box: "quiz", k: arg, meta: text[0] ?? "", h: text[1] ?? "", lead: text[2] ?? "", items: options, href: /^https?:\/\//.test(href) ? href : "", button: btn?.[1].trim() ?? "", check: kv("Check"), how: kv("How it works") }
      }
      case "link": return { box: "link", cta: arg, text: para.join(" ") }
      case "ways": return { box: "ways", items }
      case "check": {
        const steps = items.map(i => { const [h, ...t] = i.replace(/^!\s*/, "").split(/\s+\|\s+/); return { h, text: t.join(" | "), flag: i.startsWith("!") } })
        const after = ls.slice(ls.reduce((n, l, i) => (l.startsWith("- ") ? i : n), -1) + 1)
        return { box: "check", h: arg, p: para[0] ?? "", steps, cta: steps.length ? after.join(" ") : "" }
      }
      case "next": case "rail": return { box: name, k: arg, h: para[0] ?? "", d: para.length > 2 ? para[1] : "", go: link?.[1] ?? "", href: link?.[2] ?? "" }
      case "soft": case "related": return { box: name, text: para.join(" ") }
      case "method": return { box: "method", h: arg, text: para.join(" "), items }
    }
    return null
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
      const bx = b.startsWith(":::") ? box(b) : null
      if (bx) out.body.push(bx)
      else if (img) out.body.push(img)
      else if (btn) out.body.push(btn)
      else if (isList(b, /^\d+\. /)) out.steps = lines(b).map(l => l.replace(/^\d+\. /, ""))
      else if (isList(b, /^[-*] /)) out.body.push(lines(b).map(l => "•  " + l.slice(2)))
      else out.body.push(lines(b).join(" "))
    }
    return out
  }

  // boxes that close the article move out of the last section
  const CLOSING = ["check", "next", "soft", "related", "method", "rail"]
  const isClosing = (i: BodyItem) => typeof i === "object" && !Array.isArray(i) && "box" in i && CLOSING.includes(i.box)
  const sections: Section[] = rest.map(s => {
    const [h, ...r] = s.split("\n")
    return { h: h.trim(), ...body(r.join("\n")) }
  })
  const outro = sections.flatMap(s => s.body.filter(isClosing)) as Box[]
  for (const s of sections) s.body = s.body.filter(i => !isClosing(i))
  const introBoxes = (items: BodyItem[]) => items.filter(isClosing) as Box[]
  const field = (k: string) => head.match(new RegExp(`^${k}:[ \\t]*(.+)$`, "im"))?.[1].trim()
  const date = field("Date")
  const kicker = field("Kicker")
  const byline = field("Byline")?.split(/\s+\|\s+/)
  const description = field("Description")
  const tracking = field("Tracking")
  const stats = field("Stats")?.split(/\s+;;\s+/).map(s => { const [k, v, src] = s.split(/\s+\|\s+/); return { k, v, src: src ?? "" } })
  const partLabels = field("Part labels")?.toLowerCase() === "off" ? false : undefined
  const titles = field("Alt headlines")?.split(/\s+\|\|\s+/) ?? []
  const heroes = (field("Alt heroes")?.split(/\s+\|\|\s+/) ?? []).map(s => { const [src, alt] = s.split(/\s+\|\s+/); return { img: "/content/" + encodeURI(src.trim().replace(/^\.?\//, "")), alt: alt ?? "" } })
  const intro = body(head.replace(/^# .+$/m, "").replace(/^(Date|Kicker|Byline|Description|Tracking|Stats|Part labels|Alt headlines|Alt heroes):.*$/gim, "")).body
  outro.unshift(...introBoxes(intro))
  for (let i = intro.length - 1; i >= 0; i--) if (isClosing(intro[i])) intro.splice(i, 1)
  const ri = outro.findIndex(i => i.box === "rail")
  const rail = ri >= 0 ? (outro.splice(ri, 1)[0] as Cta) : undefined
  const first = intro[0]
  const hero = first && typeof first === "object" && "img" in first ? (intro.shift() as Img) : undefined
  const alt = titles.length || heroes.length ? { titles, heroes } : undefined
  return { slug, label: slug, date, kicker, byline, description, tracking, stats, partLabels, alt, cta, title, hero, intro, sections, outro: outro.length ? outro : undefined, rail }
}

// A page with "Alt headlines:" and/or "Alt heroes:" stays ONE page (same URL) and lists every headline x hero pair in `variants`:
// 1a = # title + top image, 1b = second image, 2a = second headline + top image, ... (just a, b, c when there is one headline).
// The template picks the variant whose key the ?utm_content ends with (...2b).
export function expandVariants(v: Variant): Variant[] {
  if (!v.alt) return [v]
  const titles = [v.title, ...v.alt.titles]
  const heroes = [v.hero, ...v.alt.heroes.map(h => ({ ...h, caption: v.hero?.caption, credit: v.hero?.credit }))]
  const variants = titles.flatMap((title, i) => heroes.map((hero, j) => ({ key: (titles.length > 1 ? String(i + 1) : "") + String.fromCharCode(97 + j), title, hero })))
  return [{ ...v, alt: undefined, variants }]
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
  const bx = parseArticle("x", "# T\n\nKicker: A · B\nByline: 6 min | Data: **x** · [S](#s)\n\n![a](images/h.png)\nCap text | Credit\n\ndek\n\n::: takeaways Short\n- one **b**\n- two\n:::\n\n## Q\n\n::: stat\n$1 | of $2\nwhy\n:::\n\n::: check Try\nIntro\n- Lower | ok\n- ! Same | hmm\nIf [x](https://a.com)\n:::\n\n::: next Next step\nHead\nDesc\n[Go](https://a.com/c)\n:::\n\n::: rail Next step\nHead\n[Go](https://a.com/c)\n:::\n")!
  console.assert(bx.kicker === "A · B" && bx.byline?.length === 2 && bx.hero?.caption === "Cap text" && bx.hero.credit === "Credit", "header lines + caption")
  console.assert(JSON.stringify(bx.intro[1]) === '{"box":"takeaways","h":"Short","items":["one **b**","two"]}', "takeaways box")
  console.assert(bx.sections[0].body.length === 1 && (bx.sections[0].body[0] as { box: string }).box === "stat", "closing boxes leave the section")
  console.assert(bx.outro?.map(o => o.box).join() === "check,next" && bx.rail?.href === "https://a.com/c" && bx.rail.d === "", "outro + rail")
  const ck = bx.outro![0] as Extract<Box, { box: "check" }>
  console.assert(ck.steps.length === 2 && ck.steps[1].flag && ck.cta === "If [x](https://a.com)", "check box")
  console.assert((bx.outro![1] as Cta).d === "Desc", "next box")
  const vs = expandVariants(parseArticle("adv", "# H1\n\nAlt headlines: H2\nAlt heroes: images/b.png | Bee || images/c.png | Sea\n\n![Ay](images/a.png)\nCap | Credit\n\ndek\n\n## S\n\ntext\n")!)
  const vk = vs[0].variants!
  console.assert(vs.length === 1 && vs[0].slug === "adv" && vk.map(x => x.key).join() === "1a,1b,1c,2a,2b,2c", "one page, variant keys")
  console.assert(vk[4].title === "H2" && vk[4].hero?.img === "/content/images/b.png" && vk[4].hero.caption === "Cap" && vk[3].hero?.alt === "Ay", "variant pairing")
  console.assert(vs[0].title === "H1" && vs[0].intro.length === 1 && vs[0].sections[0].body[0] === "text", "body shared, header lines not in text")
  console.assert(expandVariants(parseArticle("x", "# T\n\nAlt heroes: images/b.png\n")!)[0].variants!.map(x => x.key).join() === "a,b", "one headline: letter keys")
  console.assert(expandVariants(parseArticle("x", "# T\n")!).length === 1, "no alternates, one page")
  const nb = parseArticle("x", "# T\n\nStats: A | 1 | s1 ;; B | 2 | s2\n\n## S\n\n::: split Title\nSub\n- **$3** Int | 3\n- **$2** Bal | 2\nCallout: Pay $5. | Only $2.\nNote: n\n:::\n\n::: quiz Start\nFree\nHow much?\n- Under $5k | under-5k\nLink: https://a.com/c\nCheck: tap\n:::\n\n::: quiz Opts\nFree\nNot sure?\nPitch\n[Go](https://a.com/d)\nHow it works: x\n:::\n\n::: tip Good\n- one\nSource: CFPB\n:::\n\n::: link intro_link\nHi [Go](https://a.com/e)\n:::\n")!
  console.assert(parseArticle("x", "# T\n\nPart labels: off\n")!.partLabels === false && nb.partLabels === undefined, "part labels")
  console.assert(nb.stats?.length === 2 && nb.stats[1].v === "2", "stats line")
  const [sp, qz, qb, tp, ln] = nb.sections[0].body as Box[]
  console.assert(JSON.stringify(sp) === '{"box":"split","h":"Title","sub":"Sub","bars":[{"h":"**$3** Int","w":3},{"h":"**$2** Bal","w":2}],"callout":"Pay $5. | Only $2.","note":"n"}', "split box")
  console.assert(qz.box === "quiz" && qz.items[0].a === "under-5k" && qz.href === "https://a.com/c" && qz.h === "How much?" && qz.check === "tap", "quiz options")
  console.assert(qb.box === "quiz" && qb.button === "Go" && qb.href === "https://a.com/d" && qb.lead === "Pitch" && qb.how === "x" && qb.items.length === 0, "quiz button")
  console.assert(tp.box === "tip" && tp.items[0] === "one" && tp.src === "CFPB" && tp.text === "", "tip list")
  console.assert(ln.box === "link" && ln.cta === "intro_link" && ln.text === "Hi [Go](https://a.com/e)", "link box")
  console.assert(parseArticle("x", "no title") === null)
  console.log("ok")
}
