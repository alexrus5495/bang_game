import type { Transition } from "motion";

export const BUTTON_WHILE_HOVER = {
  color: "var(--RED)",
  webkitTextStroke: "0.1vw var(--BLACK)",
  scale: 1.2,
};

export const BUTTON_TRANSITION: Transition = {
  scale: { duration: 0.15, ease: "easeOut" },
  color: { duration: 0 },
};
