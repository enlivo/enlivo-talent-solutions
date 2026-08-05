import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { CandidateInterestForm } from "@/components/sections/CandidateInterestForm";
import { SectionTexture } from "@/components/ui/SectionTexture";

export const metadata: Metadata = {
  title: "For Candidates | Enlivo Talent Solutions",
  description:
    "We're actively building talent pipelines across BFSI, fintech, and technology. Register your interest and we'll reach out when a matching opportunity opens.",
};

export default function CandidatesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="For Candidates"
        lines={["We're always looking", "for great talent."]}
        subhead="We're actively building talent pipelines across BFSI, fintech, and technology. Tell us what you're looking for, and we'll reach out when a matching opportunity opens."
      />

      <section className="relative isolate bg-paper pb-28 lg:pb-36">
        <SectionTexture corner="top-right" />
        <div className="relative z-10 container-px mx-auto grid max-w-content gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-xl font-medium text-ink">
              How this works
            </h2>
            <p className="mt-4 max-w-xl text-ink-soft">
              This isn&rsquo;t a job board. We don&rsquo;t have open client
              roles to list publicly yet, and we won&rsquo;t pretend
              otherwise. What we&rsquo;re building is a genuine pipeline:
              register your details once, and when a role that matches your
              background and interests opens with one of our clients,
              you&rsquo;ll be one of the first people we call.
            </p>
            <p className="mt-4 max-w-xl text-ink-soft">
              Background verification and confidential handling apply here
              the same way they do for every search we run. Your details
              stay with us, they&rsquo;re not shared with a client until you
              agree to it.
            </p>
          </div>

          <div>
            <CandidateInterestForm />
          </div>
        </div>
      </section>
    </main>
  );
}
