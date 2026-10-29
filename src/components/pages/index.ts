import type * as React from "react"
import type { Locale } from "../../i18n"
import { About } from "./about"
import { AdvertisingDisclosure } from "./advertising-disclosure"
import { CaliforniaPolicy } from "./california-policy"
import { EConsent } from "./esign-consent"
import { NoSellShare } from "./NoSellShare"
import { PrivacyPolicy } from "./privacy-policy"
import { Terms } from "./terms"

export interface PageViewProps { locale: Locale }
// ownLayout: the page renders its own title and layout (legal pages: Table of Contents + sections, .evafi-legal styles).
// Without it, templates/page.tsx shows the footer label as <h1> and the component in an article column.
export type PageView = React.ComponentType<PageViewProps> & { ownLayout?: boolean }

// Body of each footer page, by slug (footerLinks in src/i18n.ts). gatsby-node creates /<slug>/ and /es/<slug>/ for each.
export const pageViews: Record<string, PageView> = {
  about: About,
  "advertising-disclosure": AdvertisingDisclosure,
  "privacy-policy": PrivacyPolicy,
  terms: Terms,
  "california-policy": CaliforniaPolicy,
  "do-not-sell-or-share": NoSellShare,
  "esign-consent": EConsent,
}
