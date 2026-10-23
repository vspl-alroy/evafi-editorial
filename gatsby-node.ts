import fs from "fs"
import path from "path"
import sharp from "sharp"
import type { GatsbyNode } from "gatsby"
import { parseArticle } from "./src/markdown"
import { SITE_URL, defaultLocale, localePath, locales } from "./src/i18n"
import type { Alternate, Locale } from "./src/i18n"
import { excerpt } from "./src/content"
import type { BodyItem, Img, Teaser, Variant } from "./src/content"

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
    if (!v) return []
    return [{ ...v, locale, hero: v.hero && withVariants(v.hero), intro: v.intro.map(enrich), sections: v.sections.map(s => ({ ...s, body: s.body.map(enrich) })) }]
  })
}

// Copy everything in content/ except .md to static/content/ so /content/<path> serves it, and make
// WebP variants (480/800/1200 wide, never upscaled) of every png/jpg so phones don't download the original.
const OUT_DIR = path.resolve("static/content")
const WIDTHS = [480, 800, 1200]
const RASTER = /\.(png|jpe?g|webp)$/i
type Optimised = { srcSet: string; width: number; height: number; share: string }
const optimised = new Map<string, Optimised>() // "/content/images/x.png" -> variants
const urlFor = (rel: string) => "/content/" + encodeURI(rel)

const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))

async function processImages() {
  optimised.clear()
  if (!fs.existsSync(CONTENT_DIR)) return
  for (const file of walk(CONTENT_DIR)) {
    if (file.endsWith(".md")) continue
    const rel = path.relative(CONTENT_DIR, file).split(path.sep).join("/")
    const dest = path.join(OUT_DIR, rel)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(file, dest) // original stays available (fallback src)
    if (!RASTER.test(file)) continue
    try {
      const meta = await sharp(file).metadata()
      const swap = (meta.orientation ?? 1) >= 5 // phone photos: EXIF rotation swaps width/height
      const width = swap ? meta.height! : meta.width!
      const height = swap ? meta.width! : meta.height!
      const widths = [...new Set([...WIDTHS.filter(w => w < width), Math.min(width, WIDTHS[WIDTHS.length - 1])])].sort((a, b) => a - b)
      const base = rel.replace(RASTER, "")
      for (const w of widths) {
        const out = path.join(OUT_DIR, `${base}-${w}.webp`)
        if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(file).mtimeMs) continue // unchanged
        await sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out)
      }
      optimised.set(urlFor(rel), {
        srcSet: widths.map(w => `${urlFor(`${base}-${w}.webp`)} ${w}w`).join(", "),
        width,
        height,
        share: urlFor(`${base}-${widths[widths.length - 1]}.webp`),
      })
    } catch (e) {
      console.warn(`[content] could not optimise ${rel}, serving the original: ${(e as Error).message}`)
    }
  }
}

export const onPreBootstrap: GatsbyNode["onPreBootstrap"] = async () => {
  await processImages()
}

const withVariants = (img: Img): Img => ({ ...img, ...optimised.get(img.img) })
const enrich = (item: BodyItem): BodyItem => (typeof item === "object" && !Array.isArray(item) && "img" in item ? withVariants(item) : item)

function teaser(v: Variant): Teaser {
  return { slug: v.slug, title: v.title, img: v.hero?.img, srcSet: v.hero?.srcSet, text: excerpt(v.intro, 140) }
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
    articles.forEach(variant => {
      actions.createPage({
        path: localePath(locale, variant.slug),
        component: path.resolve("src/templates/article.tsx"),
        context: { ...variant, alternates: alternatesFor(variant.slug) },
      })
    })
  }
}

const PREFIX = process.env.PREFIX_PATHS === "true" ? (process.env.PATH_PREFIX ?? "").replace(/\/$/, "") : ""
// Static robots.txt + sitemap.xml (with hreflang alternates). Search engines are told to stay away
// unless the build sets GATSBY_INDEXABLE=1, so the development site is not indexed by accident.
export const onPostBuild: GatsbyNode["onPostBuild"] = () => {
  const indexable = process.env.GATSBY_INDEXABLE === "1"
  fs.writeFileSync(
    path.resolve("public/robots.txt"),
    indexable ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}${PREFIX}/sitemap.xml\n` : "User-agent: *\nDisallow: /\n",
  )
  const slugs = new Map<string, Locale[]>() // slug ("" = home) -> locales that have it
  for (const locale of locales) {
    const articles = markdownVariants(locale)
    if (locale === defaultLocale || articles.length) slugs.set("", [...(slugs.get("") ?? []), locale])
    for (const v of articles) slugs.set(v.slug, [...(slugs.get(v.slug) ?? []), locale])
  }
  const urls = [...slugs].map(([slug, ls]) => {
    const alts = ls.length > 1 ? ls.map(l => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${PREFIX}${localePath(l, slug)}"/>`).join("") : ""
    return ls.map(l => `<url><loc>${SITE_URL}${PREFIX}${localePath(l, slug)}</loc>${alts}</url>`).join("")
  })
  fs.writeFileSync(
    path.resolve("public/sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>\n`,
  )
}
