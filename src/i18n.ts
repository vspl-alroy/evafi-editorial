// Locales and UI strings. Article text comes from content/<locale>/<slug>.md, everything else from here.
// Add a language: add the code to `locales` and a block to `ui`, then put articles in content/<code>/.

export const locales = ["en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

// Absolute URLs are required by hreflang. Set GATSBY_SITE_URL when the custom domain is live.
export const SITE_URL = (process.env.GATSBY_SITE_URL ?? "https://relintex.github.io/evafi-editorial").replace(/\/$/, "")

export const localePath = (locale: string, slug = "") =>
  `${locale === defaultLocale ? "" : `/${locale}`}/${slug ? `${slug}/` : ""}`

export interface Alternate { locale: Locale; path: string }

export interface UI {
  name: string // language name in its own language, for the switcher
  brand: string
  stats: { k: string; v: string; src: string }[] // "By the numbers" strip under the masthead
  statsLabel: string
  ad: string
  discLink: string // masthead link that opens the Advertiser Disclosure popup
  discClose: string
  readTime: string // {n} = minutes
  part: string // {i} of {n}
  toc: string
  nextStep: string
  disclosure: string
  statement: string[] // labels of the card-statement illustration, see the "statement" box
  footerLinks: { label: string; slug: string }[] // each slug is a page /<slug>/, body registered in src/components/pages/index.ts
  author: string
  authorName: string
  updated: string
  updatedValue: string
  description: string // home page <meta name="description">
  news: string
  notFound: string
  notFoundText: string
  readThese: string
  goHome: string
  cta: string
  defaultDate: string
  defaultState: string // replaces {State} until ?state= is read
}

export const ui: Record<Locale, UI> = {
  en: {
    name: "English",
    brand: "Debt Advice 101",
    statsLabel: "By the numbers",
    stats: [
      { k: "Total U.S. card debt", v: "$1.252T", src: "NY Fed, Q1 2026" },
      { k: "Avg. balance per cardholder", v: "$7,886", src: "LendingTree, Q3 2025" },
      { k: "Avg. APR, accruing balances", v: "22.15%", src: "Federal Reserve, Q2 2026" },
      { k: "Balances 30+ days delinquent", v: "2.92%", src: "NY Fed, Q1 2026" },
    ],
    ad: "Advertisement",
    discLink: "Advertiser Disclosure",
    discClose: "Close",
    readTime: "{n} min read",
    part: "Question {i} of {n}",
    toc: "In this explainer",
    nextStep: "Next step",
    statement: ["CARD STATEMENT", "Account ending in ••••", "New balance", "Minimum payment due", "Purchase APR", "Late Payment Warning:", "If we do not receive your minimum payment by the date listed above, you may have to pay a late fee and your APRs may be increased.", "Minimum Payment Warning", "If you make only the minimum payment each period, you will pay more in interest and it will take you longer to pay off your balance.", "If you make no additional charges using this card and each month you pay…", "You will pay off the balance shown on this statement in about…", "And you will end up paying an estimated total of…"],
    disclosure: "This article is paid advertising content from Debt Advice 101, a service that connects people with debt consolidation options through its financial partners. The Debt Consolidation Check is operated by Debt Advice 101. This content is for general information only and is not financial, legal or tax advice. Rates, terms and eligibility vary.",
    footerLinks: [
      { label: "About", slug: "about" },
      { label: "Advertising disclosure", slug: "advertising-disclosure" },
      { label: "Privacy Policy", slug: "privacy-policy" },
      { label: "Terms", slug: "terms" },
      { label: "CA Privacy Policy", slug: "california-policy" },
      { label: "Do Not Sell or Share", slug: "do-not-sell-or-share" },
      { label: "E-Comm Consent", slug: "esign-consent" },
    ],
    author: "Author",
    authorName: "EvaFi Editorial team",
    updated: "Updated",
    updatedValue: "This week",
    description: "News and guides about credit card debt and the options for getting out of it.",
    news: "Todays Financial News",
    notFound: "Page not found",
    notFoundText: "We couldn't find the page you were looking for. It may have moved or the link may be wrong.",
    readThese: "Articles you can read",
    goHome: "Back to the home page",
    cta: "Take EvaFi's Free Quiz",
    defaultDate: "September 30, 2026",
    defaultState: "your state",
  },
}
