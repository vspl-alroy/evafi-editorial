import fs from "fs"
import path from "path"
import type { GatsbyNode } from "gatsby"
import { parseArticle } from "./src/markdown"

// content/<slug>.md -> /<slug>/
const CONTENT_DIR = path.resolve("content")

function markdownVariants() {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith(".md")).flatMap(f => {
    const slug = f.slice(0, -3).toLowerCase() // Foo.md and foo.md both serve /foo/
    const md = fs.readFileSync(path.join(CONTENT_DIR, f), "utf8")
    for (const [, src] of md.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g))
      if (!fs.existsSync(path.join(CONTENT_DIR, src.trim().replace(/^\.?\//, "")))) console.warn(`[content] ${f}: image not found in content/: ${src}`)
    const v = /^[a-z0-9-]+$/.test(slug) ? parseArticle(slug, md) : null
    if (!v) console.warn(`[content] skipped ${f}: ${/^[a-z0-9-]+$/.test(slug) ? 'first line must be "# Title"' : "filename may only use letters, digits and hyphens"}`)
    return v ? [v] : []
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

export const createPages: GatsbyNode["createPages"] = ({ actions }) => {
  const seen = new Set<string>()
  const articles = markdownVariants()
  actions.createPage({
    path: "/",
    component: path.resolve("src/templates/index.tsx"),
    context: { articles: articles.map(({ slug, title }) => ({ slug, title })) },
  })
  for (const variant of articles) {
    if (seen.has(variant.slug)) {
      console.warn(`[content] duplicate slug "${variant.slug}" ignored`)
      continue
    }
    seen.add(variant.slug)
    actions.createPage({
      path: `/${variant.slug}/`,
      component: path.resolve("src/templates/article.tsx"),
      context: variant,
    })
  }
}
