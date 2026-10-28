import * as React from "react"
import type { PageViewProps } from "."

export const Privacy = ({ locale }: PageViewProps) =>
  locale === "es" ? <p>Pronto publicaremos aquí nuestra política de privacidad.</p> : <p>Our privacy policy will be published here soon.</p>
