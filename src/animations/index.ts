import { createObjectsFromMassImport } from "../lib/massImport";
import type { EventType } from "../types";

type AnimationModule = {
  default: React.ComponentType<Record<string, unknown>>;
};

export type AnimationComponent<P = Record<string, unknown>> = {
  Component: React.ComponentType<P>;
  props: P;
};

// 1. Get every .tsx file from animations directory
const rawAnimations = import.meta.glob("./**/*.tsx", {
  eager: true,
}) as Record<string, AnimationModule>;

// 2. Get raw dictionary
const unfilteredAnimations = createObjectsFromMassImport(rawAnimations);

// 3. Filter the garbage (Sub-modules and utilities)
const IS_EVENT_NAME = /^[A-Z][A-Z0-9_]+$/; // Regex for conventionally named animation functions

const ANIMATIONS = Object.fromEntries(
  Object.entries(unfilteredAnimations).filter(([key]) =>
    IS_EVENT_NAME.test(key),
  ),
) as Partial<
  Record<keyof EventType, React.ComponentType<Record<string, unknown>>>
>;

export default ANIMATIONS;
