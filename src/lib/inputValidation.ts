// Input rules shared by the forms and by the API routes that store or email
// what those forms submit (OWASP WSTG-INPV-01/02). The browser checks are for
// the user; the route checks are the security control, because anyone can
// call a route directly and skip the form. Keep both sides on these helpers
// so a real lead can never pass the form and then be rejected by the route.
//
// These are allow lists, not attack filters: they describe what a valid
// value looks like rather than trying to recognise every XSS payload. 

// ---- Names ----
// First/last name rules for the onboarding name steps (UserName,
// UserInfoCheckName) and the opt-out form. validateName() returns the message
// the form shows; isValidName() below is the route-side yes/no check.

// Accepts letters in any script (José, 李明) plus spaces, apostrophes and
// hyphens (O'Brien, Mary-Jane).

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 250;

// U+2019: iOS types ’ for (curly apostrophes) apostrophes by default ("O’Brien"). Accepted here,
// converted to ' by normalizeName() before submit.
const CURLY_APOSTROPHE = /’/g;

// \p{M} keeps decomposed accents valid (e + U+0301 renders as é).
const ALLOWED_CHARS = /^[\p{L}\p{M} '’-]+$/u;

// Starts and ends with a letter; single spaces and single ' ’ - only
// between letters. An apostrophe may be followed by one space, since
// names like "D' Souza" are commonly written that way; a hyphen may not.
// Rejects "admin'--", "-Mary", "O''Brien", "D 'Souza", "Mary- Jane".
const NAME_SHAPE = /^\p{L}\p{M}*(?:[\p{L}\p{M}]| (?=\p{L})|['’] ?(?=\p{L})|-(?=\p{L}))*$/u;

// Use only one space between words, not two or more.
const CONSECUTIVE_SPACES = / {2,}/;

// A hyphen needs a letter directly on both sides ("Alroy- DSouza" fails).
// Checked before NAME_SHAPE so hyphen mistakes get their own message.
const MISPLACED_HYPHEN = /(?:^|[^\p{L}\p{M}])-|-(?!\p{L})/u;

// Code points, not UTF-16 units — a rare CJK character can be two units.
const length = (value: string) => Array.from(value).length;

export function validateName(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "Required.";
  if (length(trimmed) < NAME_MIN_LENGTH) return `Minimum ${NAME_MIN_LENGTH} characters required.`;
  if (length(trimmed) > NAME_MAX_LENGTH) return `Maximum ${NAME_MAX_LENGTH} characters allowed.`;
  if (!ALLOWED_CHARS.test(trimmed)) return "Only letters, spaces, apostrophes and hyphens are allowed.";
  if (CONSECUTIVE_SPACES.test(trimmed)) return "Use only one space between words.";
  if (MISPLACED_HYPHEN.test(trimmed)) return "Hyphen can only be used between letters.";
  if (!NAME_SHAPE.test(trimmed)) return "Please enter a valid name using letters, spaces, apostrophes, or hyphens.";
  return "";
}

// The shape every name step submits: trimmed, with ’ as '.
export function normalizeName(value: string): string {
  return value.trim().replace(CURLY_APOSTROPHE, "'");
}

// < > " are never part of a real name, address, email or phone number, but
// they're how markup gets injected.
const MARKUP_CHARS = /[<>"]/;

export const EMAIL_MAX_LENGTH = 250;
export const EMAIL_REGEX = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

export function hasMarkup(value: string): boolean {
  return MARKUP_CHARS.test(value);
}

// The onboarding first/last name rule (EVA-291).
export function isValidName(value: unknown): value is string {
  return typeof value === "string" && !validateName(value);
}

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= EMAIL_MAX_LENGTH && EMAIL_REGEX.test(value);
}

const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

export function isValidPhone(value: unknown): value is string {
  return typeof value === "string" && PHONE_REGEX.test(value);
}

// The shape normalizeDob() submits. Only the shape: the minimum-age rule
// depends on "today" in the visitor's timezone, so the server leaves it to
// the form rather than risk rejecting someone on their 18th birthday.
export function isDobFormat(value: unknown): value is string {
  return typeof value === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(value);
}

// What fmtCurrency() produces: "$12,000", "$1,234.5", "$-500".
export function isCurrencyAmount(value: unknown): value is string {
  return typeof value === "string" && /^\$-?\d[\d,]*(\.\d+)?$/.test(value);
}

// Free text that is stored or emailed but has no stricter shape.
export function isSafeText(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.length <= maxLength && !hasMarkup(value);
}

// Fields that saveFlowMeta() sends from the PII steps, each with the same rule
// the step's form applies before sending.
const FLOW_META_PII_RULES: Record<string, (value: unknown) => boolean> = {
  first_name: isValidName,
  last_name: isValidName,
  dob: isDobFormat,
  email: isValidEmail,
  phone: isValidPhone,
};

const FLOW_META_TEXT_MAX_LENGTH = 500;

// The rest of `ai` is booleans, amounts and option labels chosen from fixed
// lists (debt_pain_point, goal_selected, ...), so any text there just has to
// be free of markup. Returns the invalid keys, never their values.
export function getInvalidFlowMetaFields(ai: Record<string, unknown>): string[] {
  const isSafe = (value: unknown): boolean =>
    typeof value === "string"
      ? isSafeText(value, FLOW_META_TEXT_MAX_LENGTH)
      : Array.isArray(value)
        ? value.every(isSafe)
        : value === null || typeof value === "number" || typeof value === "boolean";

  return Object.entries(ai)
    .filter(([key, value]) => !(FLOW_META_PII_RULES[key] ?? isSafe)(value))
    .map(([key]) => key);
}
