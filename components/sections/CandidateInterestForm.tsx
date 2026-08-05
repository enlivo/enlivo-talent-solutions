"use client";

import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase/client";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const industries = ["BFSI", "Fintech", "Technology", "Healthcare", "Other"] as const;

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  currentTitle: string;
  industryInterest: (typeof industries)[number] | "";
  note: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  currentTitle: "",
  industryInterest: "",
  note: "",
};

const fieldClass =
  "w-full rounded-lg border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/60 focus:border-gold-deep";
const labelClass = "mono-label mb-2 block text-ink-soft";

function isAllowedFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export function CandidateInterestForm() {
  const supabase = useMemo(() => getSupabase(), []);

  const [values, setValues] = useState<FormState>(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "file", string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!supabase) {
    return (
      <div className="rounded-2xl border border-line bg-card p-8">
        <p className="font-display text-xl font-medium text-ink">
          Registration temporarily unavailable
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          Our candidate pipeline system is being set up. In the meantime,
          email your resume to{" "}
          <a href="mailto:contact@enlivotalentsolutions.com" className="underline">
            contact@enlivotalentsolutions.com
          </a>{" "}
          and we&rsquo;ll add you to our pipeline directly.
        </p>
      </div>
    );
  }

  function handleChange(field: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    if (!selected) {
      setFile(null);
      return;
    }
    if (!isAllowedFile(selected)) {
      setFile(null);
      setErrors((prev) => ({ ...prev, file: "Upload a PDF, DOC, or DOCX file." }));
      return;
    }
    if (selected.size > MAX_FILE_BYTES) {
      setFile(null);
      setErrors((prev) => ({ ...prev, file: "File is too large. Max size is 5MB." }));
      return;
    }
    setErrors((prev) => ({ ...prev, file: undefined }));
    setFile(selected);
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState | "file", string>> = {};
    if (!values.fullName.trim()) nextErrors.fullName = "Name is required.";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!values.industryInterest) nextErrors.industryInterest = "Choose an area of interest.";
    if (!file) nextErrors.file = "Attach your resume (PDF, DOC, or DOCX).";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate() || !file || !supabase) return;

    setStatus("submitting");
    setSubmitError(null);

    try {
      const path = `candidate-interest/${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(path, file, { contentType: file.type || undefined });

      if (uploadError) {
        throw new Error(`Resume upload failed: ${uploadError.message}`);
      }

      const { error: insertError } = await supabase.from("candidate_interest").insert({
        full_name: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        current_title: values.currentTitle.trim() || null,
        industry_interest: values.industryInterest,
        resume_url: path,
        note: values.note.trim() || null,
        status: "new",
      });

      if (insertError) {
        throw new Error(`Couldn't save your details: ${insertError.message}`);
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong submitting your details. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-card p-8">
        <p className="font-display text-xl font-medium text-ink">
          You&rsquo;re on our radar.
        </p>
        <p className="mt-2 text-ink-soft">
          We&rsquo;ll reach out when a matching opportunity opens.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-line bg-card p-8"
    >
      <div>
        <label htmlFor="ci-name" className={labelClass}>
          Full name
        </label>
        <input
          id="ci-name"
          name="fullName"
          type="text"
          autoComplete="name"
          className={fieldClass}
          value={values.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "ci-name-error" : undefined}
        />
        {errors.fullName && (
          <p id="ci-name-error" className="mt-1.5 text-xs text-red-600">
            {errors.fullName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="ci-email" className={labelClass}>
          Email
        </label>
        <input
          id="ci-email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "ci-email-error" : undefined}
        />
        {errors.email && (
          <p id="ci-email-error" className="mt-1.5 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="ci-phone" className={labelClass}>
          Phone
        </label>
        <input
          id="ci-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={fieldClass}
          value={values.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "ci-phone-error" : undefined}
        />
        {errors.phone && (
          <p id="ci-phone-error" className="mt-1.5 text-xs text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="ci-role" className={labelClass}>
          Current role / title
        </label>
        <input
          id="ci-role"
          name="currentTitle"
          type="text"
          className={fieldClass}
          value={values.currentTitle}
          onChange={(e) => handleChange("currentTitle", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="ci-industry" className={labelClass}>
          Industry / function of interest
        </label>
        <select
          id="ci-industry"
          name="industryInterest"
          className={fieldClass}
          value={values.industryInterest}
          onChange={(e) => handleChange("industryInterest", e.target.value)}
          aria-invalid={Boolean(errors.industryInterest)}
          aria-describedby={errors.industryInterest ? "ci-industry-error" : undefined}
        >
          <option value="" disabled>
            Select one
          </option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
        {errors.industryInterest && (
          <p id="ci-industry-error" className="mt-1.5 text-xs text-red-600">
            {errors.industryInterest}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="ci-resume" className={labelClass}>
          Resume (PDF, DOC, or DOCX — max 5MB)
        </label>
        <input
          id="ci-resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink file:mr-4 file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink"
          onChange={handleFileChange}
          aria-invalid={Boolean(errors.file)}
          aria-describedby={errors.file ? "ci-resume-error" : undefined}
        />
        {errors.file && (
          <p id="ci-resume-error" className="mt-1.5 text-xs text-red-600">
            {errors.file}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="ci-note" className={labelClass}>
          What are you looking for? (optional)
        </label>
        <textarea
          id="ci-note"
          name="note"
          rows={4}
          className={fieldClass}
          value={values.note}
          onChange={(e) => handleChange("note", e.target.value)}
        />
      </div>

      {status === "error" && submitError && (
        <p className="text-sm text-red-600" role="alert">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        className="mt-2"
        arrow={false}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Submitting…" : "Register interest"}
      </Button>
    </form>
  );
}
