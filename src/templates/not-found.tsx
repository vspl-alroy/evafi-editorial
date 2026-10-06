import * as React from "react"
import { Link } from "gatsby"
import type { PageProps } from "gatsby"
import "../styles/styles.scss"
import type { Teaser } from "../content"
import { HeadCommon, Footer, Header, NewsCards, useLocaleFromPath, useStateName } from "../components/shared"
import { localePath, ui } from "../i18n"

type Ctx = { byLocale: Record<string, Teaser[]> }

export default function NotFound({ pageContext: { byLocale } }: PageProps<object, Ctx>) {
  const locale = useLocaleFromPath()
  const state = useStateName(locale)
  const t = ui[locale]
  const articles = byLocale[locale] ?? []
  return (
    <div>
      <Header locale={locale} alternates={[]} wide />
      <main className="home">
        <div className="wrap not-found">
          <p className="dateline">404</p>
          <h1>{t.notFound}</h1>
          <p>{t.notFoundText}</p>
          <Link to={localePath(locale)}>{t.goHome}</Link>
        </div>
        {articles.length > 0 && <NewsCards items={articles} state={state} locale={locale} title={t.readThese} />}
      </main>
      <Footer locale={locale} wide />
    </div>
  )
}

export const Head = () => (
  <>
    <title>{ui.en.notFound}</title>
    <meta name="robots" content="noindex" />
    <HeadCommon locale="en" alternates={[]} />
  </>
)
