// Page shape produced by src/markdown.ts from content/<slug>.md.
// A body item is a paragraph, an array of lines rendered with no gap between them (bullets), or an image.

import type { Alternate, Locale } from "./i18n"

export interface Img { img: string; alt: string }
export interface Btn { btn: string; href: string } // a link alone on a line: button with the writer's text
export type BodyItem = string | string[] | Img | Btn

export interface Section {
  h: string
  body: BodyItem[]
  steps?: string[]
  tight?: boolean
}

// Card in "Todays Financial News": another article, never the one being read.
export interface Teaser { slug: string; title: string; img?: string; text: string }

export interface Variant {
  slug: string
  label: string
  title: string
  hero?: Img
  date?: string // dateline text, e.g. "October 6, 2026"
  cta?: { href: string; label?: string } // quiz link, from the last line of the markdown file
  newsroom?: boolean // news-site theme (markdown pages)
  intro: BodyItem[]
  sections: Section[]
  more?: Teaser[]
  locale?: Locale
  alternates?: Alternate[] // every language this page exists in, including itself
}
