import type { Card, CharacterCard } from "../types";
import {
  bangBase,
  barrelBase,
  beerBase,
  carabineBase,
  cat_balouBase,
  duelBase,
  dynamiteBase,
  gatlingBase,
  general_storeBase,
  indiansBase,
  jailBase,
  missedBase,
  mustangBase,
  panicBase,
  remingtonBase,
  saloonBase,
  schofieldBase,
  scopeBase,
  stagecoachBase,
  volcanicBase,
  wells_cargoBase,
  winchesterBase,
} from "./cards.base.bases";

const REGULAR = {
  bang_1: {
    ...bangBase,
    value: { value: "7", suit: "clubs" },
  },
  bang_2: {
    ...bangBase,
    image: "bang_2",
    value: { value: "9", suit: "diamonds" },
  },
  bang_3: {
    ...bangBase,
    image: "bang_2",
    value: { value: "5", suit: "clubs" },
  },
  bang_4: {
    ...bangBase,
    value: { value: "Q", suit: "hearts" },
  },
  bang_5: {
    ...bangBase,
    image: "bang_2",
    value: { value: "Q", suit: "diamonds" },
  },
  bang_6: {
    ...bangBase,
    image: "bang_2",
    value: { value: "6", suit: "diamonds" },
  },
  bang_7: {
    ...bangBase,
    value: { value: "7", suit: "diamonds" },
  },
  bang_8: {
    ...bangBase,
    image: "bang_2",
    value: { value: "9", suit: "clubs" },
  },
  bang_9: {
    ...bangBase,
    image: "bang_2",
    value: { value: "8", suit: "diamonds" },
  },
  bang_10: {
    ...bangBase,
    value: { value: "8", suit: "clubs" },
  },
  bang_11: {
    ...bangBase,
    image: "bang_2",
    value: { value: "10", suit: "diamonds" },
  },
  bang_12: {
    ...bangBase,
    image: "bang_2",
    value: { value: "5", suit: "diamonds" },
  },
  bang_13: {
    ...bangBase,
    value: { value: "K", suit: "hearts" },
  },
  bang_14: {
    ...bangBase,
    image: "bang_2",
    value: { value: "K", suit: "diamonds" },
  },
  bang_15: {
    ...bangBase,
    image: "bang_2",
    value: { value: "6", suit: "clubs" },
  },
  bang_16: {
    ...bangBase,
    value: { value: "3", suit: "diamonds" },
  },
  bang_17: {
    ...bangBase,
    image: "bang_2",
    value: { value: "3", suit: "clubs" },
  },
  bang_18: {
    ...bangBase,
    image: "bang_2",
    value: { value: "J", suit: "diamonds" },
  },
  bang_19: {
    ...bangBase,
    value: { value: "2", suit: "clubs" },
  },
  bang_20: {
    ...bangBase,
    image: "bang_2",
    value: { value: "A", suit: "diamonds" },
  },
  bang_21: {
    ...bangBase,
    image: "bang_2",
    value: { value: "2", suit: "diamonds" },
  },
  bang_22: {
    ...bangBase,
    value: { value: "A", suit: "hearts" },
  },
  bang_23: {
    ...bangBase,
    image: "bang_2",
    value: { value: "A", suit: "spades" },
  },
  bang_24: {
    ...bangBase,
    value: { value: "4", suit: "clubs" },
  },
  bang_25: {
    ...bangBase,
    value: { value: "4", suit: "diamonds" },
  },
  barrel_1: {
    ...barrelBase,
    value: { value: "Q", suit: "spades" },
  },
  barrel_2: {
    ...barrelBase,
    value: { value: "K", suit: "spades" },
  },
  beer_1: {
    ...beerBase,
    value: { value: "J", suit: "hearts" },
  },
  beer_2: {
    ...beerBase,
    value: { value: "10", suit: "hearts" },
  },
  beer_3: {
    ...beerBase,
    value: { value: "8", suit: "hearts" },
  },
  beer_4: {
    ...beerBase,
    value: { value: "9", suit: "hearts" },
  },
  beer_5: {
    ...beerBase,
    value: { value: "6", suit: "hearts" },
  },
  beer_6: {
    ...beerBase,
    value: { value: "7", suit: "hearts" },
  },
  cat_balou_1: {
    ...cat_balouBase,
    value: { value: "K", suit: "hearts" },
  },
  cat_baloue_2: {
    ...cat_balouBase,
    value: { value: "J", suit: "diamonds" },
  },
  cat_balou_3: {
    ...cat_balouBase,
    value: { value: "9", suit: "diamonds" },
  },
  cat_baloue_4: {
    ...cat_balouBase,
    value: { value: "10", suit: "diamonds" },
  },
  duel_1: {
    ...duelBase,
    value: { value: "8", suit: "clubs" },
  },
  duel_2: {
    ...duelBase,
    value: { value: "J", suit: "spades" },
  },
  duel_3: {
    ...duelBase,
    value: { value: "Q", suit: "diamonds" },
  },
  dynamite_1: {
    ...dynamiteBase,
    value: { value: "2", suit: "hearts" },
  },
  gatling_1: {
    ...gatlingBase,
    value: { value: "10", suit: "hearts" },
  },
  general_store_1: {
    ...general_storeBase,
    value: { value: "Q", suit: "spades" },
  },
  general_store_2: {
    ...general_storeBase,
    value: { value: "9", suit: "clubs" },
  },
  indians_1: {
    ...indiansBase,
    value: { value: "A", suit: "diamonds" },
  },
  indians_2: {
    ...indiansBase,
    value: { value: "K", suit: "diamonds" },
  },
  jail_1: {
    ...jailBase,
    value: { value: "10", suit: "spades" },
  },
  jail_2: {
    ...jailBase,
    value: { value: "J", suit: "spades" },
  },
  jail_3: {
    ...jailBase,
    value: { value: "4", suit: "hearts" },
  },
  missed_1: {
    ...missedBase,
    value: { value: "3", suit: "clubs" },
  },
  missed_2: {
    ...missedBase,
    value: { value: "A", suit: "clubs" },
  },
  missed_3: {
    ...missedBase,
    value: { value: "10", suit: "clubs" },
  },
  missed_4: {
    ...missedBase,
    value: { value: "2", suit: "spades" },
  },
  missed_5: {
    ...missedBase,
    value: { value: "4", suit: "spades" },
  },
  missed_6: {
    ...missedBase,
    value: { value: "8", suit: "spades" },
  },
  missed_7: {
    ...missedBase,
    value: { value: "3", suit: "spades" },
  },
  missed_8: {
    ...missedBase,
    value: { value: "5", suit: "spades" },
  },
  missed_9: {
    ...missedBase,
    value: { value: "7", suit: "spades" },
  },
  missed_10: {
    ...missedBase,
    value: { value: "6", suit: "spades" },
  },
  missed_11: {
    ...missedBase,
    value: { value: "Q", suit: "clubs" },
  },
  missed_12: {
    ...missedBase,
    value: { value: "K", suit: "clubs" },
  },
  mustang_1: {
    ...mustangBase,
    value: { value: "9", suit: "hearts" },
  },
  mustang_2: {
    ...mustangBase,
    value: { value: "8", suit: "hearts" },
  },
  panic_1: {
    ...panicBase,
    value: { value: "A", suit: "hearts" },
  },
  panic_2: {
    ...panicBase,
    value: { value: "Q", suit: "hearts" },
  },
  panic_3: {
    ...panicBase,
    value: { value: "8", suit: "diamonds" },
  },
  panic_4: {
    ...panicBase,
    value: { value: "J", suit: "hearts" },
  },
  scope_1: {
    ...scopeBase,
    value: { value: "A", suit: "spades" },
  },
  saloon_1: {
    ...saloonBase,
    value: { value: "5", suit: "hearts" },
  },
  stagecoach_1: {
    ...stagecoachBase,
    value: { value: "9", suit: "spades" },
  },
  stagecoach_2: {
    ...stagecoachBase,
    value: { value: "9", suit: "spades" },
  },
  wells_fargo_1: {
    ...wells_cargoBase,
    value: { value: "3", suit: "hearts" },
  },
} satisfies Record<string, Card>;

