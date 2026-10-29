import * as React from "react"
import { useEffect, useRef, useState } from "react"

// Layout of the legal pages linked from the footer (E-Comm Consent, and later Terms, Privacy…), in EvaFi's design:
// EvaFi's src/components/Policies.tsx (SideNavbar, Section) and the title block of its legal pages.
// Styles: .evafi-legal / .el-* in _article.scss. Header, footer and <head> come from templates/page.tsx: register the
// page in src/components/pages/index.ts with ownLayout = true.

export interface LegalSection { id: string; label: string }

const TocChevron = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

// Highlights the section being read (EvaFi's useSectionScroll): the last one whose top passed 40% of the screen.
// A section picked in the table of contents stays highlighted until the user scrolls by hand: short sections near the
// end can't reach the top far enough, so the 40% / page-bottom rules would highlight the next one.
export function useActiveSection(sections: LegalSection[]) {
  const [active, setActive] = useState(sections[0]?.id)
  const picked = useRef<string | null>(null)
  useEffect(() => {
    const release = () => { picked.current = null }
    const onScroll = () => {
      if (picked.current) return setActive(picked.current)
      let id = sections[0]?.id
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) id = s.id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) id = sections[sections.length - 1]?.id
      setActive(id)
    }
    onScroll()
    const manual = ["wheel", "touchstart", "keydown", "mousedown"] as const
    window.addEventListener("scroll", onScroll, { passive: true })
    manual.forEach(e => window.addEventListener(e, release, { passive: true }))
    return () => {
      window.removeEventListener("scroll", onScroll)
      manual.forEach(e => window.removeEventListener(e, release))
    }
  }, [sections])
  const scrollTo = (id: string) => {
    picked.current = id
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return { active, scrollTo }
}

const TocList = ({ sections, active, onSelect }: { sections: LegalSection[]; active?: string; onSelect: (id: string) => void }) => (
  <nav className="el-toc-list">
    {sections.map(({ id, label }, i) => (
      <button key={id} type="button" className={active === id ? "on" : undefined} onClick={() => onSelect(id)}><span className="n">{String(i + 1).padStart(2, "0")}</span><span>{label}</span></button>
    ))}
  </nav>
)

// Table of contents: sticky gradient card on tablet/desktop, a bar that opens an overlay on phones.
export function SideNavbar({ sections, active, scrollTo }: { sections: LegalSection[]; active?: string; scrollTo: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])
  const select = (id: string) => { scrollTo(id); setOpen(false) }
  return (
    <>
      <div className="el-toc-bar">
        <button type="button" onClick={() => setOpen(true)} aria-expanded={open}><span>Table of Contents</span><TocChevron /></button>
      </div>
      {open && (
        <div className="el-toc-overlay" onClick={() => setOpen(false)}>
          <div className="el-toc-panel" onClick={e => e.stopPropagation()}>
            <button type="button" className="el-toc-close" onClick={() => setOpen(false)} aria-expanded="true">
              <span>Table of Contents</span><span className="flip"><TocChevron /></span>
            </button>
            <TocList sections={sections} active={active} onSelect={select} />
          </div>
        </div>
      )}
      <aside className="el-toc">
        <div className="el-toc-card">
          <p className="el-toc-title">Table of Contents</p>
          <TocList sections={sections} active={active} onSelect={scrollTo} />
        </div>
      </aside>
    </>
  )
}

export const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="el-section">
    <h2>{title}</h2>
    <div className="el-section-body">{children}</div>
  </section>
)

// Whole page body: table of contents, title block (h1, Last Updated, intro) and the sections.
export function LegalPage({ title, updated, sections, intro, children }: {
  title: React.ReactNode; updated: string; sections: LegalSection[]; intro?: React.ReactNode; children: React.ReactNode
}) {
  const { active, scrollTo } = useActiveSection(sections)
  return (
    <div className="evafi-legal">
      <main className="el-grid">
        <SideNavbar sections={sections} active={active} scrollTo={scrollTo} />
        <div className="el-main">
          <div className="el-title">
            <h1>{title}</h1>
            <p className="el-updated">Last Updated: {updated}</p>
            {intro}
          </div>
          <div className="el-sections">{children}</div>
        </div>
      </main>
    </div>
  )
}
