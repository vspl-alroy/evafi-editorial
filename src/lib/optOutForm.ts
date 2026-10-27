import { isSafeText, isValidEmail, isValidPhone, validateName } from "./inputValidation";

// Field rules for the privacy opt-out form (NoSellShare). They live here, not
// in the component, so /api/lead-dr-send-email can apply the same rules: the
// route's input goes into an email to the privacy mailbox, and a direct call
// to the route skips the form entirely.

const ADDRESS_MAX_LENGTH = 200;

export const SUBMITTED_ON_BEHALF_OPTIONS = ["My self", "Another individual"] as const;

export const PRIVACY_RIGHTS = [
  "Right to Correct",
  "Right to Delete",
  "Right to Access",
  "Right to Know",
  "Right to Opt-Out of Sharing or Selling",
] as const;

export function validateSubmittedOnBehalf(value: string): string {
  return value
    ? ""
    : "Please select an option from dropdown.";
}

export function validateFirstLegalName(value: string): string {
  if (!value.trim()) return "Legal first name is required.";
  return validateName(value);
}

export function validateLastLegalName(value: string): string {
  if (!value.trim()) return "Legal last name is required.";
  return validateName(value);
}

export function validateFullAddress(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "Full address is required.";
  if (trimmed.length > ADDRESS_MAX_LENGTH) return "Full address must be 200 characters or less.";
  if (!isSafeText(trimmed, ADDRESS_MAX_LENGTH)) return "Full address can't contain <, > or \".";
  return "";
}

export function validateAptSuiteUnit(value: string): string {
  if (value.length > ADDRESS_MAX_LENGTH) return "Apt, suite, unit must be 200 characters or less.";
  if (!isSafeText(value, ADDRESS_MAX_LENGTH)) return "Apt, suite, unit can't contain <, > or \".";
  return "";
}

// Shown under the email field when the route rejects a disposable domain —
// same wording UserEmail.tsx shows when /api/validate-email blocks one.
export const BLOCKED_EMAIL_MESSAGE = "This email address appears to be invalid. Please check and try again.";

export function validateEmail(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  if (!isValidEmail(trimmed)) return "Enter a valid email address.";
  return "";
}

export function validateMobile(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "Mobile number is required.";
  if (!isValidPhone(trimmed)) return "Please enter a valid mobile number.";
  return "";
}

// Server-side check of a whole submission. Returns the names of the invalid
// fields (never their values, which are PII). The dropdown and checkbox values
// are fixed in the form, so anything outside those lists came from a direct
// call. submissionDate is optional; the route defaults it.
export function getInvalidOptOutFields(values: Record<string, unknown>): string[] {
  const text = (key: string) => (typeof values[key] === "string" ? (values[key] as string) : null);
  const invalid: string[] = [];
  const check = (key: string, ok: (value: string) => boolean, optional = false) => {
    const value = text(key);
    if (value === null ? !(optional && values[key] === undefined) : !ok(value)) invalid.push(key);
  };

  check("submissionDate", (v) => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(v), true);
  check("submittedOnBehalfOf", (v) => (SUBMITTED_ON_BEHALF_OPTIONS as readonly string[]).includes(v));
  check("firstName", (v) => !validateFirstLegalName(v));
  check("lastName", (v) => !validateLastLegalName(v));
  check("fullAddress", (v) => !validateFullAddress(v));
  check("aptSuiteUnit", (v) => !validateAptSuiteUnit(v), true);
  check("email", (v) => !validateEmail(v));
  check("mobileNumber", (v) => !validateMobile(v));
  check("selectedRights", (v) =>
    v === "" || v.split(", ").every((right) => (PRIVACY_RIGHTS as readonly string[]).includes(right)), true);
  return invalid;
}
