import { createObjectsFromMassImport } from "../../../lib/images/massImport";

const cardbacks = import.meta.glob("./cardbacks/*.{png,svg,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const borders = import.meta.glob("./borders/*.{png,svg,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const characters = import.meta.glob("./characters/*.{png,svg,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const regular = import.meta.glob("./regular/*.{png,svg,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const roles = import.meta.glob("./roles/*.{png,svg,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const symbols = import.meta.glob("./symbols/*.{png,svg,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const weapons = import.meta.glob("./weapons/*.{png,svg,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

export const IMAGES_BASE = {
  CARDBACKS: createObjectsFromMassImport(cardbacks),
  BORDERS: createObjectsFromMassImport(borders),
  CHARACTERS: createObjectsFromMassImport(characters),
  REGULAR: createObjectsFromMassImport(regular),
  ROLES: createObjectsFromMassImport(roles),
  SYMBOLS: createObjectsFromMassImport(symbols),
  WEAPONS: createObjectsFromMassImport(weapons),
} as const;

export default IMAGES_BASE;
