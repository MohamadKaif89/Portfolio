import { portfolio } from "../data/portfolio.ts";
import { isEmail } from "./utils.ts";

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactSubmitResult = "sent" | "error";

const LIMITS = {
  name: 80,
  email: 120,
  message: 2000,
} as const;

/**
 * Trim the fields and return a message for each one that fails.
 * Limits: name 2–80, email format and 120, message 10–2000.
 */
export function validateContact(input: ContactFields): ContactErrors {
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();
  const copy = portfolio.contact.errors;
  const errors: ContactErrors = {};

  if (name.length < 2) errors.name = copy.name;
  else if (name.length > LIMITS.name) errors.name = copy.nameMax;

  if (email.length > LIMITS.email || !isEmail(email)) errors.email = copy.email;

  if (message.length < 10) errors.message = copy.message;
  else if (message.length > LIMITS.message) errors.message = copy.messageMax;

  return errors;
}

/**
 * Click-to-chat URL. Returns null when `VITE_WHATSAPP_NUMBER` is missing or not digits.
 * Non-digits are stripped so a pasted "+91 98..." still becomes a wa.me number.
 */
export function whatsAppUrl(message: string): string | null {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  if (!/^\d{8,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

type Web3Response = {
  success?: boolean;
};

/**
 * Post the contact form to Web3Forms. A checked honeypot returns "sent" without a request.
 * A missing key or a failed response returns "error".
 */
export async function submitContact(form: HTMLFormElement): Promise<ContactSubmitResult> {
  const botcheck = form.querySelector<HTMLInputElement>('input[name="botcheck"]');
  if (botcheck?.checked) return "sent";

  const key = import.meta.env.VITE_WEB3FORMS_KEY?.trim();
  if (!key) return "error";

  const data = new FormData(form);
  data.set("access_key", key);
  data.set("subject", portfolio.contact.subject);
  data.set("name", String(data.get("name") ?? "").trim());
  data.set("email", String(data.get("email") ?? "").trim());
  data.set("message", String(data.get("message") ?? "").trim());

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });
    const payload = (await response.json()) as Web3Response;
    return response.ok && payload.success ? "sent" : "error";
  } catch {
    return "error";
  }
}
