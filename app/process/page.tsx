import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProcessStepRow } from "@/components/sections/ProcessStepRow";
import { MatchGlyph } from "@/components/ui/MatchGlyph";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { processSteps } from "@/lib/processSteps";

export const metadata: Metadata = {
  title: "Process | Enlivo Talent Solutions",
  description:
    "How Enlivo hires: Brief, Source, Assess, Present, Place & Support. A five-step process you can actually track.",
};

export default function ProcessPage() {
  return (
    <main>
      <PageHeader
        eyebrow="How It Works"
        lines={["A hiring process you can", "actually track."]}
        subhead="No black box. Here's exactly what happens between the brief and the offer letter."
      />

      <section className="bg-paper pb-28 lg:pb-36">
        <div className="container-px mx-auto max-w-content">
          <div className="relative max-w-2xl">
            <div
              aria-hidden="true"
              className="absolute left-5 top-0 h-full w-px -translate-x-1/2 bg-ink/15"
            />
            {processSteps.map((step, i) => (
              <div key={step.title}>
                <ProcessStepRow step={step} />
                {i === 3 && (
                  <div className="relative flex items-center gap-4 py-2 pl-1">
                    <MatchGlyph size={22} className="relative z-10 text-ink-soft" />
                    <span className="mono-label text-ink-soft">
                      Talent meets team
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-start">
            <Magnetic>
              <Button href="/contact" variant="primary" arrow>
                Talk to our team
              </Button>
            </Magnetic>
          </div>
        </div>
      </section>
    </main>
  );
}
