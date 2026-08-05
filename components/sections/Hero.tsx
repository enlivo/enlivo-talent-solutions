"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLoaderReady } from "@/components/layout/Loader";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { StatCell } from "@/components/ui/StatCell";
import {
  EASE_OUT_EXPO,
  HERO_SEQUENCE,
  IN_VIEW_STAGGER,
} from "@/components/motion/motionConstants";

const roles = ["BFSI", "NBFC", "Insurance", "Fintech", "Banking", "Asset Management", "Wealth Management", "Capital Markets"];

const stats = [
  { value: "Founder-led engagement", label: "on every search, not handed off" },
  { value: "Direct access", label: "no account managers, no middle layer" },
  { value: "Built for regulated industries", label: "compliance-first, from day one" },
];

const statBarVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: IN_VIEW_STAGGER, delayChildren: HERO_SEQUENCE.statBarDelay },
  },
};

function fadeVariant(delay: number) {
  return {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: EASE_OUT_EXPO },
    },
  };
}

function RoleTicker() {
  const [paused, setPaused] = useState(false);
  const track = [...roles, ...roles];

  return (
    <motion.div
      onHoverStart={() => setPaused(true)}
      onHoverEnd={() => setPaused(false)}
      className="overflow-hidden border-y border-line-on-teal py-4"
    >
      <div data-paused={paused} className="marquee-track flex w-max whitespace-nowrap">
        {track.map((role, i) => (
          <span key={i} className="flex items-center font-body text-sm text-on-teal/70">
            {role}
            <span className="mono-label mx-6 text-gold-light">·</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ready = useLoaderReady();

  return (
    <section id="top" className="relative overflow-hidden bg-teal pb-0 pt-28">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-boardroom.jpg"
          alt="Professionals in a boardroom meeting, representing Enlivo Talent Solutions' BFSI and regulated-industry hiring work"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Mobile/tablet: vertical fade, dark at both the headline (top) and the
            ticker/stats strip (bottom), lighter in the middle so the photo still
            reads clearly there. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,59,58,0.85)_0%,rgba(15,59,58,0.62)_40%,rgba(15,59,58,0.6)_70%,rgba(15,59,58,0.9)_100%)] lg:hidden"
        />
        {/* Desktop: horizontal fade for the headline column, layered with a
            bottom-anchored darken so the full-width ticker/stats strip stays
            legible regardless of how bright that part of the photo is. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(15,59,58,0) 0%, rgba(15,59,58,0) 78%, rgba(15,59,58,0.92) 100%), linear-gradient(to right, rgba(15,59,58,0.85) 0%, rgba(15,59,58,0.85) 33%, rgba(15,59,58,0.2) 100%)",
          }}
        />
      </div>

      <div className="relative">
        <div className="relative container-px mx-auto max-w-content py-28 lg:py-32">
          <div className="max-w-xl">
            <motion.div
              initial="hidden"
              animate={ready ? "visible" : "hidden"}
              variants={fadeVariant(HERO_SEQUENCE.eyebrowDelay)}
            >
              <Eyebrow tone="on-teal">Hiring for Regulated Industries</Eyebrow>
            </motion.div>

            <h1 className="mt-6 font-display font-medium leading-[1.05] tracking-tight text-on-teal text-[clamp(2.25rem,4vw,3.25rem)]">
              {/* Measured against real rendered word widths: this 4-line break is
                  the one that fits a 375px viewport without re-wrapping and
                  without stranding a lone word/comma on any line. */}
              <span className="lg:hidden">
                <TextReveal
                  lines={["Talent that meets", "your compliance", "bar, not just", "your headcount."]}
                  start={ready}
                  scale="headline"
                />
              </span>
              <span className="hidden lg:inline">
                <TextReveal
                  lines={["Talent that meets", "your compliance bar,", "not just your headcount."]}
                  start={ready}
                  scale="headline"
                />
              </span>
            </h1>

            <motion.p
              initial="hidden"
              animate={ready ? "visible" : "hidden"}
              variants={fadeVariant(HERO_SEQUENCE.subheadDelay)}
              className="mt-7 max-w-md text-lg text-on-teal/75"
            >
              Background-verified candidates, confidential search, and hiring
              SLAs your risk and compliance teams will actually sign off on.
            </motion.p>

            <motion.div
              initial="hidden"
              animate={ready ? "visible" : "hidden"}
              variants={fadeVariant(HERO_SEQUENCE.ctaDelay)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <Button href="/contact" variant="primary" arrow>
                  Talk to our team
                </Button>
              </Magnetic>
              <Button href="/process" variant="ghost-on-teal">
                See our process
              </Button>
            </motion.div>
          </div>
        </div>

        <RoleTicker />

        <div className="container-px mx-auto max-w-content">
          <motion.div
            initial="hidden"
            animate={ready ? "visible" : "hidden"}
            variants={statBarVariants}
            className="flex flex-wrap items-baseline gap-x-12 gap-y-4 py-9"
          >
            {stats.map((stat, i) => (
              <StatCell
                key={stat.label}
                value={stat.value}
                label={stat.label}
                tone={i === stats.length - 1 ? "gold" : "dark"}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
