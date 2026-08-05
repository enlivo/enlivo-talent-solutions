import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { InViewGroup, InViewItem } from "@/components/motion/InView";
import { SectionTexture } from "@/components/ui/SectionTexture";
import { processSteps } from "@/lib/processSteps";

export function ProcessPreview() {
  return (
    <section className="relative isolate bg-paper-dim py-28 lg:py-36">
      <SectionTexture corner="bottom-left" dotOpacity={0.16} blob="#C9A24A" blobOpacity={0.13} />
      <div className="relative z-10 container-px mx-auto max-w-content">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="max-w-lg text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-ink">
              <TextReveal lines={["Five steps to a shortlist", "you can trust."]} scale="h2" as="span" />
            </h2>
          </div>
          <Button href="/process" variant="ghost" arrow>
            See the full process
          </Button>
        </div>

        <InViewGroup className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step) => (
            <InViewItem key={step.title}>
              <div className="h-px w-8 bg-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-xl font-medium text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{step.short}</p>
            </InViewItem>
          ))}
        </InViewGroup>
      </div>
    </section>
  );
}
