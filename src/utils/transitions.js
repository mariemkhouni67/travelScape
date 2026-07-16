/**
 * TravelScape Animation Tokens
 * ─────────────────────────────
 * Single source of truth for all Framer Motion spring/easing presets.
 * Import from this file instead of inlining values per-component.
 *
 * Usage:
 *   import { springSoft, fadeUp, staggerContainer } from '@/utils/transitions'
 *   <motion.div transition={springSoft} variants={fadeUp} />
 */

// ── Spring transitions ───────────────────────────────────────────────────────

/** Gentle lift for card hover — used on DestinationCard, HotelCard, StatsCounter */
export const springSoft = {
  type: 'spring',
  stiffness: 260,
  damping: 22,
}

/** Fast, snappy feel for button taps, search bar, toggle interactions */
export const springSnappy = {
  type: 'spring',
  stiffness: 420,
  damping: 28,
}

/** Layout ID animations — navbar active pill, tab indicators */
export const springLayout = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
}

// ── Variants (used with motion `variants` prop) ──────────────────────────────

/** Fade + slide up — standard scroll-reveal entrance for sections and cards */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

/** Simple opacity fade — for overlays, badges, secondary elements */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

/** Scale + fade entrance — for modals, auth cards, popovers */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── Stagger containers ───────────────────────────────────────────────────────

/** Parent container that staggers children — wrap grid or list */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

/** Individual child of a stagger container */
export const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── Page transitions ─────────────────────────────────────────────────────────

/** Route-level enter/exit — used with AnimatePresence */
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } },
}
