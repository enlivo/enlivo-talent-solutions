"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MatchGlyph } from "@/components/ui/MatchGlyph";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLenis } from "./LenisProvider";
import { EASE_IN_OUT_CUBIC, LOADER } from "@/components/motion/motionConstants";

const SESSION_KEY = "enlivo-loaded";

const ReadyContext = createContext(true);

/** Gates hero reveals: false until the loader (or its skip-check) resolves. */
export function useLoaderReady() {
  return useContext(ReadyContext);
}

export function Loader({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const lenis = useLenis();

  // Default true so first paint always covers the page; flips to false fast
  // via effect below if this session has already seen the loader.
  const [playIntro, setPlayIntro] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setPlayIntro(false);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!playIntro) return;

    lenis?.stop();

    const minMs = reduced ? 200 : LOADER.MIN_VISIBLE_MS;
    const maxMs = reduced ? 200 : LOADER.MAX_VISIBLE_MS;

    let finished = false;
    let minTimer: ReturnType<typeof setTimeout> | undefined;

    function finish() {
      if (finished) return;
      finished = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setReady(true);
      lenis?.start();
      setPlayIntro(false);
    }

    function startMinTimer() {
      minTimer = setTimeout(finish, minMs);
    }

    if (document.readyState === "complete") {
      startMinTimer();
    } else {
      window.addEventListener("load", startMinTimer, { once: true });
    }

    const maxTimer = setTimeout(finish, maxMs);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      window.removeEventListener("load", startMinTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playIntro]);

  return (
    <ReadyContext.Provider value={ready}>
      <AnimatePresence>
        {playIntro && (
          <motion.div
            key="loader"
            initial={{ y: 0 }}
            exit={{ y: reduced ? "-100%" : "-105%" }}
            transition={{
              duration: reduced ? 0.05 : LOADER.EXIT_MS / 1000,
              ease: EASE_IN_OUT_CUBIC,
            }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-teal"
          >
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: LOADER.WORDMARK_SPRING.stiffness,
                damping: LOADER.WORDMARK_SPRING.damping,
              }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-3">
                <MatchGlyph size={24} className="text-on-teal" />
                <span className="font-display text-xl font-medium text-on-teal">
                  Enlivo
                </span>
              </div>
              <span className="mono-label mt-3 text-on-teal/70">
                Talent Solutions
              </span>
            </motion.div>

            <div className="h-px w-40 bg-on-teal/20">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: reduced ? 0 : LOADER.PROGRESS_DELAY_MS / 1000,
                  duration: reduced ? 0.05 : LOADER.PROGRESS_DURATION_MS / 1000,
                  ease: EASE_IN_OUT_CUBIC,
                }}
                style={{ transformOrigin: "left" }}
                className="h-full w-full bg-on-teal"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </ReadyContext.Provider>
  );
}
