import * as React from "react"
import { Link } from "gatsby"
import type { Teaser } from "../content"
import hero from "../images/hero.png"
import verified18 from "../images/verified-18.svg"

export const DEFAULT_STATE = "your state"
const footerLinks = ["About", "Privacy Policy", "Terms of Use", "CA Privacy Policy", "Do Not Sell or Share", "E-Comm Consent", "Advertiser Disclosure"]

export const fillState = (s: string, state: string) => s.replaceAll("{State}", state)

// {State} comes from ?state=Texas; the static build renders the default and swaps it after hydration.
export function useStateName() {
  const [state, setState] = React.useState(DEFAULT_STATE)
  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("state")?.trim()
    if (q) setState(q)
  }, [])
  return state
}

export const Header = () => (
  <header className="site-header">
    <div className="wrap">
      <p className="brand">Debt News USA</p>
      <p className="trust"><img src={verified18} width="18" height="18" alt="" />Trusted source of news</p>
    </div>
  </header>
)

export const Footer = () => (
  <footer className="site-footer">
    <div className="wrap">
      <p className="trust"><img src={verified18} width="18" height="18" alt="" />Secure &amp; encrypted</p>
      <p className="trust"><img src={verified18} width="18" height="18" alt="" />Your privacy matters</p>
      <nav>{footerLinks.map(l => <a key={l} href="#">{l}</a>)}</nav>
    </div>
  </footer>
)

// "Todays Financial News" card grid. Used under each article and as the home page list.
export const NewsCards = ({ items, state }: { items: Teaser[]; state: string }) => (
  <section className="news">
    <h2>Todays Financial News</h2>
    {items.map(a => (
      <article key={a.slug}>
        <Link to={`/${a.slug}/`}>
          <div className="news-img"><img src={a.img ?? hero} alt="" loading="lazy" decoding="async" /></div>
          <h3>{fillState(a.title, state)}</h3>
          <p>{fillState(a.text, state)}</p>
        </Link>
      </article>
    ))}
  </section>
)

export const Fonts = () => (
  <>
    <html lang="en" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@700;800&family=Open+Sans:wght@400;700&family=Tinos:wght@700&family=Work+Sans:wght@400;600&display=swap" />
  </>
)
