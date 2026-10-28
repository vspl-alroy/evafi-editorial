import * as React from "react"
import { useRef, useEffect, useState, useId, forwardRef, useImperativeHandle } from "react"
import { Link } from "gatsby"
import type { PageView } from "."
import { localePath } from "../../i18n"
import ToastView, {Toast} from "../../lib/showToast"
import { loadPlacesLibrary } from "../../lib/googlePlaces"
import type { AutocompleteSessionToken, AutocompleteSuggestion, PlacesLibrary } from "../../lib/googlePlaces"
// Field rules shared with the API that will receive the form (EvaFi's optOutForm.ts / inputValidation.ts).
// That API must check them again (and block disposable email domains): anyone can skip this form.
import {
  BLOCKED_EMAIL_MESSAGE,
  validateAptSuiteUnit,
  validateEmail,
  validateFirstLegalName,
  validateFullAddress,
  validateLastLegalName,
  validateMobile,
  validateSubmittedOnBehalf,
} from "../../lib/optOutForm"

// Submissions are POSTed as JSON ({ form_values }, same as EvaFi's sendOptOutEmail) to GATSBY_PRIVACY_FORM_URL
// (build-time env var). Not connected yet: the API and recipient emails will come from the business.
// The service behind it sets the subject and recipients itself; this page never sends them.
const FORM_URL = process.env.GATSBY_PRIVACY_FORM_URL

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "form", label: "Form" },
]

const formatPhone = (input: string) => {
  const d = input.replace(/\D/g, "").slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

const Chevron = ({ size = 25, stroke = "#212121", d = "M4.5 7.5L11.6464 14.6464C11.8417 14.8417 12.1583 14.8417 12.3536 14.6464L19.5 7.5", box = 25 }: { size?: number; stroke?: string; d?: string; box?: number }) => (
  <svg width={size} height={size} viewBox={`0 0 ${box} ${box}`} fill="none" aria-hidden="true"><path d={d} stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const TocChevron = () => <Chevron size={16} box={16} stroke="currentColor" d="M3 6L8 11L13 6" />
const Tick = ({ disabled }: { disabled?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="tick"><path d="M4.85 7.45L7.24 9.99L11.64 4.92" stroke={disabled ? "#757575" : "#000000"} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

// Text input with EvaFi's floating label; the error shows after the first blur or a submit.
const TextField = React.forwardRef<HTMLDivElement, {
  value: string; onChange: (v: string) => void; validate: (v: string) => string; showError?: boolean
  placeholder: string; notRequired?: boolean; type?: string; hint?: string
}>(function TextField({ value, onChange, validate, showError, placeholder, notRequired = false, type = "text", hint }, ref) {
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)
  const id = useId()
  const error = touched || showError ? validate(value) : ""
  return (
    <div ref={ref} className="el-field">
      <div className="el-box">
        <input id={id} value={value} type={type} placeholder={focused ? hint : ""} aria-invalid={!!error}
          onChange={e => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => { setFocused(false); setTouched(true) }} />
        <label htmlFor={id} className={focused || value ? "up" : undefined}>{!notRequired && <span className="req">*</span>}{placeholder}</label>
      </div>
      {error && <p className="el-err">{error}</p>}
    </div>
  )
})

type SelectOption = { value: string; label: string; disabled?: boolean }

// EvaFi's custom dropdown: floating placeholder, value at the bottom, list with a tick on hover.
const SelectField = forwardRef<HTMLDivElement, {
  value: string; onChange: (v: string) => void; placeholder: string; required?: boolean
  options: SelectOption[]; validate: (v: string) => string; showError?: boolean
}>(function SelectField({ value, onChange, placeholder, required = false, options, validate, showError }, ref) {
  const [open, setOpen] = useState(false)
  const [touched, setTouched] = useState(false)
  const box = React.useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => box.current as HTMLDivElement)
  useEffect(() => {
    const outside = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(o => { if (o) setTouched(true); return false })
    }
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("mousedown", outside)
    document.addEventListener("keydown", esc)
    return () => { document.removeEventListener("mousedown", outside); document.removeEventListener("keydown", esc) }
  }, [])
  const selected = options.find(o => o.value === value)
  const error = touched || showError ? validate(value) : ""
  return (
    <div ref={box} className="el-select">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} aria-invalid={!!error}
        onClick={() => setOpen(o => { if (o) setTouched(true); return !o })}>
        {selected && <span className="el-sizer" aria-hidden="true"><span>{placeholder}</span><span>{selected.label}</span></span>}
        <span className={open || selected ? "el-ph up" : "el-ph"}>{required && <span className="req">*</span>}{placeholder}</span>
        {selected && <span className="el-value">{selected.label}</span>}
        <span className={open ? "el-arrow open" : "el-arrow"}><Chevron size={20} /></span>
      </button>
      {open && (
        <div className="el-list" role="listbox">
          {options.map(o => (
            <button key={o.value} type="button" role="option" aria-selected={o.value === value} disabled={o.disabled}
              onClick={() => { if (o.disabled) return; onChange(o.value); setOpen(false); setTouched(true) }}>
              <Tick disabled={o.disabled} />{o.label}
            </button>
          ))}
        </div>
      )}
      {error && <p className="el-err">{error}</p>}
    </div>
  )
})

