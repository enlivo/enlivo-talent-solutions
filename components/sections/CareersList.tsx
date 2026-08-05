"use client";

import { useState } from "react";
import Link from "next/link";
import { InViewGroup, InViewItem } from "@/components/motion/InView";
import { Button } from "@/components/ui/Button";
import { departments, openRoles, type Department } from "@/lib/careers";

export function CareersList() {
  const [activeDept, setActiveDept] = useState<Department>("All");

  const filtered =
    activeDept === "All"
      ? openRoles
      : openRoles.filter((role) => role.department === activeDept);

  return (
    <>
      <div
        role="group"
        aria-label="Filter by department"
        className="flex flex-wrap gap-3 border-b border-line pb-8"
      >
        {departments.map((dept) => (
          <button
            key={dept}
            type="button"
            onClick={() => setActiveDept(dept)}
            aria-pressed={activeDept === dept}
            className={`mono-label rounded-full border px-4 py-2 transition-colors ${
              activeDept === dept
                ? "border-gold bg-gold text-ink"
                : "border-line text-ink-soft hover:border-ink/30"
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      <InViewGroup className="mt-4 flex flex-col divide-y divide-line">
        {filtered.map((role) => (
          <InViewItem
            key={role.slug}
            className="flex flex-col justify-between gap-6 py-8 sm:flex-row sm:items-center"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/careers/${role.slug}`}
                  className="font-display text-xl font-medium text-ink transition-colors hover:text-gold-deep"
                >
                  {role.title}
                </Link>
                <span className="mono-label rounded-full border border-line px-2.5 py-1 text-[10px] text-ink-soft">
                  {role.department}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-soft">{role.summary}</p>
              <p className="mono-label mt-3 text-ink-soft/70">
                {role.location} · {role.type}
              </p>
            </div>
            <Button href={`/careers/${role.slug}`} variant="ghost" arrow className="shrink-0">
              Apply
            </Button>
          </InViewItem>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-ink-soft">
            No open roles in this department right now.
          </p>
        )}
      </InViewGroup>
    </>
  );
}
