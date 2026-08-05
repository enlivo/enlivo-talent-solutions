"use client";

import { motion } from "framer-motion";
import { MatchGlyph } from "@/components/ui/MatchGlyph";
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { InView } from "@/components/motion/InView";
import { TESTIMONIAL_HOVER_SPRING, TESTIMONIAL_SPRING } from "@/components/motion/motionConstants";

export function Testimonial() {
  return (
    <section className="bg-teal py-28 lg:py-36">
      <div className="container-px mx-auto max-w-content">
        <InView spring={TESTIMONIAL_SPRING}>
          <motion.div
            whileHover={{ y: -8 }}
            transition={{
              type: "spring",
              stiffness: TESTIMONIAL_HOVER_SPRING.stiffness,
              damping: TESTIMONIAL_HOVER_SPRING.damping,
            }}
            className="max-w-3xl"
          >
            <MatchGlyph size={30} className="text-on-teal/40" />
            {/* TODO: placeholder editorial quote — replace with a real, permissioned client testimonial before launch */}
            <blockquote className="mt-8 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-[1.15] tracking-tight text-on-teal">
              &ldquo;Enlivo didn&rsquo;t just send resumes. They sent people
              who were actually right for the room.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <DuotoneImage
                  src="/images/testimonial-headshot.jpg"
                  alt="Portrait of Enlivo's client testimonial contributor, Head of Talent Acquisition at a leading NBFC"
                  overlayOpacity={0.18}
                  className="h-full w-full"
                  sizes="48px"
                />
              </div>
              <p className="mono-label text-on-teal/50">
                Head of Talent Acquisition, Leading NBFC
              </p>
            </div>
          </motion.div>
        </InView>
      </div>
    </section>
  );
}
