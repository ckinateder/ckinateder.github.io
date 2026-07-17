const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const fadeUp = {
  hidden: () => ({ opacity: 0, y: reduced() ? 0 : 24 }),
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced() ? 0 : 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export const staggerContainer = {
  hidden: {},
  visible: () => ({
    transition: {
      staggerChildren: reduced() ? 0 : 0.08,
      delayChildren: reduced() ? 0 : 0.05,
    },
  }),
}

export const staggerItem = {
  hidden: () => ({ opacity: 0, y: reduced() ? 0 : 16 }),
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced() ? 0 : 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export const heroContainer = {
  hidden: {},
  visible: () => ({
    transition: {
      staggerChildren: reduced() ? 0 : 0.12,
      delayChildren: reduced() ? 0 : 0.1,
    },
  }),
}

export const heroItem = {
  hidden: () => ({ opacity: 0, y: reduced() ? 0 : 28 }),
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced() ? 0 : 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export const viewportOnce = { once: true, margin: '-40px' }
