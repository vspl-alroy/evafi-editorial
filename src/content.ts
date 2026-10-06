// Page shape produced by src/markdown.ts from content/<slug>.md.
// A body item is a paragraph, an array of lines rendered with no gap between them (bullets), or an image.

import type { Alternate, Locale } from "./i18n"

// img = the uploaded file. gatsby-node adds the optimised variants (see processImages):
// srcSet (WebP, several widths), width/height of the original, share = largest variant (for og:image).
export interface Img { img: string; alt: string; srcSet?: string; width?: number; height?: number; share?: string }
export interface Btn { btn: string; href: string } // a link alone on a line: button with the writer's text
export type BodyItem = string | string[] | Img | Btn

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