const WEAPONS = {
  carabine_1: {
    ...carabineBase,
    value: { value: "A", suit: "clubs" },
  },
  winchester_1: {
    ...winchesterBase,
    value: { value: "8", suit: "spades" },
  },
  remington_1: {
    ...remingtonBase,
    value: { value: "K", suit: "clubs" },
  },
  schofiled_1: {
    ...schofieldBase,
    value: { value: "J", suit: "clubs" },
  },
  schofiled_2: {
    ...schofieldBase,
    value: { value: "K", suit: "spades" },
  },
  schofiled_3: {
    ...schofieldBase,
    value: { value: "Q", suit: "clubs" },
  },
  volcanic_1: {
    ...volcanicBase,
    value: { value: "10", suit: "clubs" },
  },
  volcanic_2: {
    ...volcanicBase,
    value: { value: "10", suit: "spades" },
  },
} satisfies Record<string, Card>;

export const CHARACTERS = {
  bart_cassidy: {
    id: "bart_cassidy",
    bullets: 4,
    image: "bart_cassidy",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  black_jack: {
    id: "black_jack",
    bullets: 4,
    image: "black_jack",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  calamity_janet: {
    id: "calamity_janet",
    bullets: 4,
    image: "calamity_janet",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  el_gringo: {
    id: "el_gringo",
    bullets: 3,
    image: "el_gringo",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  jesse_jones: {
    id: "jesse_jones",
    bullets: 4,
    image: "jesse_jones",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  jourdonnais: {
    id: "jourdonnais",
    bullets: 4,
    image: "jourdonnais",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  kit_carlson: {
    id: "kit_carlson",
    bullets: 4,
    image: "kit_carlson",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  lucky_duke: {
    id: "lucky_duke",
    bullets: 4,
    image: "lucky_duke",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  paul_regret: {
    id: "paul_regret",
    bullets: 3,
    image: "paul_regret",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  pedro_ramirez: {
    id: "pedro_ramirez",
    bullets: 4,
    image: "pedro_ramirez",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  rose_doolan: {
    id: "rose_doolan",
    bullets: 4,
    image: "rose_doolan",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  sid_ketchum: {
    id: "sid_ketchum",
    bullets: 4,
    image: "sid_ketchum",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  slab_the_killer: {
    id: "slab_the_killer",
    bullets: 4,
    image: "slab_the_killer",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  suzy_lafayette: {
    id: "suzy_lafayette",
    bullets: 4,
    image: "suzy_lafayette",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  vulture_sam: {
    id: "vulture_sam",
    bullets: 4,
    image: "vulture_sam",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
  willy_the_kid: {
    id: "willy_the_kid",
    bullets: 4,
    image: "willy_the_kid",
    border: "green",
    description: [[{ type: "text" }]],
    pack: "base",
  },
} satisfies Record<string, CharacterCard>;

export const CARDS_BASE = {
  REGULAR,
  WEAPONS,
  CHARACTERS,
};
