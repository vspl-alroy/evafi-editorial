import * as React from "react"
import { Link, withPrefix } from "gatsby"
import { SITE_URL, defaultLocale, localePath, locales, ui } from "../i18n"
import type { Alternate, Locale } from "../i18n"
import type { Teaser, Variant } from "../content"
import hero from "../images/hero.png"

export const fillState = (s: string, state: string) => s.replaceAll("{State}", state)

// {State} comes from the visitor's IP (US only); ?state=Texas is the fallback when the lookup fails or is outside the US.
// The static build renders the default and swaps it after hydration. The answer is kept per session (one call per visitor).
// ponytail: ipapi.co free tier is ~1000 calls/day per site; swap GEO_URL (any JSON with region + country_code) or move to an edge function if it runs out.
const GEO_URL = "https://ipapi.co/json/"
async function stateFromIp(): Promise<string | undefined> {
  try {
    const cached = sessionStorage.getItem("da101_state")
    if (cached !== null) return cached || undefined
  } catch {}
  let found = ""
  try {
    const r = await fetch(GEO_URL, { signal: AbortSignal.timeout(3000) })
    const g = await r.json()
    if (g.country_code === "US" && typeof g.region === "string") found = g.region
    try { sessionStorage.setItem("da101_state", found) } catch {}
  } catch {} // blocked, offline, rate limited: not cached, fall back
  return found || undefined
}

export function useStateName(locale: Locale) {
  const [state, setState] = React.useState(ui[locale].defaultState)
  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("state")?.trim()
    if (q) setState(q)
    let live = true
    stateFromIp().then(ip => { if (live && ip) setState(ip) })
    return () => { live = false }
  }, [])
  return state
}

// Prefix root-relative URLs (also each URL of a srcSet) with the site path prefix. No-op when there is none.
export const prefixed = (s?: string) => s?.replace(/(^|,\s*)\//g, (_, p) => p + withPrefix("/"))

// Locale from the URL (/es/...), for pages with no locale of their own such as the 404.
export function useLocaleFromPath(): Locale {
  const [locale, setLocale] = React.useState<Locale>(defaultLocale)
  React.useEffect(() => {
    const first = window.location.pathname.slice(withPrefix("/").length).split("/")[0]
    setLocale(locales.find(l => l === first) ?? defaultLocale)
  }, [])
  return locale
}

// **bold** and [links](https://… or #anchor) inside text. tag: element for bold (the design uses <strong> and <b> in different places).
// cta: marks external links as call-to-action links (data-cta, see tracking.ts); other external links just open in a new tab.
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+|#[^)\s]*)\)/g
export function Inline({ text, state, tag: Tag = "strong", cta }: { text: string; state: string; tag?: "strong" | "b"; cta?: string }): React.ReactElement {
  const out: React.ReactNode[] = []
  let last = 0
  const src = fillState(text, state)
  for (const m of src.matchAll(TOKEN)) {
    if (m.index! > last) out.push(src.slice(last, m.index))
    if (m[1] !== undefined) out.push(<Tag key={m.index}><Inline text={m[1]} state={state} tag={Tag} cta={cta} /></Tag>)
    else if (m[3].startsWith("#")) out.push(<a key={m.index} href={m[3]}>{m[2]}</a>)
    else out.push(<a key={m.index} href={m[3]} target="_blank" rel="noopener" data-cta={cta}>{m[2]}</a>)
    last = m.index! + m[0].length
  }
  if (last < src.length) out.push(src.slice(last))
  return <>{out}</>
}

// EvaFi's official advertising disclosure (Figma node 262:154), verbatim. Legal text: not translated, the Spanish page shows it in English.
const DISCLOSURE = [
  "This website is an advertisement. It is owned and operated by Nationwide Financial Group LLC d/b/a EvaFi, and its purpose is to introduce you to EvaFi's service and to the financial partners in our network. It is not a news site, a consumer publication, or an independent review. Any articles, headlines, comparisons, or stories you see here are marketing content written or commissioned by EvaFi, not journalism, and the people described in them are not reporters or independent experts.",
  "We tell you this up front because of how EvaFi works. We shop for you across our network of financial partners and present the offers that best fit your request, and we do it at no cost to you. To keep the service free, EvaFi may be compensated by those partners when we refer you to them or when you take an offer. That compensation can influence which partners appear on this site, where they appear, and how prominently they are featured. It is also why this site is an advertisement rather than an impartial publication: we have a financial relationship with the companies we present.",
  "What compensation does not do is set the rates, fees, or terms a partner offers you. Those come from the partner, based on its own criteria, and are shown here as estimates that the partner can change until your application is finalized. Compensation also does not change the fact that our network is not the whole market. Other lenders and financial institutions exist outside our platform, and some may offer better rates or terms than what you see here. We present the best offers we find among our partners, but we can't guarantee they are the best available to you anywhere, so compare, read the full terms, and decide what fits your situation before committing.",
]

export const Header = ({ locale, stats }: { locale: Locale; alternates?: Alternate[]; stats?: Variant["stats"] }) => { // no language switcher for now
  const t = ui[locale]
  const dialog = React.useRef<HTMLDialogElement>(null)
  return (
    <>
      <header className="mast">
        <div className="frame gutter">
          <div className="mast-top">
            <p className="wordmark">{t.brand}<span>.</span></p>
            <div className="mast-right">
              <span className="mast-ad">{t.ad}</span>
              <button type="button" className="disc-link" onClick={() => dialog.current?.showModal()}>
                {t.discLink} <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M8 7.2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="8" cy="4.9" r=".95" fill="currentColor" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <dialog ref={dialog} className="disc" aria-labelledby="disc-h" onClick={e => { if (e.target === dialog.current) dialog.current.close() }}>
        <div className="disc-head">
          <h2 id="disc-h">{t.discLink}</h2>
          <button type="button" className="disc-close" aria-label={t.discClose} onClick={() => dialog.current?.close()}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="disc-body">
          {DISCLOSURE.map(p => <p key={p}>{p}</p>)}
          <p>Nothing on this website is a loan offer, approval, or commitment from EvaFi. EvaFi is not a lender, does not accept loan applications, and does not make credit decisions. For the full description of what we do and don't do, see our <Link to={localePath(locale, "terms")}>Terms of Use</Link> and our <Link to={localePath(locale, "privacy-policy")}>Privacy Policy</Link>.</p>
        </div>
      </dialog>
      <div className="rates" role="region" aria-label={t.statsLabel}>
        <div className="frame gutter">
          <div className="rates-inner">
            <span className="rates-label">{t.statsLabel}</span>
            {(stats ?? t.stats).map(s => <span key={s.k} className="rate"><span className="k">{s.k}</span><b>{s.v}</b><span className="src">{s.src}</span></span>)}
          </div>
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
        <nav className="foot-links">{t.footerLinks.map(l => <Link key={l.slug} to={localePath(locale, l.slug)}>{l.label}</Link>)}</nav>
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
          <div className="news-img"><img src={prefixed(a.img ?? hero)} srcSet={prefixed(a.srcSet)} sizes={a.srcSet ? "(min-width: 720px) 320px, calc(100vw - 48px)" : undefined} alt="" loading="lazy" decoding="async" /></div>
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
      <link rel="icon" href={withPrefix("/favicon.svg")} type="image/svg+xml" />
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
          {seo.image && <meta property="og:image" content={abs(prefixed(seo.image)!)} />}
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
