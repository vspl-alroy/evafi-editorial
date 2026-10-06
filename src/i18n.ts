// Locales and UI strings. Article text comes from content/<locale>/<slug>.md, everything else from here.
// Add a language: add the code to `locales` and a block to `ui`, then put articles in content/<code>/.

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
  author: string
  authorName: string
  updated: string
  updatedValue: string
  description: string // home page <meta name="description">
  news: string
  notFound: string
  notFoundText: string
  readThese: string
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
    author: "Author",
    authorName: "EvaFi Editorial team",
    updated: "Updated",
    updatedValue: "This week",
    description: "News and guides about credit card debt and the options for getting out of it.",
    news: "Todays Financial News",
    notFound: "Page not found",
    notFoundText: "We couldn't find the page you were looking for. It may have moved or the link may be wrong.",
    readThese: "Articles you can read",
    cta: "Take EvaFi's Free Quiz",
    dateline: "WeeklyFinancialNews.com",
    defaultDate: "September 30, 2026",
    defaultState: "your state",
    steps: ["Answer a few questions", "See your results", "Learn about your options"],
  },
  // TODO: have a native speaker review these UI strings.
  es: {
    name: "Español",
    brand: "Debt News USA",
    trusted: "Fuente de noticias confiable",
    secure: "Seguro y cifrado",
    privacy: "Tu privacidad es importante",
    footerLinks: ["Acerca de", "Política de privacidad", "Términos de uso", "Política de privacidad de CA", "No vender ni compartir", "Consentimiento de comunicaciones electrónicas", "Divulgación del anunciante"],
    author: "Autor",
    authorName: "Equipo editorial de EvaFi",
    updated: "Actualizado",
    updatedValue: "Esta semana",
    description: "Noticias y guías sobre la deuda de tarjetas de crédito y las opciones para salir de ella.",
    news: "Noticias financieras de hoy",
    notFound: "Página no encontrada",
    notFoundText: "No pudimos encontrar la página que buscabas. Puede que se haya movido o que el enlace sea incorrecto.",
    readThese: "Artículos que puedes leer",
    cta: "Haz el cuestionario gratuito de EvaFi",
    dateline: "WeeklyFinancialNews.com",
    defaultDate: "30 de septiembre de 2026",
    defaultState: "tu estado",
    steps: ["Responde unas preguntas", "Mira tus resultados", "Conoce tus opciones"],
  },
}
