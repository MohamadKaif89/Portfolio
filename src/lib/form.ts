import { portfolio } from "../data/portfolio.ts";

export type FormResult = "sent" | "mailto" | "error";

/**
 * Post a message to Formspree when `VITE_FORMSPREE_ID` is set.
 * Otherwise hand the same text to the visitor's email app.
 */
export async function sendMessage(fields: Record<string, string>): Promise<FormResult> {
  const id = import.meta.env.VITE_FORMSPREE_ID?.trim();

  if (!id) {
    const subject = encodeURIComponent(fields.subject ?? "Portfolio message");
    const body = encodeURIComponent(
      [`Name: ${fields.name ?? ""}`, fields.email ? `Email: ${fields.email}` : "", "", fields.message ?? ""]
        .filter(Boolean)
        .join("\n"),
    );
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
    return "mailto";
  }

  try {
    const response = await fetch(`https://formspree.io/f/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    return response.ok ? "sent" : "error";
  } catch {
    return "error";
  }
}
