import * as React from "react"
import type { HeadProps, PageProps } from "gatsby"
import "../styles/styles.scss"
import type { BodyItem, Box, Cta, Img, Variant } from "../content"
import hero from "../images/hero.png"
import { HeadCommon, Footer, Header, Inline, NewsCards, fillState, useStateName } from "../components/shared"
import { startTracking } from "../tracking"
import { excerpt } from "../content"
import { defaultLocale, ui } from "../i18n"

// Rendered width of the hero (frame minus gutters) or the screen minus gutters; body images are narrower.
const MAIN_SIZES = "(min-width: 1040px) 1000px, calc(100vw - 32px)"
const BODY_SIZES = "(min-width: 720px) 640px, calc(100vw - 32px)"

const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (m, k) => String(vars[k] ?? m))
const words = (items: BodyItem[]) => items.reduce((n, b) => n + (typeof b === "string" ? b.split(/\s+/).length : Array.isArray(b) ? b.join(" ").split(/\s+/).length : 0), 0)
const isBox = (b: BodyItem): b is Box => typeof b === "object" && !Array.isArray(b) && "box" in b

const Arrow = () => <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9h11M10 4.5 14.5 9 10 13.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>

// table cell of the statement illustration: **x** is highlighted, <br> breaks the line
const Cell = ({ text }: { text: string }) => (
  <>{text.split("<br>").map((part, i) => {
    const m = part.match(/^\*\*(.+)\*\*$/)
    return <React.Fragment key={i}>{i > 0 && <br />}{m ? <span className="hl"><strong>{m[1]}</strong></span> : part}</React.Fragment>
  })}</>
)

const BoxView = ({ b, state, t }: { b: Box; state: string; t: (typeof ui)["en"] }) => {
  switch (b.box) {
    case "takeaways":
      return (
        <section className="takeaways" aria-labelledby="tk" data-section="takeaways">
          <h2 id="tk">{b.h}</h2>
          <ul>{b.items.map(i => <li key={i}><Inline text={i} state={state} /></li>)}</ul>
        </section>
      )
    case "stat":
      return (
        <div className="pull-stat">
          <p className="num">{b.num}<span className="of">{b.of}</span></p>
          <p className="cap"><Inline text={b.cap} state={state} /></p>
        </div>
      )
    case "statement": {
      const L = t.statement
      return (
        <figure className="stmt-fig">
          <div className="stage" role="img" aria-label={b.alt}>
            <div className="stmt" aria-hidden="true">
              <div className="stmt-top"><b>{L[0]}</b><span>{L[1]}</span></div>
              <div className="stmt-sum">
                <div><small>{L[2]}</small><strong>{b.balance}</strong></div>
                <div><small>{L[3]}</small><strong>{b.minimum}</strong></div>
                <div><small>{L[4]}</small><strong>{b.apr}</strong></div>
              </div>
              <div className="stmt-late"><b>{L[5]}</b> {L[6]}</div>
              <div className="mpw">
                <h3>{L[7]}</h3>
                <p>{L[8]}</p>
                <table>
                  <thead><tr><th>{L[9]}</th><th>{L[10]}</th><th>{L[11]}</th></tr></thead>
                  <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><Cell text={c} /></td>)}</tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <figcaption><Inline text={b.caption} state={state} tag="b" /></figcaption>
        </figure>
      )
    }
    case "tip":
      return <div className="tip"><h3>{b.h}</h3><p><Inline text={b.text} state={state} cta="tip_compare" /></p></div>
    case "ways":
      return <ul className="ways">{b.items.map(i => <li key={i}><Inline text={i} state={state} tag="b" cta="ways_option" /></li>)}</ul>
    case "check":
      return (
        <section className="check30" aria-labelledby="c30" data-section="check30">
          <h2 id="c30">{b.h}</h2>
          <p>{b.p}</p>
          <div className="steps">{b.steps.map(s => <div key={s.h} className={s.flag ? "step flag" : "step"}><b>{s.h}</b>{s.text}</div>)}</div>
          {b.cta && <span className="cta-line"><Inline text={b.cta} state={state} cta="check30_line" /></span>}
        </section>
      )
    case "next":
    case "rail":
      return <Next b={b} state={state} cta={b.box === "next" ? "next_block" : "rail_cta"} />
    case "soft":
      return <p className="soft"><Inline text={b.text} state={state} cta="soft_quiz" /></p>
    case "related":
      return <p className="related"><Inline text={b.text} state={state} /></p>
    case "method":
      return (
        <section className="method" id="sources" aria-labelledby="src-h">
          <h2 id="src-h">{b.h}</h2>
          <p><Inline text={b.text} state={state} /></p>
          <ol>{b.items.map(i => <li key={i}><Inline text={i} state={state} /></li>)}</ol>
        </section>
      )
  }
}

// Closing call to action (dark block) and its twin in the side rail. cta = tracking name; none = plain quiz link.
const Next = ({ b, state, cta }: { b: Cta; state: string; cta?: string }) => {
  const go = b.go && <>{fillState(b.go, state)} </>
  return b.box === "rail" ? (
    <a className="rail-next" href={b.href} data-cta={cta}>
      <p className="k">{b.k}</p>
      <p className="h">{fillState(b.h, state)}</p>
      <span className="go">{b.go ? fillState(b.go, state) : "→"}</span>
    </a>
  ) : (
    <a className="next" id="next-cta" href={b.href} data-cta={cta}>
      <p className="k">{b.k}</p>
      <p className="h">{fillState(b.h, state)}</p>
      {b.d && <p className="d">{fillState(b.d, state)}</p>}
      <span className="go">{go}<Arrow /></span>
    </a>
  )
}