const DEBOUNCE_MS = 300

// EvaFi's AddressAutocompleteField: Google Places suggestions under the input (src/lib/googlePlaces.ts).
// Without GATSBY_GOOGLE_MAPS_API_KEY, or if Google fails, it works as a plain text field.
const AddressAutocompleteField = forwardRef<HTMLDivElement, {
  value: string; onChange: (v: string) => void; validate: (v: string) => string; showError?: boolean
  placeholder: string; notRequired?: boolean
}>(function AddressAutocompleteField({ value, onChange, validate, showError, placeholder, notRequired = false }, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sessionTokenRef = useRef<AutocompleteSessionToken | null>(null)
  const placesLibraryRef = useRef<PlacesLibrary | null>(null)
  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)
  const [touched, setTouched] = useState(false)
  const id = useId()
  const listboxId = `${id}-listbox`

  useEffect(() => {
    let cancelled = false
    loadPlacesLibrary()
      .then(library => { if (!cancelled) placesLibraryRef.current = library })
      .catch(loadError => console.error("Failed to load Google Places library:", loadError))
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current) }, [])

  const getSessionToken = () => {
    if (!sessionTokenRef.current && placesLibraryRef.current) sessionTokenRef.current = new placesLibraryRef.current.AutocompleteSessionToken()
    return sessionTokenRef.current
  }

  const fetchSuggestions = (input: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!input.trim() || !placesLibraryRef.current) {
      setSuggestions([])
      setIsOpen(false)
      return
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const { AutocompleteSuggestion } = placesLibraryRef.current!
        const { suggestions: results } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input,
          includedPrimaryTypes: ["street_address", "premise", "subpremise"],
          sessionToken: getSessionToken() ?? undefined,
        })
        setSuggestions(results)
        setActiveIndex(-1)
        setIsOpen(results.length > 0)
      } catch (fetchError) {
        console.error("Failed to fetch address suggestions:", fetchError)
        setSuggestions([])
        setIsOpen(false)
      }
    }, DEBOUNCE_MS)
  }

  const handleSelect = async (suggestion: AutocompleteSuggestion) => {
    const prediction = suggestion.placePrediction
    if (!prediction) return
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      debounceRef.current = null
    }
    try {
      const place = prediction.toPlace()
      await place.fetchFields({ fields: ["formattedAddress"] })
      onChange(place.formattedAddress ?? prediction.text.text)
    } catch (selectError) {
      console.error("Failed to fetch place details:", selectError)
      onChange(prediction.text.text)
    }
    setSuggestions([])
    setIsOpen(false)
    setActiveIndex(-1)
    sessionTokenRef.current = null // a session ends once a place is fetched; start a fresh one next time
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex(prev => (prev + 1) % suggestions.length)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex(prev => (prev - 1 + suggestions.length) % suggestions.length)
    } else if (event.key === "Enter") {
      if (activeIndex >= 0) {
        event.preventDefault()
        handleSelect(suggestions[activeIndex])
      }
    } else if (event.key === "Escape") {
      setIsOpen(false)
    }
  }

  const error = touched || showError ? validate(value) : ""

  return (
    <div ref={containerRef} className="el-field">
      <div className="el-box">
        <input id={id} value={value} type="text" autoComplete="off" role="combobox" aria-expanded={isOpen} aria-autocomplete="list"
          aria-controls={listboxId} aria-invalid={!!error}
          onChange={event => { onChange(event.target.value); fetchSuggestions(event.target.value) }}
          onFocus={() => { setIsFocused(true); if (suggestions.length > 0) setIsOpen(true) }}
          onBlur={() => { setIsFocused(false); setTouched(true) }}
          onKeyDown={handleKeyDown} />
        <label htmlFor={id} className={isFocused || value ? "up" : undefined}>{!notRequired && <span className="req">*</span>}{placeholder}</label>
        {isOpen && suggestions.length > 0 && (
          <ul id={listboxId} role="listbox" className="el-suggest">
            {suggestions.map((suggestion, index) => {
              const prediction = suggestion.placePrediction
              if (!prediction) return null
              return (
                <li key={prediction.placeId} role="presentation">
                  <button type="button" role="option" aria-selected={index === activeIndex} className={index === activeIndex ? "on" : undefined}
                    onMouseDown={event => event.preventDefault()} onClick={() => handleSelect(suggestion)}>
                    {prediction.text.text}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {error && <p className="el-err">{error}</p>}
    </div>
  )
})

const CheckboxField = ({ checked, onChange, label, alignTop = false }: { checked: boolean; onChange: (v: boolean) => void; label: string; alignTop?: boolean }) => (
  <label className={alignTop ? "el-check top" : "el-check"}>
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
    <span>{label}</span>
  </label>
)

// Highlights the section being read (EvaFi's useSectionScroll): the last one whose top passed 40% of the screen.
function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id)
  useEffect(() => {
    const onScroll = () => {
      let id = SECTIONS[0].id
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) id = s.id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) id = SECTIONS[SECTIONS.length - 1].id
      setActive(id)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  return { active, scrollTo }
}

const TocList = ({ active, onSelect }: { active: string; onSelect: (id: string) => void }) => (
  <nav className="el-toc-list">
    {SECTIONS.map(({ id, label }, i) => (
      <button key={id} type="button" className={active === id ? "on" : undefined} onClick={() => onSelect(id)}><span className="n">{String(i + 1).padStart(2, "0")}</span><span>{label}</span></button>
    ))}
  </nav>
)

// Table of contents: sticky gradient card on tablet/desktop, a bar that opens an overlay on phones.
function SideNavbar({ active, scrollTo }: { active: string; scrollTo: (id: string) => void }) {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])
  const select = (id: string) => { scrollTo(id); setOpen(false) }
  return (
    <>
      <div className="el-toc-bar">
        <button type="button" onClick={() => setOpen(true)} aria-expanded={open}><span>Table of Contents</span><TocChevron /></button>
      </div>
      {open && (
        <div className="el-toc-overlay" onClick={() => setOpen(false)}>
          <div className="el-toc-panel" onClick={e => e.stopPropagation()}>
            <button type="button" className="el-toc-close" onClick={() => setOpen(false)} aria-expanded="true">
              <span>Table of Contents</span><span className="flip"><TocChevron /></span>
            </button>
            <TocList active={active} onSelect={select} />
          </div>
        </div>
      )}
      <aside className="el-toc">
        <div className="el-toc-card">
          <p className="el-toc-title">Table of Contents</p>
          <TocList active={active} onSelect={scrollTo} />
        </div>
      </aside>
    </>
  )
}

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="el-section">
    <h2>{title}</h2>
    <div className="el-section-body">{children}</div>
  </section>
)

