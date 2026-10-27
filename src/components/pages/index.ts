import type * as React from "react"
import type { Locale } from "../../i18n"
import { About } from "./about"
import { AdvertisingDisclosure } from "./advertising-disclosure"
import { NoSellShare } from "./NoSellShare"
import { Privacy } from "./privacy"
import { Terms } from "./terms"

export interface PageViewProps { locale: Locale }
export type PageView = React.ComponentType<PageViewProps> & { evafi?: boolean }

// Body of each footer page, by slug (footerLinks in src/i18n.ts). gatsby-node creates /<slug>/ and /es/<slug>/ for each.
export const pageViews: Record<string, PageView> = {
  about: About,
  "advertising-disclosure": AdvertisingDisclosure,
  privacy: Privacy,
  terms: Terms,
  "do-not-sell-or-share": NoSellShare,
}