const Figure = ({ img, section, hero, sizes }: { img: Img; section: string; hero?: boolean; sizes: string }) => (
  <figure className={hero ? "photo hero-photo" : "photo"} data-section={section}>
    <img src={img.img} srcSet={img.srcSet} sizes={img.srcSet ? sizes : undefined} width={img.width} height={img.height} alt={img.alt} {...(hero ? { fetchPriority: "high" as const } : { loading: "lazy" as const })} decoding="async" />
    {img.caption && <figcaption>{img.caption}{img.credit && <> <span className="credit">{img.credit}</span></>}</figcaption>}
  </figure>
)

export default function Article({ pageContext: { slug, title, date, kicker, byline, tracking, hero: heroOverride, intro, sections, outro = [], rail, cta, more, locale = defaultLocale, alternates = [] } }: PageProps<object, Variant>) {
  const state = useStateName(locale)
  const t = ui[locale]
  React.useEffect(() => startTracking(tracking ?? slug.replace(/-/g, "_")), [tracking, slug])

  // first plain paragraph is the standfirst under the headline; the rest is the body
  const di = intro.findIndex(b => typeof b === "string")
  const dek = di >= 0 ? (intro[di] as string) : undefined
  const lead = intro.filter((_, i) => i !== di)
  const minutes = Math.max(1, Math.round((words(intro) + sections.reduce((n, s) => n + words(s.body) + (s.steps?.join(" ").split(/\s+/).length ?? 0), 0)) / 220))
  const bylineParts = byline ?? [fill(t.readTime, { n: minutes }), [date ?? t.defaultDate, t.authorName].join(" · ")]
  const ctaLabel = cta?.label ?? t.cta
  const asNext = cta && { box: "next" as const, k: t.nextStep, h: ctaLabel, d: "", go: "", href: cta.href }
  const asRail = rail ?? (cta && { box: "rail" as const, k: t.nextStep, h: ctaLabel, d: "", go: "", href: cta.href })

  // data-section names for photos: hero, photo2, photo3, ...
  const photoId = new Map<Img, string>()
  let n = 1
  for (const b of [...lead, ...sections.flatMap(s => s.body)]) if (typeof b === "object" && !Array.isArray(b) && "img" in b) photoId.set(b, `photo${++n}`)

  const Items = ({ items }: { items: BodyItem[] }) => (
    <>
      {items.map((item, i) =>
        typeof item === "string" ? <p key={i}><Inline text={item} state={state} /></p>
        : Array.isArray(item) ? <p key={i}>{item.map((line, j) => <React.Fragment key={j}>{j > 0 && <br />}<Inline text={line} state={state} /></React.Fragment>)}</p>
        : "btn" in item ? <div key={i} className="cta"><a href={item.href}>{fillState(item.btn, state)}</a></div>
        : "img" in item ? <Figure key={i} img={item} section={photoId.get(item) ?? "photo"} sizes={BODY_SIZES} />
        : <BoxView key={i} b={item} state={state} t={t} />
      )}
    </>
  )
  const toc = (cls: string) => (
    <nav className={cls} aria-label={t.toc}>
      <h2>{t.toc}</h2>
      <ol>{sections.map((s, i) => <li key={s.h}><a href={`#q${i + 1}`}>{s.h}</a></li>)}</ol>
    </nav>
  )
  const heroImg: Img = heroOverride ?? { img: hero, alt: "" }

  return (
    <div>
      <div className="progress" aria-hidden="true"><div id="prog" /></div>
      <Header locale={locale} alternates={alternates} />

      <main className="frame gutter">
        <div className="head">
          <div className="ad-row"><span className="ad-label">{t.ad}</span></div>
          {kicker && <p className="kicker">{kicker.split(" · ").map((k, i) => <React.Fragment key={i}>{i > 0 && <> <span>·</span> </>}{k}</React.Fragment>)}</p>}
          <h1 id="headline">{fillState(title, state)}</h1>
          {dek && <p className="dek">{fillState(dek, state)}</p>}
          <div className="byline">{bylineParts.map((p, i) => <span key={i} className={i === 1 ? "bd" : undefined}><Inline text={p} state={state} /></span>)}</div>
        </div>

        <Figure img={heroImg} section="hero" hero sizes={MAIN_SIZES} />

        <div className="layout">
          <article className="article">
            <Items items={lead} />
            {sections.length > 1 && toc("toc toc-inline")}
            {sections.map((sec, i) => (
              <section key={sec.h} className="q" id={`q${i + 1}`} data-section={`q${i + 1}`}>
                <span className="q-num">{fill(t.part, { i: i + 1, n: sections.length })}</span>
                <h2>{sec.h}</h2>
                <Items items={sec.body} />
                {sec.steps && <ol>{sec.steps.map(s => <li key={s}>{s}</li>)}</ol>}
              </section>
            ))}
            {outro.map((b, i) => <BoxView key={i} b={b} state={state} t={t} />)}
            {!outro.some(b => b.box === "next") && asNext && <Next b={asNext} state={state} />}
          </article>

          <aside className="rail" aria-label={t.toc}>
            <div className="rail-sticky">
              {sections.length > 1 && toc("toc")}
              {asRail && <Next b={asRail} state={state} cta={rail ? "rail_cta" : undefined} />}
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
        seo={{ title, description: pageContext.description ?? fill(excerpt(pageContext.intro, 155)), path: location.pathname, image: pageContext.hero?.share ?? pageContext.hero?.img ?? hero, type: "article" }}
      />
    </>
  )
}
