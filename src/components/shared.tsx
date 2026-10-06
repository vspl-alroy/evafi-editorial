import * as React from "react"
import { Link } from "gatsby"
import { SITE_URL, defaultLocale, localePath, ui } from "../i18n"
import type { Alternate, Locale } from "../i18n"
import type { Teaser } from "../content"
import hero from "../images/hero.png"
import verified18 from "../images/verified-18.svg"

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

export const Header = ({ locale, alternates }: { locale: Locale; alternates: Alternate[] }) => {
  const t = ui[locale]
  const others = alternates.filter(a => a.locale !== locale)
  return (
    <header className="site-header">
      <div className="wrap">
        <p className="brand">{t.brand}</p>
        <p className="trust"><img src={verified18} width="18" height="18" alt="" />{t.trusted}</p>
        {others.length > 0 && (
          <nav className="lang" aria-label="Language">
            {others.map(a => <a key={a.locale} href={a.path} hrefLang={a.locale} lang={a.locale}>{ui[a.locale].name}</a>)}
          </nav>
        )}
      </div>
    </header>
  )
}

export const Footer = ({ locale }: { locale: Locale }) => {
  const t = ui[locale]
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="trust"><img src={verified18} width="18" height="18" alt="" />{t.secure}</p>
        <p className="trust"><img src={verified18} width="18" height="18" alt="" />{t.privacy}</p>
        <nav>{t.footerLinks.map(l => <a key={l} href="#">{l}</a>)}</nav>
      </div>
    </footer>
  )
}

// "Todays Financial News" card grid. Used under each article and as the home page list.
export const NewsCards = ({ items, state, locale }: { items: Teaser[]; state: string; locale: Locale }) => (
  <section className="news">
    <h2>{ui[locale].news}</h2>
    {items.map(a => (
      <article key={a.slug}>
        <Link to={localePath(locale, a.slug)}>
          <div className="news-img"><img src={a.img ?? hero} alt="" loading="lazy" decoding="async" /></div>
          <h3>{fillState(a.title, state)}</h3>
          <p>{fillState(a.text, state)}</p>
        </Link>
      </article>
    ))}
  </section>
)

// <head> bits shared by every page: language, hreflang alternates, fonts.
export const HeadCommon = ({ locale, alternates }: { locale: Locale; alternates: Alternate[] }) => {
  const x = alternates.find(a => a.locale === defaultLocale)
  return (
    <>
      <html lang={locale} />
      {alternates.length > 1 && alternates.map(a => <link key={a.locale} rel="alternate" hrefLang={a.locale} href={SITE_URL + a.path} />)}
      {alternates.length > 1 && x && <link rel="alternate" hrefLang="x-default" href={SITE_URL + x.path} />}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@700;800&family=Open+Sans:wght@400;700&family=Tinos:wght@700&family=Work+Sans:wght@400;600&display=swap" />
    </>
  )
}
