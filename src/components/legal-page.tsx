import * as React from "react"
import "../styles/styles.scss"
import { Footer, HeadCommon, Header } from "./shared"
import { ui } from "../i18n"

// Layout of the legal pages linked from the footer (E-Comm Consent, and later Terms, Privacy…).
export interface LegalSection { id: string; label: string }

export const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="legal-sec">
    <h2>{title}</h2>
    <div className="legal-text">{children}</div>
  </section>
)

export function LegalPage({ title, updated, sections, intro, children }: {
  title: string; updated: string; sections: LegalSection[]; intro?: React.ReactNode; children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const [active, setActive] = React.useState<string>()
  
  // A clicked link stays current through the (smooth) scroll it starts: otherwise passing sections,
  // or the next one when the page can't scroll its target that far up, take over.
  const unlock = React.useRef<(() => void) | undefined>(undefined) // set while a click holds the highlight
  React.useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    const spy = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting && !unlock.current) setActive(en.target.id) }), { rootMargin: "-30% 0px -60% 0px" })
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) spy.observe(el) })
    return () => { spy.disconnect(); unlock.current?.() }
  }, [sections])
  const pick = (id: string) => {
    unlock.current?.()
    setActive(id)
    const settle = () => { clearTimeout(timer); timer = setTimeout(release, 150) } // the observer reports the final position after scrollend
    const release = () => { clearTimeout(timer); window.removeEventListener("scrollend", settle); if (unlock.current === release) unlock.current = undefined }
    let timer = setTimeout(release, 1500) // no scrollend (older Safari) or nothing to scroll
    window.addEventListener("scrollend", settle)
    unlock.current = release
  }
  const list = (onClick?: () => void) => (
    <ol>{sections.map(s => (
      <li key={s.id}><a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined} onClick={() => { pick(s.id); onClick?.() }}>{s.label}</a></li>
    ))}</ol>
  )
  
  return (
    <div>
      <Header locale="en" />
      <main className="legal-wrap">
        <div className="legal-layout">
          <aside className="rail" aria-label="Table of Contents">
            <div className="rail-sticky">
              <nav className="toc" aria-label="Table of Contents"><h2>Table of Contents</h2>{list()}</nav>
            </div>
          </aside>
          <div className="legal-main">
            <div className="legal-toc-bar">
              {open && <div className="legal-toc-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
              <button type="button" className="legal-toc-toggle" aria-expanded={open} aria-controls="legal-toc-panel" onClick={() => setOpen(o => !o)}>
                Table of Contents
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <nav id="legal-toc-panel" className="toc legal-toc-panel" aria-label="Table of Contents" hidden={!open}>{list(() => setOpen(false))}</nav>
            </div>
            <div className="head">
              <h1>{title}</h1>
              <p className="legal-updated">Last Updated: {updated}</p>
              {intro && <div className="legal-text">{intro}</div>}
            </div>
            <div className="legal-body">{children}</div>
          </div>
        </div>
      </main>
      <Footer locale="en" />
    </div>
  )
}

export const LegalHead = ({ title, slug }: { title: string; slug: string }) => (
  <>
    <title>{`${title} | ${ui.en.brand}`}</title>
    <HeadCommon locale="en" alternates={[]} seo={{ title, description: `${title} for ${ui.en.brand}.`, path: `/${slug}/` }} />
  </>
)
