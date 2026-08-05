"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";

type FormState = {
  name: string;
  company: string;
  role: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  role: "",
  email: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-lg border border-line bg-card px-4 py-3 text-ink placeholder:text-ink-soft/60 focus:border-gold-deep";
const labelClass = "mono-label mb-2 block text-ink-soft";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyeggkal";

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange(field: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): boolean {
    const nextErrors: Partial<FormState> = {};
    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.company.trim()) nextErrors.company = "Company is required.";
    if (!values.role.trim()) nextErrors.role = "Let us know what you're hiring for.";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) nextErrors.message = "Add a short message.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setSubmitError(null);

    try {
      let res: Response;
      try {
        res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        });
      } catch {
        // fetch() itself threw — a network failure, not a Formspree response.
        // Never surface the raw browser error text (e.g. "Failed to fetch").
        throw new Error(
          "Couldn't send your message. Check your connection and try again."
        );
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message =
          data?.errors?.map((e: { message: string }) => e.message).join(", ") ||
          "Something went wrong sending your message. Please try again.";
        throw new Error(message);
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your message. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-card p-8">
        <p className="font-display text-2xl font-medium text-ink">
          Message sent.
        </p>
        <p className="mt-2 text-ink-soft">
          We&rsquo;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={fieldClass}
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldClass}
            value={values.company}
            onChange={(e) => handleChange("company", e.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company && (
            <p id="company-error" className="mt-1.5 text-xs text-red-600">
              {errors.company}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="role" className={labelClass}>
          Role you&rsquo;re hiring for
        </label>
        <input
          id="role"
          name="role"
          type="text"
          className={fieldClass}
          value={values.role}
          onChange={(e) => handleChange("role", e.target.value)}
          aria-invalid={Boolean(errors.role)}
          aria-describedby={errors.role ? "role-error" : undefined}
        />
        {errors.role && (
          <p id="role-error" className="mt-1.5 text-xs text-red-600">
            {errors.role}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={fieldClass}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && submitError && (
        <p className="text-sm text-red-600" role="alert">
          {submitError}
        </p>
      )}

      <Magnetic>
        <Button
          type="submit"
          variant="primary"
          className="mt-2 w-full sm:w-auto"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </Magnetic>
    </form>
  );
}
