import * as React from "react"
import { Link } from "gatsby"
import { SITE_URL, defaultLocale, localePath, locales, ui } from "../i18n"
import type { Alternate, Locale } from "../i18n"
import type { Teaser } from "../content"
import hero from "../images/hero.png"

export const fillState = (s: string, state: string) => s.replaceAll("{State}", state)

// {State} comes from ?state=Texas; the static build renders the default and swaps it after hydration.
export function useStateName(locale: Locale) {
  const [state, setState] = React.useState(ui[locale].defaultState)
  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("state")?.trim()
    if (q) setState(q)
  }, [])
  return state
}

// Locale from the URL (/es/...), for pages with no locale of their own such as the 404.
export function useLocaleFromPath(): Locale {
  const [locale, setLocale] = React.useState<Locale>(defaultLocale)
  React.useEffect(() => {
    const first = window.location.pathname.split("/")[1]
    setLocale(locales.find(l => l === first) ?? defaultLocale)
  }, [])
  return locale
}

export const Header = ({ locale }: { locale: Locale; alternates?: Alternate[] }) => { // language switcher removed for now; pages still pass alternates (hreflang)
  const t = ui[locale]
  return (
    <>
      <header className="mast">
        <div className="frame gutter mast-top">
          <p className="wordmark">{t.brand}<span>.</span></p>
        </div>
      </header>
      <div className="rates" role="region" aria-label={t.statsLabel}>
        <div className="frame gutter rates-inner">
          <span className="rates-label">{t.statsLabel}</span>
          {t.stats.map(s => <span key={s.k} className="rate"><span className="k">{s.k}</span><b>{s.v}</b><span className="src">{s.src}</span></span>)}
        </div>
      </div>
    </>
  )
}

export const Footer = ({ locale }: { locale: Locale }) => {
  const t = ui[locale]
  return (
    <footer className="foot">
      <div className="frame gutter">
        <p className="wordmark">{t.brand}<span>.</span></p>
        <nav>{t.footerLinks.map(l => <a key={l} href="#">{l}</a>)}</nav>
        <p className="disclosure"><b>{t.ad}.</b> {t.disclosure}</p>
        <p className="disclosure">© {new Date().getFullYear()} {t.brand}</p>
      </div>
    </footer>
  )
}

// "Todays Financial News" card grid. Used under each article and as the home page list.
export const NewsCards = ({ items, state, locale, title }: { items: Teaser[]; state: string; locale: Locale; title?: string }) => (
  <section className="news">
    <h2>{title ?? ui[locale].news}</h2>
    {items.map(a => (
      <article key={a.slug}>
        <Link to={localePath(locale, a.slug)}>
          <div className="news-img"><img src={a.img ?? hero} srcSet={a.srcSet} sizes={a.srcSet ? "(min-width: 720px) 320px, calc(100vw - 48px)" : undefined} alt="" loading="lazy" decoding="async" /></div>
          <h3>{fillState(a.title, state)}</h3>
          <p>{fillState(a.text, state)}</p>
        </Link>
      </article>
    ))}
  </section>
)

export interface Seo { title: string; description: string; path: string; image?: string; type?: "article" | "website" }

const INDEXABLE = process.env.GATSBY_INDEXABLE === "1" // see onPostBuild in gatsby-node.ts

// <head> bits shared by every page: language, SEO tags, hreflang alternates, fonts.
export const HeadCommon = ({ locale, alternates, seo }: { locale: Locale; alternates: Alternate[]; seo?: Seo }) => {
  const x = alternates.find(a => a.locale === defaultLocale)
  const abs = (p: string) => (p.startsWith("http") ? p : SITE_URL + p)
  return (
    <>
      <html lang={locale} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      {!INDEXABLE && <meta name="robots" content="noindex, nofollow" />}
      {seo && (
        <>
          <meta name="description" content={seo.description} />
          <link rel="canonical" href={abs(seo.path)} />
          <meta property="og:site_name" content={ui[locale].brand} />
          <meta property="og:type" content={seo.type ?? "website"} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:url" content={abs(seo.path)} />
          <meta property="og:locale" content={locale === "es" ? "es_US" : "en_US"} />
          {seo.image && <meta property="og:image" content={abs(seo.image)} />}
          <meta name="twitter:card" content={seo.image ? "summary_large_image" : "summary"} />
        </>
      )}
      {alternates.length > 1 && alternates.map(a => <link key={a.locale} rel="alternate" hrefLang={a.locale} href={SITE_URL + a.path} />)}
      {alternates.length > 1 && x && <link rel="alternate" hrefLang="x-default" href={SITE_URL + x.path} />}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400..800;1,6..72,400..600&display=swap" />
    </>
  )
}
