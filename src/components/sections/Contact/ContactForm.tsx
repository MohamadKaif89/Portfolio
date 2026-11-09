import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { portfolio } from "../../../data/portfolio.ts";
import { usePrefersReducedMotion } from "../../../hooks/useMediaQuery.ts";
import { easeOut } from "../../../lib/animations.ts";
import { submitContact, validateContact, type ContactErrors } from "../../../lib/contact.ts";
import { Button } from "../../ui/Button.tsx";
import { WhatsAppButton } from "../../ui/WhatsAppButton.tsx";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Contact form. Validates locally, then posts to Web3Forms.
 * A hidden `botcheck` field is the honeypot.
 *
 * @example
 * <ContactForm />
 */
export function ContactForm() {
  const reduced = usePrefersReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const lock = useRef(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (lock.current) return;

    const next = validateContact({ name, email, message });
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("idle");
      return;
    }

    const form = formRef.current;
    if (!form) return;

    lock.current = true;
    setStatus("sending");
    const result = await submitContact(form);
    lock.current = false;
    setStatus(result === "sent" ? "success" : "error");

    if (result === "sent") {
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
      form.reset();
    }
  };

  return (
    <form ref={formRef} className="relative mx-auto mt-10 max-w-form" onSubmit={onSubmit} noValidate aria-busy={status === "sending"}>
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="botcheck">Leave this blank</label>
        <input id="botcheck" name="botcheck" type="checkbox" tabIndex={-1} aria-hidden="true" autoComplete="off" />
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-x-16">
        <Field
          id="contact-name"
          name="name"
          label={portfolio.contact.fields.name.label}
          value={name}
          placeholder={portfolio.contact.fields.name.placeholder}
          autoComplete="name"
          maxLength={80}
          error={errors.name}
          reduced={reduced}
          onChange={(value) => {
            setName(value);
            setErrors((current) => ({ ...current, name: undefined }));
          }}
        />
        <Field
          id="contact-email"
          name="email"
          type="email"
          label={portfolio.contact.fields.email.label}
          value={email}
          placeholder={portfolio.contact.fields.email.placeholder}
          autoComplete="email"
          maxLength={120}
          error={errors.email}
          reduced={reduced}
          onChange={(value) => {
            setEmail(value);
            setErrors((current) => ({ ...current, email: undefined }));
          }}
        />
      </div>

      <div className="mt-8">
        <label htmlFor="contact-message" className="font-display text-body font-light text-accent-ink">
          {portfolio.contact.fields.message.label}
        </label>
        <motion.textarea
          id="contact-message"
          name="message"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setErrors((current) => ({ ...current, message: undefined }));
          }}
          placeholder={portfolio.contact.fields.message.placeholder}
          rows={4}
          maxLength={2000}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          whileFocus={reduced ? undefined : { y: -1 }}
          transition={{ duration: reduced ? 0 : 0.2, ease: easeOut }}
          className="mt-2 min-h-[51px] w-full resize-y rounded-lg bg-field px-4 py-4 font-display text-body text-ink outline-none ring-1 ring-line/15 placeholder:text-ink/40 focus-visible:ring-2 focus-visible:ring-accent"
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-2 font-sans text-small text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button type="submit" variant="accent" disabled={status === "sending"}>
          {status === "sending" ? portfolio.contact.sending : portfolio.contact.submit}
        </Button>
        <WhatsAppButton />
      </div>
      <p className="mt-4 text-center font-sans text-small text-ink/80">{portfolio.contact.helper}</p>
      <FormNotice status={status} reduced={reduced} />
    </form>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  maxLength: number;
  error?: string;
  reduced: boolean;
  onChange: (value: string) => void;
  type?: string;
};

/** Labeled text field with a small lift on focus and an inline error. */
function Field({
  id,
  name,
  label,
  value,
  placeholder,
  autoComplete,
  maxLength,
  error,
  reduced,
  onChange,
  type = "text",
}: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="font-display text-body font-light text-accent-ink">
        {label}
      </label>
      <motion.input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        whileFocus={reduced ? undefined : { y: -1 }}
        transition={{ duration: reduced ? 0 : 0.2, ease: easeOut }}
        className="mt-2 h-[51px] w-full rounded-lg bg-field px-4 font-display text-body text-ink outline-none ring-1 ring-line/15 placeholder:text-ink/40 focus-visible:ring-2 focus-visible:ring-accent"
      />
      {error ? (
        <p id={errorId} className="mt-2 font-sans text-small text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Success fades in. Errors use an alert so assistive tech announces them. */
function FormNotice({ status, reduced }: { status: Status; reduced: boolean }) {
  if (status !== "success" && status !== "error") return null;

  if (status === "error") {
    return (
      <p role="alert" className="mt-6 text-center font-sans text-body text-ink/80">
        {portfolio.contact.error}{" "}
        <a href={`mailto:${portfolio.email}`} className="text-accent-ink underline">
          {portfolio.contact.fallbackLabel}
        </a>
      </p>
    );
  }

  return (
    <motion.p
      role="status"
      className="mt-6 text-center font-sans text-body text-ink/80"
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, ease: easeOut }}
    >
      {portfolio.contact.success}
    </motion.p>
  );
}
