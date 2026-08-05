"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      router.push("/admin/applications");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-paper px-6 py-28">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-line bg-card p-8"
      >
        <p className="mono-label text-ink-soft">Admin</p>
        <h1 className="mt-3 font-display text-2xl font-medium text-ink">
          Applications dashboard
        </h1>

        <label htmlFor="admin-password" className="mono-label mb-2 mt-6 block text-ink-soft">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-ink focus:border-gold-deep"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />

        {error && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" variant="primary" className="mt-6 w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </main>
  );
}
