import * as React from "react"
import type { PageProps, HeadProps } from "gatsby"
import "../styles/styles.scss"
import type { Teaser } from "../content"
import { HeadCommon, Footer, Header, NewsCards, useStateName } from "../components/shared"
import { ui } from "../i18n"
import type { Alternate, Locale } from "../i18n"

type Ctx = { articles: Teaser[]; locale: Locale; alternates: Alternate[] }

export default function Index({ pageContext: { articles, locale, alternates } }: PageProps<object, Ctx>) {
  const state = useStateName(locale)
  return (
    <div>
      <Header locale={locale} alternates={alternates} />
      <main className="home">
        {articles.length > 0 && <NewsCards items={articles} state={state} locale={locale} />}
      </main>
      <Footer locale={locale} />
    </div>
  )
}

export const Head = ({ pageContext: { locale, alternates }, location }: HeadProps<object, Ctx>) => (
  <>
    <title>{ui[locale].brand}</title>
    <HeadCommon locale={locale} alternates={alternates} seo={{ title: ui[locale].brand, description: ui[locale].description, path: location.pathname }} />
  </>
)
