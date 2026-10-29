import * as React from "react"
import type { HeadProps, PageProps } from "gatsby"
import "../styles/styles.scss"
import { HeadCommon, Footer, Header } from "../components/shared"
import { pageViews } from "../components/pages"
import { ui } from "../i18n"
import type { Alternate, Locale } from "../i18n"

// Footer page (About, Privacy, Terms, ...): created by gatsby-node from footerLinks in src/i18n.ts.
// title = the link label; the body is the page's component in src/components/pages/.
type Ctx = { slug: string; title: string; locale: Locale; alternates: Alternate[] }

export default function Page({ pageContext: { slug, title, locale, alternates } }: PageProps<object, Ctx>) {
  const View = pageViews[slug]
  return (
    <div>
      <Header locale={locale} alternates={alternates} />
      {View?.ownLayout ? (
        <View locale={locale} />
      ) : (
        <main className="frame gutter">
          <div className="head"><h1>{title}</h1></div>
          <article className="article page">{View && <View locale={locale} />}</article>
        </main>
      )}
      <Footer locale={locale} />
    </div>
  )
}

export const Head = ({ pageContext: { title, locale, alternates }, location }: HeadProps<object, Ctx>) => {
  const full = `${title} | ${ui[locale].brand}`
  return (
    <>
      <title>{full}</title>
      <HeadCommon locale={locale} alternates={alternates} seo={{ title: full, description: ui[locale].description, path: location.pathname }} />
    </>
  )
}
