import fs from "fs"
import path from "path"
import type { GatsbyNode } from "gatsby"
import { parseArticle } from "./src/markdown"
import { SITE_URL, defaultLocale, localePath, locales } from "./src/i18n"
import type { Alternate, Locale } from "./src/i18n"
import { excerpt } from "./src/content"
import type { Teaser, Variant } from "./src/content"

// content/<slug>.md -> /<slug>/    content/<locale>/<slug>.md -> /<locale>/<slug>/
const CONTENT_DIR = path.resolve("content")
const dirFor = (locale: Locale) => (locale === defaultLocale ? CONTENT_DIR : path.join(CONTENT_DIR, locale))

function markdownVariants(locale: Locale): Variant[] {
  const dir = dirFor(locale)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter(f => f.endsWith(".md")).flatMap(f => {
    const slug = f.slice(0, -3).toLowerCase() // Foo.md and foo.md both serve /foo/
    const md = fs.readFileSync(path.join(dir, f), "utf8")
    const label = `${locale === defaultLocale ? "" : locale + "/"}${f}`
    for (const [, src] of md.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g))
      if (!fs.existsSync(path.join(CONTENT_DIR, src.trim().replace(/^\.?\//, "")))) console.warn(`[content] ${label}: image not found in content/: ${src}`)
    const v = /^[a-z0-9-]+$/.test(slug) ? parseArticle(slug, md) : null
    if (!v) console.warn(`[content] skipped ${label}: ${/^[a-z0-9-]+$/.test(slug) ? 'first line must be "# Title"' : "filename may only use letters, digits and hyphens"}`)
    return v ? [{ ...v, locale }] : []
  })
}

// Copy images (everything but .md) from content/ to static/content/ so /content/<path> serves them.
export const onPreBootstrap: GatsbyNode["onPreBootstrap"] = () => {
  if (!fs.existsSync(CONTENT_DIR)) return
  fs.cpSync(CONTENT_DIR, path.resolve("static/content"), {
    recursive: true,
    filter: src => fs.statSync(src).isDirectory() || !src.endsWith(".md"),
  })
}

const MORE = 3

function teaser(v: Variant): Teaser {
  return { slug: v.slug, title: v.title, img: v.hero?.img, text: excerpt(v.intro, 140) }
}

export const createPages: GatsbyNode["createPages"] = ({ actions }) => {
  const byLocale = new Map<Locale, Variant[]>()
  for (const locale of locales) {
    const seen = new Set<string>()
    byLocale.set(locale, markdownVariants(locale).filter(v => {
      if (seen.has(v.slug)) console.warn(`[content] duplicate slug "${locale}/${v.slug}" ignored`)
      return !seen.has(v.slug) && !!seen.add(v.slug)
    }))
  }
  // Pages of the same slug in every language that has it (hreflang + language switcher).
  const alternatesFor = (slug?: string): Alternate[] =>
    locales.filter(l => byLocale.get(l)!.some(v => !slug || v.slug === slug)).map(l => ({ locale: l, path: localePath(l, slug) }))

  // GitHub Pages serves /404.html for unknown URLs; it lists the articles of the visitor's language.
  actions.createPage({
    path: "/404.html",
    component: path.resolve("src/templates/not-found.tsx"),
    context: { byLocale: Object.fromEntries(locales.map(l => [l, byLocale.get(l)!.map(teaser)])) },
  })

  for (const locale of locales) {
    const articles = byLocale.get(locale)!
    if (locale === defaultLocale || articles.length) {
      actions.createPage({
        path: localePath(locale),
        component: path.resolve("src/templates/index.tsx"),
        context: { articles: articles.map(teaser), locale, alternates: alternatesFor() },
      })
    }
    // "More news": the next MORE articles after this one (wrapping), so it's never the page being read.
    articles.forEach((variant, i) => {
      const others = articles.slice(i + 1).concat(articles.slice(0, i))
      actions.createPage({
        path: localePath(locale, variant.slug),
        component: path.resolve("src/templates/article.tsx"),
        context: { ...variant, more: others.slice(0, MORE).map(teaser), alternates: alternatesFor(variant.slug) },
      })
    })
  }
}

// Static robots.txt + sitemap.xml (with hreflang alternates). Search engines are told to stay away
// unless the build sets GATSBY_INDEXABLE=1, so the development site is not indexed by accident.
export const onPostBuild: GatsbyNode["onPostBuild"] = () => {
  const indexable = process.env.GATSBY_INDEXABLE === "1"
  fs.writeFileSync(
    path.resolve("public/robots.txt"),
    indexable ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n` : "User-agent: *\nDisallow: /\n",
  )
  const slugs = new Map<string, Locale[]>() // slug ("" = home) -> locales that have it
  for (const locale of locales) {
    const articles = markdownVariants(locale)
    if (locale === defaultLocale || articles.length) slugs.set("", [...(slugs.get("") ?? []), locale])
    for (const v of articles) slugs.set(v.slug, [...(slugs.get(v.slug) ?? []), locale])
  }
  const urls = [...slugs].map(([slug, ls]) => {
    const alts = ls.length > 1 ? ls.map(l => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${localePath(l, slug)}"/>`).join("") : ""
    return ls.map(l => `<url><loc>${SITE_URL}${localePath(l, slug)}</loc>${alts}</url>`).join("")
  })
  fs.writeFileSync(
    path.resolve("public/sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>\n`,
  )
}
