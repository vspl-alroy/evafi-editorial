import * as React from "react"
import type { HeadProps, PageProps } from "gatsby"
import "../styles/styles.scss"
import type { BodyItem, Variant } from "../content"
import hero from "../images/hero.png"
import verified24 from "../images/verified-24.svg"
import { DEFAULT_STATE, Fonts, Footer, Header, NewsCards, fillState, useStateName } from "../components/shared"
import divider from "../images/divider.svg"

// TODO: real quiz URL
const QUIZ_URL = "#"

const steps = ["Answer a few questions", "See your estimate", "Decide if it's right for you"]

const Body = ({ items, tight, state }: { items: BodyItem[]; tight?: boolean; state: string }) => (
  <div className={tight ? "body tight" : "body"}>
    {items.map((item, i) =>
      typeof item === "object" && !Array.isArray(item) ? (
        <img key={i} className="body-img" src={item.img} alt={item.alt} loading="lazy" decoding="async" />
      ) : Array.isArray(item) ? (
        <div key={i}>{item.map(line => <p key={line}>{fillState(line, state)}</p>)}</div>
      ) : (
        <p key={i}>{fillState(item, state)}</p>
      )
    )}
  </div>
)

export default function Article({ pageContext: { title, date, hero: heroOverride, newsroom, intro, sections, more } }: PageProps<object, Variant>) {
  const state = useStateName()
  return (
    <div className={newsroom ? "newsroom" : undefined}>
      <Header />

      <section className="hero">
        <div className="wrap">
          <p className="dateline">WeeklyFinancialNews.com — {date ?? "September 30, 2026"}</p>
          <h1>{fillState(title, state)}</h1>
          <img className="hero-img" src={heroOverride?.img ?? hero} alt={heroOverride?.alt ?? ""} fetchPriority="high" decoding="async" />
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

        {more && more.length > 0 && <NewsCards items={more} state={state} />}
      </main>

      <Footer />
    </div>
  )
}

export const Head = ({ pageContext }: HeadProps<object, Variant>) => (
  <>
    <title>{fillState(pageContext.title, DEFAULT_STATE)}</title>
    <Fonts />
  </>
)
