import { createObjectsFromMassImport } from "../utils/massImport";

const cardbacks = import.meta.glob("../assets/cardbacks/*.{png, svg, webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const borders = import.meta.glob("../assets/borders/*.{png, svg, webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const characters = import.meta.glob("../assets/characters/*.{png, svg, webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const regular = import.meta.glob("../assets/regular/*.{png, svg, webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const roles = import.meta.glob("../assets/roles/*.{png, svg, webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const symbols = import.meta.glob("../assets/symbols/*.{png, svg, webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const weapons = import.meta.glob("../assets/weapons/*.{png, svg, webp}", {
  eager: true,
}) as Record<string, { default: string }>;

const CARDBACKS = createObjectsFromMassImport(cardbacks);
const BORDERS = createObjectsFromMassImport(borders);
const CHARACTERS = createObjectsFromMassImport(characters);
const REGULAR = createObjectsFromMassImport(regular);
const ROLES = createObjectsFromMassImport(roles);
const SYMBOLS = createObjectsFromMassImport(symbols);
const WEAPONS = createObjectsFromMassImport(weapons);

export const IMAGES = {
  CARDBACKS,
  BORDERS,
  CHARACTERS,
  REGULAR,
  ROLES,
  SYMBOLS,
  WEAPONS,
} as const;
