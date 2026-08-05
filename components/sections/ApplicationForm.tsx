"use client";

import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase/client";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  phone: string;
  coverNote: string;
};

const initialState: FormState = { name: "", email: "", phone: "", coverNote: "" };

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

export function ApplicationForm({
  jobSlug,
  jobTitle,
}: {
  jobSlug: string;
  jobTitle: string;
}) {
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
          Applications temporarily unavailable
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          Our application system is being set up. In the meantime, email your
          resume to{" "}
          <a href="mailto:contact@enlivotalentsolutions.com" className="underline">
            contact@enlivotalentsolutions.com
          </a>{" "}
          with &ldquo;{jobTitle}&rdquo; in the subject line.
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
    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.phone.trim()) nextErrors.phone = "Phone number is required.";
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
      const path = `${jobSlug}/${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(path, file, { contentType: file.type || undefined });

      if (uploadError) {
        throw new Error(`Resume upload failed: ${uploadError.message}`);
      }

      // The `resumes` bucket is private (resumes contain PII). We store the
      // storage path here, not a public URL — the admin dashboard turns this
      // into a short-lived signed URL server-side, using the service role
      // key, only when a recruiter is actually viewing the dashboard.
      const { error: insertError } = await supabase.from("applications").insert({
        job_slug: jobSlug,
        job_title: jobTitle,
        applicant_name: values.name.trim(),
        applicant_email: values.email.trim(),
        applicant_phone: values.phone.trim(),
        resume_url: path,
        cover_note: values.coverNote.trim() || null,
        status: "new",
      });

      if (insertError) {
        throw new Error(`Couldn't save your application: ${insertError.message}`);
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong submitting your application. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-card p-8">
        <p className="font-display text-xl font-medium text-ink">
          Application received.
        </p>
        <p className="mt-2 text-ink-soft">We&rsquo;ll be in touch.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-line bg-card p-8"
    >
      <p className="mono-label text-ink-soft">Applying for {jobTitle}</p>

      <div>
        <label htmlFor="app-name" className={labelClass}>
          Full name
        </label>
        <input
          id="app-name"
          name="name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "app-name-error" : undefined}
        />
        {errors.name && (
          <p id="app-name-error" className="mt-1.5 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="app-email" className={labelClass}>
          Email
        </label>
        <input
          id="app-email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "app-email-error" : undefined}
        />
        {errors.email && (
          <p id="app-email-error" className="mt-1.5 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="app-phone" className={labelClass}>
          Phone
        </label>
        <input
          id="app-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={fieldClass}
          value={values.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "app-phone-error" : undefined}
        />
        {errors.phone && (
          <p id="app-phone-error" className="mt-1.5 text-xs text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="app-resume" className={labelClass}>
          Resume (PDF, DOC, or DOCX — max 5MB)
        </label>
        <input
          id="app-resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink file:mr-4 file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink"
          onChange={handleFileChange}
          aria-invalid={Boolean(errors.file)}
          aria-describedby={errors.file ? "app-resume-error" : undefined}
        />
        {errors.file && (
          <p id="app-resume-error" className="mt-1.5 text-xs text-red-600">
            {errors.file}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="app-note" className={labelClass}>
          Cover note (optional)
        </label>
        <textarea
          id="app-note"
          name="coverNote"
          rows={4}
          className={fieldClass}
          value={values.coverNote}
          onChange={(e) => handleChange("coverNote", e.target.value)}
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
        {status === "submitting" ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}
