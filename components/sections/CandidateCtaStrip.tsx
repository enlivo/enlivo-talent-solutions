import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Deliberately quiet and separate from the primary (hiring-company) CTAs —
 * different audience, different tone, no gold button. A slim text banner,
 * not another full CTA band, so it never competes with the hero or CtaBand.
 */
export function CandidateCtaStrip() {
  return (
    <section className="border-t border-line bg-paper-dim py-8">
      <div className="container-px mx-auto flex max-w-content flex-wrap items-center justify-center gap-3 text-center">
        <p className="text-ink-soft">Looking for your next role?</p>
        <Link
          href="/candidates"
          className="inline-flex items-center gap-1.5 font-medium text-ink underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold-deep"
        >
          Register your interest
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
