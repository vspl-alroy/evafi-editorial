import * as React from "react"
import { Link } from "gatsby"
import type { PageProps } from "gatsby"

type Ctx = { articles: { slug: string; title: string }[] }

export default function Index({ pageContext: { articles } }: PageProps<object, Ctx>) {
  return (
    <main style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h1>Articles</h1>
      <ul>
        {articles.map(a => <li key={a.slug}><Link to={`/${a.slug}/`}>{a.title}</Link></li>)}
      </ul>
    </main>
  )
}

export const Head = () => <title>Articles</title>
