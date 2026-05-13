import { createObjectsFromMassImport } from "../lib/massImport";

export type AnimationComponent = {
  Component: React.ComponentType<any>;
  props: any;
};

const animations = import.meta.glob("./*.tsx", {
  eager: true,
}) as Record<string, { default: React.ComponentType<any> }>;

const ANIMATIONS = createObjectsFromMassImport(animations);

export default ANIMATIONS;
