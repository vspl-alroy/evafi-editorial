// Page analytics from the design: dataLayer events (page view, scroll depth, time, section views, clicks),
// the reading-progress bar and the contents highlight. Call once after the article is on screen.
// Links with data-cta get ?src=&sid=&cta= (&a= for quiz answers) plus the visitor's utm_/comet_/click-id params and a click event.
const PASS_THROUGH = /^(utm_|comet_|gclid$|gbraid$|wbraid$|fbclid$|ttclid$|msclkid$|li_fat_id$)/

export function startTracking(page: string): () => void {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  const sid = (() => {
    try {
      let v = sessionStorage.getItem("da101_sid")
      if (!v) { v = Math.random().toString(36).slice(2, 10) + Date.now().toString(36); sessionStorage.setItem("da101_sid", v) }
      return v
    } catch { return Math.random().toString(36).slice(2, 12) }
  })()
  const track = (ev: string, data: Record<string, unknown> = {}) => {
    try { w.dataLayer!.push({ event: ev, da101_page: page, da101_sid: sid, transport_type: "beacon", ...data }) } catch {}
  }
  const undo: (() => void)[] = []
  const on = (t: EventTarget, ev: string, f: EventListener, o?: AddEventListenerOptions) => { t.addEventListener(ev, f, o); undo.push(() => t.removeEventListener(ev, f)) }
  track("da101_page_view")

  document.querySelectorAll<HTMLAnchorElement>("[data-cta]").forEach(a => {
    const cta = a.getAttribute("data-cta")!
    try {
      const u = new URL(a.getAttribute("href")!, location.href)
      new URLSearchParams(location.search).forEach((v, k) => { if (PASS_THROUGH.test(k)) u.searchParams.set(k, v) })
      u.searchParams.set("src", page); u.searchParams.set("sid", sid); u.searchParams.set("cta", cta)
      const ans = a.getAttribute("data-a"); if (ans) u.searchParams.set("a", ans)
      a.href = u.toString()
    } catch {}
    a.target = "_blank"; a.rel = "noopener"
    on(a, "click", () => track("da101_cta_click", { cta }))
  })

  const prog = document.getElementById("prog")
  const depths = [25, 50, 75, 90]
  const sent: Record<number, number> = {}
  let maxPct = 0, engagedSent = false
  const start = Date.now()
  const engaged = () => {
    if (!engagedSent && maxPct >= 50 && Date.now() - start >= 30000) { engagedSent = true; track("da101_engaged_reader", { percent: Math.round(maxPct), seconds: Math.round((Date.now() - start) / 1000) }) }
  }
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - innerHeight
    if (h <= 0) return
    const pct = Math.min(100, (scrollY / h) * 100)
    maxPct = Math.max(maxPct, pct)
    if (prog) prog.style.width = pct + "%"
    depths.forEach(d => { if (pct >= d && !sent[d]) { sent[d] = 1; track("da101_scroll_depth", { percent: d }) } })
    engaged()
  }
  on(window, "scroll", onScroll, { passive: true })
  onScroll()
  ;[15, 30, 60, 120].forEach(s => {
    const id = setTimeout(() => { if (document.visibilityState === "visible") { track("da101_time_on_page", { seconds: s }); engaged() } }, s * 1000)
    undo.push(() => clearTimeout(id))
  })

  if ("IntersectionObserver" in window) {
    const seen = new Set<Element>()
    const once = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting && !seen.has(en.target)) { seen.add(en.target); track("da101_section_view", { section: en.target.getAttribute("data-section") }) }
    }), { threshold: 0.4 })
    document.querySelectorAll("[data-section]").forEach(n => once.observe(n))
    const links = document.querySelectorAll(".rail .toc a")
    const spy = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) links.forEach(a => a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + en.target.id)))
    }), { rootMargin: "-30% 0px -60% 0px" })
    document.querySelectorAll(".q").forEach(q => spy.observe(q))
    undo.push(() => { once.disconnect(); spy.disconnect() })
  }
  document.querySelectorAll<HTMLAnchorElement>(".toc a").forEach(a => on(a, "click", () => track("da101_toc_click", { target: a.getAttribute("href")!.slice(1) })))
  return () => undo.forEach(f => f())
}
