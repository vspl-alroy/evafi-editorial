import * as React from "react"
import type { PageViewProps } from "."

export const Terms = ({ locale }: PageViewProps) =>
  locale === "es" ? <p>Pronto publicaremos aquí nuestros términos del servicio.</p> : <p>Our terms of service will be published here soon.</p>
