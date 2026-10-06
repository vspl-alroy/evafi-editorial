import * as React from "react"
import type { PageProps } from "gatsby"
import "../styles/styles.scss"
import type { Teaser } from "../content"
import { Fonts, Footer, Header, NewsCards, useStateName } from "../components/shared"

export default function Index({ pageContext: { articles } }: PageProps<object, { articles: Teaser[] }>) {
  const state = useStateName()
  return (
    <div className="newsroom">
      <Header />
      <main className="home">
        {articles.length > 0 && <NewsCards items={articles} state={state} />}
      </main>
      <Footer />
    </div>
  )
}

export const Head = () => (
  <>
    <title>Debt News USA</title>
    <Fonts />
  </>
)
