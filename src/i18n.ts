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
  stats: { k: string; v: string; src: string }[] // "By the numbers" strip under the masthead
  statsLabel: string
  ad: string
  readTime: string // {n} = minutes
  part: string // {i} of {n}
  toc: string
  nextStep: string
  disclosure: string
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
  goHome: string
  cta: string
  defaultDate: string
  defaultState: string // replaces {State} until ?state= is read
}

export const ui: Record<Locale, UI> = {
  en: {
    name: "English",
    brand: "Debt News USA",
    statsLabel: "By the numbers",
    stats: [
      { k: "Total U.S. card debt", v: "$1.252T", src: "NY Fed, Q1 2026" },
      { k: "Avg. balance per cardholder", v: "$7,886", src: "LendingTree, Q3 2025" },
      { k: "Avg. APR, accruing balances", v: "22.15%", src: "Federal Reserve, Q2 2026" },
      { k: "Balances 30+ days delinquent", v: "2.92%", src: "NY Fed, Q1 2026" },
    ],
    ad: "Advertisement",
    readTime: "{n} min read",
    part: "Part {i} of {n}",
    toc: "In this article",
    nextStep: "Next step",
    disclosure: "This is paid advertising content from EvaFi, a service that connects people with debt consolidation options through its financial partners. This content is for general information only and is not financial, legal or tax advice. Rates, terms and eligibility vary.",
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
    goHome: "Back to the home page",
    cta: "Take EvaFi's Free Quiz",
    defaultDate: "September 30, 2026",
    defaultState: "your state",
  },
  // TODO: have a native speaker review these UI strings.
  es: {
    name: "Español",
    brand: "Debt News USA",
    statsLabel: "En cifras",
    stats: [
      { k: "Deuda total de tarjetas en EE. UU.", v: "$1.252 billones", src: "Fed de NY, 1T 2026" },
      { k: "Saldo promedio por titular", v: "$7,886", src: "LendingTree, 3T 2025" },
      { k: "APR promedio, saldos con intereses", v: "22.15%", src: "Reserva Federal, 2T 2026" },
      { k: "Saldos con más de 30 días de atraso", v: "2.92%", src: "Fed de NY, 1T 2026" },
    ],
    ad: "Publicidad",
    readTime: "{n} min de lectura",
    part: "Parte {i} de {n}",
    toc: "En este artículo",
    nextStep: "Siguiente paso",
    disclosure: "Este es contenido publicitario pagado de EvaFi, un servicio que conecta a las personas con opciones de consolidación de deudas a través de sus socios financieros. Este contenido es solo informativo y no constituye asesoría financiera, legal ni fiscal. Las tasas, los términos y la elegibilidad varían.",
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
    goHome: "Volver a la página de inicio",
    cta: "Haz el cuestionario gratuito de EvaFi",
    defaultDate: "30 de septiembre de 2026",
    defaultState: "tu estado",
  },
}
