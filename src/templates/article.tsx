import * as React from "react"
import type { HeadProps, PageProps } from "gatsby"
import "../styles/styles.scss"
import type { BodyItem, Variant } from "../content"
import hero from "../images/hero.png"
import news2 from "../images/news-2.png"
import news3 from "../images/news-3.png"
import verified18 from "../images/verified-18.svg"
import verified24 from "../images/verified-24.svg"
import divider from "../images/divider.svg"

// TODO: real quiz URL
const QUIZ_URL = "#"
const DEFAULT_STATE = "your state"

const steps = ["Answer a few questions", "See your estimate", "Decide if it's right for you"]
const news = [hero, news2, news3]
const footerLinks = ["About", "Privacy Policy", "Terms of Use", "CA Privacy Policy", "Do Not Sell or Share", "E-Comm Consent", "Advertiser Disclosure"]

const fillState = (s: string, state: string) => s.replaceAll("{State}", state)

// {State} comes from ?state=Texas; the static build renders the default and swaps it after hydration.
function useStateName() {
  const [state, setState] = React.useState(DEFAULT_STATE)
  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("state")?.trim()
    if (q) setState(q)
  }, [])
  return state
}

const Body = ({ items, tight, state }: { items: BodyItem[]; tight?: boolean; state: string }) => (
  <div className={tight ? "body tight" : "body"}>
    {items.map((item, i) =>
      typeof item === "object" && !Array.isArray(item) ? (
        <img key={i} className="body-img" src={item.img} alt={item.alt} />
      ) : Array.isArray(item) ? (
        <div key={i}>{item.map(line => <p key={line}>{fillState(line, state)}</p>)}</div>
      ) : (
        <p key={i}>{fillState(item, state)}</p>
      )
    )}
  </div>
)

export default function Article({ pageContext: { title, date, hero: heroOverride, newsroom, intro, sections } }: PageProps<object, Variant>) {
  const state = useStateName()
  return (
    <div className={newsroom ? "newsroom" : undefined}>
      <header className="site-header">
        <div className="wrap">
          <p className="brand">Debt News USA</p>
          <p className="trust"><img src={verified18} width="18" height="18" alt="" />Trusted source of news</p>
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <p className="dateline">WeeklyFinancialNews.com — {date ?? "September 30, 2026"}</p>
          <h1>{fillState(title, state)}</h1>
          <img className="hero-img" src={heroOverride?.img ?? hero} alt={heroOverride?.alt ?? ""} />
        </div>
      </section>

      <div className="process">
        <img src={divider} width="375" height="1" alt="" />
        <ul>
          {steps.map(s => <li key={s}><img src={verified24} width="24" height="24" alt="" />{s}</li>)}
        </ul>
        <img src={divider} width="375" height="1" alt="" />
      </div>

      <main className="wrap content">
        <Body items={intro} state={state} />
        {sections.map(sec => (
          <section key={sec.h}>
            <h2>{sec.h}</h2>
            <Body items={sec.body} tight={sec.tight} state={state} />
            {sec.steps && <ol>{sec.steps.map(s => <li key={s}>{s}</li>)}</ol>}
          </section>
        ))}
        <div className="cta"><a href={QUIZ_URL}>Take EvaFi's Free Quiz</a></div>

        <section className="news">
          <h2>Todays Financial News</h2>
          {news.map((src, i) => (
            <article key={i}>
              <div className="news-img"><img src={src} alt="" /></div>
              <h3>Content</h3>
              <p>Most people carrying at least $6,000 in eligible debt do — and income doesn't need to be verified just to check.</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <p className="trust"><img src={verified18} width="18" height="18" alt="" />Secure &amp; encrypted</p>
          <p className="trust"><img src={verified18} width="18" height="18" alt="" />Your privacy matters</p>
          <nav>{footerLinks.map(l => <a key={l} href="#">{l}</a>)}</nav>
        </div>
      </footer>
    </div>
  )
}

export const Head = ({ pageContext }: HeadProps<object, Variant>) => (
  <>
    <html lang="en" />
    <title>{fillState(pageContext.title, DEFAULT_STATE)}</title>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Open+Sans:wght@400;700&family=Tinos:wght@700&family=Work+Sans:wght@400;600&display=swap" />
  </>
)
