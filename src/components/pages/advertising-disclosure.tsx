import * as React from "react"
import type { PageViewProps } from "."

export const AdvertisingDisclosure = ({ locale }: PageViewProps) =>
  locale === "es" ? (
    <>
      <p>Este artículo es contenido publicitario pagado de EvaFi, un servicio que conecta a las personas con opciones de consolidación de deudas a través de sus socios financieros. El Debt Consolidation Check es operado por EvaFi.</p>
      <p>Este contenido es solo informativo y no constituye asesoría financiera, legal ni fiscal. Las tasas, los términos y la elegibilidad varían.</p>
    </>
  ) : (
    <>
      <p>This article is paid advertising content from EvaFi, a service that connects people with debt consolidation options through its financial partners. The Debt Consolidation Check is operated by EvaFi.</p>
      <p>This content is for general information only and is not financial, legal or tax advice. Rates, terms and eligibility vary.</p>
    </>
  )
