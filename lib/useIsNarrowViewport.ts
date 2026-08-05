"use client";

import { useEffect, useState } from "react";

/**
 * True below the given breakpoint. Used to disable hover-driven springs
 * (magnetic buttons, parallax hover) on touch-sized viewports regardless
 * of the user's prefers-reduced-motion setting.
 */
export function useIsNarrowViewport(breakpoint = 768): boolean {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setNarrow(query.matches);

    const listener = (event: MediaQueryListEvent) => setNarrow(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, [breakpoint]);

  return narrow;
}
