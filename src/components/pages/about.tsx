import * as React from "react"
import type { PageViewProps } from "."

export const About = ({ locale }: PageViewProps) =>
  locale === "es" ? (
    <p>Debt Advice 101 publica noticias y guías sobre la deuda de tarjetas de crédito y las opciones para salir de ella.</p>
  ) : (
    <p>Debt Advice 101 publishes news and guides about credit card debt and the options for getting out of it.</p>
  )
