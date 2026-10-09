// Page shape produced by src/markdown.ts from content/<slug>.md.
// A body item is a paragraph, an array of lines rendered with no gap between them (bullets), or an image.

import type { Alternate, Locale } from "./i18n"

// img = the uploaded file. gatsby-node adds the optimised variants (see processImages):
// srcSet (WebP, several widths), width/height of the original, share = largest variant (for og:image).
export interface Img { img: string; alt: string; caption?: string; credit?: string; srcSet?: string; width?: number; height?: number; share?: string }
export interface Btn { btn: string; href: string } // a link alone on a line: button with the writer's text
// Boxes: "::: name" blocks (see src/markdown.ts). Inline text may hold **bold** and [links](https://...).
export interface Cta { box: "next" | "rail"; k: string; h: string; d: string; go: string; href: string }
export type Box =
  | { box: "takeaways"; h: string; items: string[] }
  | { box: "stat"; num: string; of: string; cap: string }
  | { box: "statement"; alt: string; balance: string; minimum: string; apr: string; rows: string[][]; caption: string }
  | { box: "tip"; h: string; text: string }
  | { box: "ways"; items: string[] }
  | { box: "check"; h: string; p: string; steps: { h: string; text: string; flag: boolean }[]; cta: string }
  | Cta
  | { box: "soft" | "related"; text: string }
  | { box: "method"; h: string; text: string; items: string[] }
export type BodyItem = string | string[] | Img | Btn | Box

export interface Section {
  h: string
  body: BodyItem[]
  steps?: string[]
  tight?: boolean
}

// Card in "Todays Financial News": another article, never the one being read.
export interface Teaser { slug: string; title: string; img?: string; srcSet?: string; text: string }

export interface Variant {
  slug: string
  label: string
  title: string
  hero?: Img
  date?: string // dateline text, e.g. "October 6, 2026"
  kicker?: string // "Kicker:" line
  byline?: string[] // "Byline:" line, parts split by " | "
  description?: string // "Description:" line, <meta name="description">
  tracking?: string // "Tracking:" page id for analytics events, default = slug
  outro?: Box[] // boxes that close the article (check, next, soft, related, method), in file order
  rail?: Cta // side-rail call to action
  cta?: { href: string; label?: string } // quiz link, from the last line of the markdown file
  intro: BodyItem[]
  sections: Section[]
  more?: Teaser[]
  locale?: Locale
  alternates?: Alternate[] // every language this page exists in, including itself
}

// First plain paragraph, cut at a word boundary: card text and <meta name="description">.
export function excerpt(items: BodyItem[], max: number): string {
  const first = items.find((b): b is string => typeof b === "string") ?? ""
  return first.length > max ? first.slice(0, max).replace(/\s+\S*$/, "") + "…" : first
}
