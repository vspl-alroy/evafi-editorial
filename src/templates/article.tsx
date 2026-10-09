import * as React from "react"
import type { HeadProps, PageProps } from "gatsby"
import "../styles/styles.scss"
import type { BodyItem, Variant } from "../content"
import hero from "../images/hero.png"
import { HeadCommon, Footer, Header, NewsCards, fillState, useStateName } from "../components/shared"
import { excerpt } from "../content"
import { defaultLocale, ui } from "../i18n"

// Rendered width of the hero (frame minus gutters) or the screen minus gutters. Body images are narrower, so this over-fetches slightly.
const BODY_SIZES = "(min-width: 720px) 640px, calc(100vw - 32px)"
const MAIN_SIZES = "(min-width: 1040px) 1000px, calc(100vw - 32px)"

const Body = ({ items, tight, state }: { items: BodyItem[]; tight?: boolean; state: string }) => (
  <div className={tight ? "body tight" : "body"}>
    {items.map((item, i) =>
      typeof item === "object" && "btn" in item ? (
        <div key={i} className="cta"><a href={item.href}>{fillState(item.btn, state)}</a></div>
      ) : typeof item === "object" && "img" in item ? (
        <img key={i} className="body-img" src={item.img} srcSet={item.srcSet} sizes={item.srcSet ? BODY_SIZES : undefined} width={item.width} height={item.height} alt={item.alt} loading="lazy" decoding="async" />
      ) : Array.isArray(item) ? (
        <div key={i}>{item.map(line => <p key={line}>{fillState(line, state)}</p>)}</div>
      ) : (
        <p key={i}>{fillState(item, state)}</p>
      )
    )}
  </div>
)

const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (m, k) => String(vars[k] ?? m))
const words = (items: BodyItem[]) => items.reduce((n, b) => n + (typeof b === "string" ? b.split(/\s+/).length : Array.isArray(b) ? b.join(" ").split(/\s+/).length : 0), 0)

const Toc = ({ sections, title }: { sections: Variant["sections"]; title: string }) => (
  <nav className="toc" aria-label={title}>
    <h2>{title}</h2>
    <ol>{sections.map((s, i) => <li key={s.h}><a href={`#p${i + 1}`}>{s.h}</a></li>)}</ol>
  </nav>
)

export default function Article({ pageContext: { title, date, hero: heroOverride, intro, sections, cta, more, locale = defaultLocale, alternates = [] } }: PageProps<object, Variant>) {
  const state = useStateName(locale)
  const t = ui[locale]
  // first plain paragraph is the standfirst under the headline; the rest is the body
  const di = intro.findIndex(b => typeof b === "string")
  const dek = di >= 0 ? (intro[di] as string) : undefined
  const lead = intro.filter((_, i) => i !== di)
  const minutes = Math.max(1, Math.round((words(intro) + sections.reduce((n, s) => n + words(s.body) + (s.steps?.join(" ").split(/\s+/).length ?? 0), 0)) / 220))
  const ctaLabel = cta?.label ?? t.cta
  return (
    <div>
      <Header locale={locale} alternates={alternates} />

      <main className="frame gutter">
        <div className="head">
          <div className="ad-row"><span className="ad-label">{t.ad}</span></div>
          <h1>{fillState(title, state)}</h1>
          {dek && <p className="dek">{fillState(dek, state)}</p>}
          <div className="byline">
            <span>{fill(t.readTime, { n: minutes })}</span>
            <span>{date ?? t.defaultDate}</span>
            <span>{t.authorName}</span>
          </div>
        </div>

        <figure className="photo">
          <img src={heroOverride?.img ?? hero} srcSet={heroOverride?.srcSet} sizes={heroOverride?.srcSet ? MAIN_SIZES : undefined} width={heroOverride?.width} height={heroOverride?.height} alt={heroOverride?.alt ?? ""} fetchPriority="high" decoding="async" />
        </figure>

        <div className="layout">
          <article className="article">
            {sections.length > 1 && <div className="toc-inline"><Toc sections={sections} title={t.toc} /></div>}
            <Body items={lead} state={state} />
            {sections.map((sec, i) => (
              <section key={sec.h} className="q" id={`p${i + 1}`}>
                <span className="q-num">{fill(t.part, { i: i + 1, n: sections.length })}</span>
                <h2>{sec.h}</h2>
                <Body items={sec.body} tight={sec.tight} state={state} />
                {sec.steps && <ol>{sec.steps.map(s => <li key={s}>{s}</li>)}</ol>}
              </section>
            ))}
            {cta && (
              <a className="next" href={cta.href}>
                <p className="k">{t.nextStep}</p>
                <p className="h">{ctaLabel}</p>
                <span className="go">→</span>
              </a>
            )}
          </article>

          <aside className="rail">
            <div className="rail-sticky">
              {sections.length > 1 && <Toc sections={sections} title={t.toc} />}
              {cta && (
                <a className="rail-next" href={cta.href}>
                  <p className="k">{t.nextStep}</p>
                  <p className="h">{ctaLabel}</p>
                  <span className="go">→</span>
                </a>
              )}
            </div>
          </aside>
        </div>

        {more && more.length > 0 && <NewsCards items={more} state={state} locale={locale} />}
      </main>

      <Footer locale={locale} />
    </div>
  )
}

export const Head = ({ pageContext, location }: HeadProps<object, Variant>) => {
  const locale = pageContext.locale ?? defaultLocale
  const fill = (s: string) => fillState(s, ui[locale].defaultState)
  const title = fill(pageContext.title)
  return (
    <>
      <title>{title}</title>
      <HeadCommon
        locale={locale}
        alternates={pageContext.alternates ?? []}
        seo={{ title, description: fill(excerpt(pageContext.intro, 155)), path: location.pathname, image: pageContext.hero?.share ?? pageContext.hero?.img ?? hero, type: "article" }}
      />
    </>
  )
}
