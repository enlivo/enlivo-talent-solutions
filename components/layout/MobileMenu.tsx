"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLenis } from "./LenisProvider";

type NavLink = { label: string; href: string };

export function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [open, lenis]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-paper lg:hidden"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full flex-col justify-between px-8 pb-10 pt-28"
          >
            <nav className="flex flex-col gap-7">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-baseline gap-4 py-2 font-display text-3xl text-ink"
                >
                  <span className="mono-label text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-4">
              <Link
                href="/candidates"
                className="mono-label self-start rounded-full border border-gold/60 px-4 py-2 text-ink-soft"
              >
                For Candidates
              </Link>
              <Button href="/contact" variant="primary" className="w-full">
                Talk to our team
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
