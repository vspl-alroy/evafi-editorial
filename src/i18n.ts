// Locales and UI strings. Article text comes from content/<locale>/<slug>.md, everything else from here.
// Add a language: add the code to `locales`, a block to `ui`, and content/i18n/glossary.<code>.json (see scripts/translate.ts).

export const locales = ["en", "es"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

// Absolute URLs are required by hreflang. Set GATSBY_SITE_URL when the custom domain is live.
export const SITE_URL = (process.env.GATSBY_SITE_URL ?? "https://vspl-alroy.github.io").replace(/\/$/, "")

export const localePath = (locale: string, slug = "") =>
  `${locale === defaultLocale ? "" : `/${locale}`}/${slug ? `${slug}/` : ""}`

export interface Alternate { locale: Locale; path: string }

export interface UI {
  name: string // language name in its own language, for the switcher
  brand: string
  trusted: string
  secure: string
  privacy: string
  footerLinks: string[]
  news: string
  cta: string
  dateline: string
  defaultDate: string
  defaultState: string // replaces {State} until ?state= is read
  steps: string[]
}

export const ui: Record<Locale, UI> = {
  en: {
    name: "English",
    brand: "Debt News USA",
    trusted: "Trusted source of news",
    secure: "Secure & encrypted",
    privacy: "Your privacy matters",
    footerLinks: ["About", "Privacy Policy", "Terms of Use", "CA Privacy Policy", "Do Not Sell or Share", "E-Comm Consent", "Advertiser Disclosure"],
    news: "Todays Financial News",
    cta: "Take EvaFi's Free Quiz",
    dateline: "WeeklyFinancialNews.com",
    defaultDate: "September 30, 2026",
    defaultState: "your state",
    steps: ["Answer a few questions", "See your estimate", "Decide if it's right for you"],
  },
  // AI draft: needs native + compliance review before it is relied on.
  es: {
    name: "Español",
    brand: "Debt News USA",
    trusted: "Fuente de noticias confiable",
    secure: "Seguro y cifrado",
    privacy: "Tu privacidad es importante",
    footerLinks: ["Acerca de", "Política de privacidad", "Términos de uso", "Política de privacidad de CA", "No vender ni compartir", "Consentimiento de comunicaciones electrónicas", "Divulgación del anunciante"],
    news: "Noticias financieras de hoy",
    cta: "Haz el cuestionario gratuito de EvaFi",
    dateline: "WeeklyFinancialNews.com",
    defaultDate: "30 de septiembre de 2026",
    defaultState: "tu estado",
    steps: ["Responde unas preguntas", "Mira tu estimación", "Decide si es para ti"],
  },
}
