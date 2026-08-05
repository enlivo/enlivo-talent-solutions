"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const statuses = ["new", "reviewed", "contacted", "rejected"] as const;

const labels: Record<(typeof statuses)[number], string> = {
  new: "New",
  reviewed: "Reviewed",
  contacted: "Contacted",
  rejected: "Rejected",
};

export function StatusSelect({
  id,
  status,
  endpoint = "/api/admin/applications",
}: {
  id: string;
  status: string;
  /** Base API path; the id is appended. Defaults to the job-applications route. */
  endpoint?: string;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(status);
  const [saving, setSaving] = useState(false);

  async function handleChange(next: string) {
    const previous = current;
    setCurrent(next);
    setSaving(true);

    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setCurrent(previous);
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={current}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value)}
      className="mono-label rounded-full border border-line bg-paper px-3 py-1.5 text-ink-soft disabled:opacity-50"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {labels[s]}
        </option>
      ))}
    </select>
  );
}
