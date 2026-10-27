import React from "react"
import type { GatsbySSR } from "gatsby"

// Cometly pixel, same uid as the EvaFi app. Production only: set GATSBY_COMETLY_ENABLED=1 in the production build.
// Here, not in <Head>: Gatsby's Head API drops the `async` attribute.
export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
  if (process.env.GATSBY_COMETLY_ENABLED !== "1") return
  setHeadComponents([
    <script key="cometly" src="https://js.comet-serve.com/script.js?uid=6a05d5-6755399444000020-3a9e49-s&domains=debtadvice101.com,evafi.com" async />,
  ])
}
