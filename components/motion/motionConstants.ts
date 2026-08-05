// Named motion constants — implement these exactly, the same way a design
// spec's hex values get implemented exactly. Do not tune per-usage.

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_CUBIC = [0.65, 0, 0.35, 1] as const;

export const TEXT_REVEAL = {
  headline: { stagger: 0.14, duration: 1.1 },
  h2: { stagger: 0.12, duration: 0.95 },
} as const;

export const IN_VIEW_SPRING = { stiffness: 200, damping: 26 };
export const CARD_SPRING = { stiffness: 180, damping: 26 };
export const STAT_CELL_SPRING = { stiffness: 180, damping: 24 };
export const TESTIMONIAL_SPRING = { stiffness: 180, damping: 26 };
export const TESTIMONIAL_HOVER_SPRING = { stiffness: 300, damping: 22 };
export const CARD_HOVER_SPRING = { stiffness: 300, damping: 22 };

export const MAGNETIC_SPRING = { stiffness: 300, damping: 20 };
export const MAGNETIC_MAX_PULL = 8;

export const IN_VIEW_STAGGER = 0.09; // within the 80-110ms range

export const HERO_SEQUENCE = {
  eyebrowDelay: 0,
  subheadDelay: 0.5,
  ctaDelay: 0.65,
  statBarDelay: 0.85,
} as const;

export const LOADER = {
  MIN_VISIBLE_MS: 1400,
  MAX_VISIBLE_MS: 2600,
  EXIT_MS: 850,
  WORDMARK_SPRING: { stiffness: 200, damping: 22 },
  PROGRESS_DELAY_MS: 120,
  PROGRESS_DURATION_MS: 1280,
} as const;