// type Toast = { kind: "success" | "error"; title: string; text: string }

const noRights = { correct: false, delete: false, access: false, know: false, opt_out: false }

export const NoSellShare: PageView = ({ locale }) => {
  const { active, scrollTo } = useActiveSection()
  const [submitted, setSubmitted] = useState(false)
  // The ref blocks a second submit synchronously (rapid clicks or Enter can land before the disabled state re-renders).
  const isSubmittingRef = useRef(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // The address the endpoint rejected; the error clears as soon as the visitor edits the email.
  const [blockedEmail, setBlockedEmail] = useState("")
  const [resetKey, setResetKey] = useState(0)
  const [toast, setToast] = useState<Toast>()

  const [submittedOnBehalf, setSubmittedOnBehalf] = useState("")
  const [firstLegalName, setFirstLegalName] = useState("")
  const [lastLegalName, setLastLegalName] = useState("")
  const [fullAddress, setFullAddress] = useState("")
  const [preciseAddress, setPreciseAddress] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [rights, setRights] = useState(noRights)

  const submittedOnBehalfRef = useRef<HTMLDivElement>(null)
  const firstLegalNameRef = useRef<HTMLDivElement>(null)
  const lastLegalNameRef = useRef<HTMLDivElement>(null)
  const fullAddressRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(undefined), 5000)
    return () => clearTimeout(t)
  }, [toast])

  const resetForm = () => {
    setSubmittedOnBehalf(""); setFirstLegalName(""); setLastLegalName(""); setFullAddress(""); setPreciseAddress("")
    setEmail(""); setMobile(""); setRights(noRights); setBlockedEmail(""); setSubmitted(false); setResetKey(k => k + 1)
  }

  const isValid =
    !validateSubmittedOnBehalf(submittedOnBehalf) && !validateFirstLegalName(firstLegalName) && !validateLastLegalName(lastLegalName) &&
    !validateFullAddress(fullAddress) && !validateAptSuiteUnit(preciseAddress) && !validateEmail(email) && !validateMobile(mobile)

  const scrollToField = (el: HTMLDivElement | null) => {
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" })
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmittingRef.current) return
    const fieldsInOrder = [
      { ref: submittedOnBehalfRef, error: validateSubmittedOnBehalf(submittedOnBehalf) },
      { ref: firstLegalNameRef, error: validateFirstLegalName(firstLegalName) },
      { ref: lastLegalNameRef, error: validateLastLegalName(lastLegalName) },
      { ref: fullAddressRef, error: validateFullAddress(fullAddress) },
      { ref: emailRef, error: validateEmail(email) },
      { ref: mobileRef, error: validateMobile(mobile) },
    ]
    if (!isValid) {
      setSubmitted(true)
      scrollToField(fieldsInOrder.find(f => f.error)?.ref.current ?? null)
      return
    }
    const failed = (text = "Failed to submit request. Please try again.") => setToast({ kind: "error", title: "Something Went Wrong", text })
    if (!FORM_URL) {
      console.error("GATSBY_PRIVACY_FORM_URL is not set: the opt-out form has nowhere to send submissions (see the top of NoSellShare.tsx).")
      return failed()
    }
    isSubmittingRef.current = true
    setIsSubmitting(true)
    try {
      const selectedRights = [
        rights.correct && "Right to Correct",
        rights.delete && "Right to Delete",
        rights.access && "Right to Access",
        rights.know && "Right to Know",
        rights.opt_out && "Right to Opt-Out of Sharing or Selling",
      ].filter(Boolean)
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          form_values: {
            submissionDate: new Date().toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" }),
            submittedOnBehalfOf: submittedOnBehalf,
            firstName: firstLegalName.trim(),
            lastName: lastLegalName.trim(),
            fullAddress: fullAddress.trim(),
            aptSuiteUnit: preciseAddress,
            email: email.trim(),
            mobileNumber: mobile.trim(),
            selectedRights: selectedRights.join(", "),
          },
        }),
      })
      const result: { success?: boolean; field?: string; message?: string } = await res.json().catch(() => ({}))
      if (!res.ok || result.success === false) {
        if (result.field === "email") {
          setBlockedEmail(email.trim())
          setSubmitted(true)
          scrollToField(emailRef.current)
          return
        }
        return failed(result.message || undefined)
      }
      setToast({ kind: "success", title: "Success", text: "Your privacy request has been submitted successfully." })
      resetForm()
    } catch {
      failed()
    } finally {
      isSubmittingRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <div className="evafi-legal">
      {toast && <ToastView toast={toast} onClose={() => setToast(undefined)} />}
      <main className="el-grid">
        <SideNavbar active={active} scrollTo={scrollTo} />
        <div className="el-main">
          <div className="el-title" id="intro">
            <h1>
              ONLY For Residents of{" "}
              <span className="el-states">California, Colorado, Connecticut, Delaware, Iowa, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Texas, Utah, and Virginia</span>
            </h1>
            <p className="el-updated">Last Updated: August 2026</p>
            <p className="el-lead">
              The protection of your personal data is important to Debt Advice 101 and we are committed to ensuring that your privacy rights are
              respected. Click here for <Link to={localePath(locale, "privacy")}>Debt Advice 101&apos;s Privacy Policy</Link> and <Link to={localePath(locale, "california-policy")}>California Privacy Policy</Link>.
              As a resident of above states, you are granted certain rights pursuant to your state&apos;s privacy laws, namely you may request that we:
            </p>
            <ul className="el-list-disc">
              <li>Disclose certain information to you about our collection and use of your personal information; and/or</li>
              <li>Delete any of your personal information that we collected from you and retained, subject to certain exceptions.</li>
              <li>Correct any of your personal information that is inaccurate.</li>
              <li>Opt-you out of sharing or the sale of your personal information.</li>
              <li>Provide you access to your personal information.</li>
            </ul>
            <p className="el-lead2">
              To exercise your right(s), please complete the form below. The information we request from you below is strictly for the purpose of
              enabling us to verify your request and will be processed in accordance with your applicable state law. We cannot respond to your request
              or provide you with personal information if we cannot verify your identity and confirm the personal information relates to you. There
              are other laws which may also impact our ability to complete a request.
            </p>
          </div>
          <div className="el-sections">
            <Section id="form" title="Privacy Right Data Requests and Privacy Opt-Out Form">
              <form onSubmit={handleSubmit} noValidate className="el-form">
                <SelectField ref={submittedOnBehalfRef} key={`submittedOnBehalf-${resetKey}`} value={submittedOnBehalf} onChange={setSubmittedOnBehalf}
                  placeholder="I am submitting this information on behalf of" required validate={validateSubmittedOnBehalf} showError={submitted}
                  options={[
                    { value: "select", label: "Please select", disabled: true },
                    { value: "My self", label: "My self" },
                    { value: "Another individual", label: "Another individual" },
                  ]} />
                <div className="el-row">
                  <TextField ref={firstLegalNameRef} key={`firstLegalName-${resetKey}`} value={firstLegalName} onChange={setFirstLegalName}
                    validate={validateFirstLegalName} showError={submitted} placeholder="Legal first name" />
                  <TextField ref={lastLegalNameRef} key={`lastLegalName-${resetKey}`} value={lastLegalName} onChange={setLastLegalName}
                    validate={validateLastLegalName} showError={submitted} placeholder="Legal last name" />
                </div>
                <div className="el-row">
                  <AddressAutocompleteField ref={fullAddressRef} key={`fullAddress-${resetKey}`} value={fullAddress} onChange={setFullAddress}
                    validate={validateFullAddress} showError={submitted} placeholder="Full address" />
                  <TextField key={`preciseAddress-${resetKey}`} value={preciseAddress} onChange={setPreciseAddress}
                    validate={validateAptSuiteUnit} showError={submitted} placeholder="Apt, suite, unit, building" notRequired />
                </div>
                <div className="el-row">
                  <TextField ref={emailRef} key={`email-${resetKey}`} value={email} onChange={setEmail}
                    validate={v => validateEmail(v) || (blockedEmail && v.trim() === blockedEmail ? BLOCKED_EMAIL_MESSAGE : "")} showError={submitted} placeholder="Enter your email" />
                  <TextField ref={mobileRef} key={`mobile-${resetKey}`} value={mobile} onChange={v => setMobile(formatPhone(v))} type="tel" hint="(000) 000-0000"
                    validate={validateMobile} showError={submitted} placeholder="Mobile number" />
                </div>

                <div className="el-rights">
                  <p>Select the Right You Want to Exercise</p>
                  <div><CheckboxField checked={rights.delete} onChange={v => setRights(r => ({ ...r, delete: v }))} label="Right to Delete" /></div>
                  <div><CheckboxField checked={rights.know} onChange={v => setRights(r => ({ ...r, know: v }))} label="Right to Know" /></div>
                  <div><CheckboxField checked={rights.opt_out} alignTop onChange={v => setRights(r => ({ ...r, opt_out: v }))} label="Right to Opt-Out of Sharing or Selling" /></div>
                  <div><CheckboxField checked={rights.correct} onChange={v => setRights(r => ({ ...r, correct: v }))} label="Right to Correct" /></div>
                  <div><CheckboxField checked={rights.access} onChange={v => setRights(r => ({ ...r, access: v }))} label="Right to Access" /></div>
                  <p>
                    <span className="el-medium">California Non-Discrimination Notice:</span> You have the right to be free from discrimination by a business
                    for exercising your privacy rights, including the right as an employee, applicant, or independent contractor not to be retaliated
                    against for exercising your California Consumer Privacy Act rights.
                  </p>
                  <button type="submit" className="el-submit" disabled={isSubmitting} aria-busy={isSubmitting}>{isSubmitting ? "Loading..." : "Submit"}</button>
                  
                </div>
              </form>
            </Section>
          </div>
        </div>
      </main>
    </div>
  )
}
NoSellShare.ownLayout = true
