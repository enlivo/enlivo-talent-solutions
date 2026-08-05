"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { MobileMenu } from "./MobileMenu";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/industries" },
  { label: "Process", href: "/process" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const CROSSFADE_RANGE = 420;

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { scrollY } = useScroll();
  const scrollBgOpacity = useTransform(scrollY, [0, CROSSFADE_RANGE], [0, 1]);
  const scrollTextColor = useTransform(
    scrollY,
    [0, CROSSFADE_RANGE],
    ["#FFFFFF", "#12211F"]
  );
  const scrollMutedColor = useTransform(
    scrollY,
    [0, CROSSFADE_RANGE],
    ["rgba(255,255,255,0.75)", "#5B726E"]
  );

  const bgOpacity = isHome ? scrollBgOpacity : 1;
  const textColor = isHome ? scrollTextColor : "#12211F";
  const mutedColor = isHome ? scrollMutedColor : "#5B726E";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-paper"
          style={{ opacity: bgOpacity }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-line"
          style={{ opacity: bgOpacity }}
        />
        <nav className="relative container-px mx-auto flex max-w-content items-center justify-between py-5">
          <motion.div style={{ color: textColor }}>
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg border border-gold/50 px-3 py-1.5"
            >
              <Image src="/images/logo-nav.png" alt="Enlivo" width={30} height={30} priority />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-medium">Enlivo</span>
                <motion.span
                  style={{ color: mutedColor }}
                  className="mono-label"
                >
                  Talent Solutions
                </motion.span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            style={{ color: textColor }}
            className="hidden items-center gap-9 lg:flex"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="font-body text-sm opacity-90 transition-opacity hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          <div className="hidden items-center gap-4 lg:flex">
            <motion.div style={{ color: textColor }}>
              <Link
                href="/candidates"
                className="mono-label rounded-full border border-gold/60 px-4 py-2 opacity-90 transition-opacity hover:opacity-100"
              >
                For Candidates
              </Link>
            </motion.div>
            <Magnetic>
              <Button href="/contact" variant="primary">
                Talk to our team
              </Button>
            </Magnetic>
          </div>

          <motion.button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            style={{ color: textColor, borderColor: textColor }}
            className="flex items-center justify-center rounded-full border p-2.5 opacity-90 lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </nav>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={links}
      />
    </>
  );
}
