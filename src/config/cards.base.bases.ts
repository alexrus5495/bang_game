import type { Card } from "../types";

export const bangBase: Omit<Card, "value"> = {
  id: "bang",
  image: "bang_1",
  border: "yellow",
  description: [
    [
      { type: "symbol", key: "bang" },
      { type: "symbol", key: "any_in_range" },
    ],
  ],
  tooltipIcon: false,
  pack: "base",
};

export const barrelBase: Omit<Card, "value"> = {
  id: "barrel",
  image: "barrel",
  border: "blue",
  description: [
    [
      { type: "symbol", key: "range_hearts" },
      { type: "symbol", key: "equals" },
      { type: "symbol", key: "miss" },
    ],
  ],
  tooltipIcon: false,
  pack: "base",
};

export const beerBase: Omit<Card, "value"> = {
  id: "beer",
  image: "beer",
  border: "yellow",
  description: [[{ type: "symbol", key: "beer" }]],
  tooltipIcon: false,
  pack: "base",
};

export const cat_balouBase: Omit<Card, "value"> = {
  id: "cat_balou",
  image: "cat_balou",
  border: "yellow",
  description: [
    [
      { type: "symbol", key: "discard" },
      { type: "symbol", key: "any" },
    ],
  ],
  tooltipIcon: false,
  pack: "base",
};

export const duelBase: Omit<Card, "value"> = {
  id: "duel",
  image: "duel",
  border: "yellow",
  description: [[{ type: "text" }]],
  tooltipIcon: true,
  pack: "base",
};

export const dynamiteBase: Omit<Card, "value"> = {
  id: "dynamite",
  image: "dynamite",
  border: "blue",
  description: [
    [
      { type: "symbol", key: "range_spades_2-9" },
      { type: "symbol", key: "equals" },
      { type: "text" },
    ],
  ],
  tooltipIcon: true,
  pack: "base",
};

export const gatlingBase: Omit<Card, "value"> = {
  id: "gatling",
  image: "gatling",
  border: "yellow",
  description: [
    [
      { type: "symbol", key: "bang" },
      { type: "symbol", key: "all" },
    ],
  ],
  tooltipIcon: false,
  pack: "base",
};

export const general_storeBase: Omit<Card, "value"> = {
  id: "general_store",
  image: "general_store",
  border: "yellow",
  description: [[{ type: "text" }]],
  tooltipIcon: true,
  pack: "base",
};

export const indiansBase: Omit<Card, "value"> = {
  id: "indians",
  image: "indians",
  border: "yellow",
  description: [[{ type: "text" }]],
  tooltipIcon: true,
  pack: "base",
};

export const jailBase: Omit<Card, "value"> = {
  id: "jail",
  image: "jail",
  border: "blue",
  description: [
    [
      { type: "symbol", key: "range_hearts" },
      { type: "symbol", key: "equals" },
      { type: "text" },
    ],
  ],
  tooltipIcon: true,
  pack: "base",
};

export const missedBase: Omit<Card, "value"> = {
  id: "missed",
  image: "missed",
  border: "yellow",
  description: [[{ type: "symbol", key: "miss" }]],
  tooltipIcon: false,
  pack: "base",
};

export const mustangBase: Omit<Card, "value"> = {
  id: "mustang",
  image: "mustang",
  border: "blue",
  description: [[{ type: "text" }]],
  tooltipIcon: false,
  pack: "base",
};

export const panicBase: Omit<Card, "value"> = {
  id: "panic",
  image: "panic",
  border: "yellow",
  description: [
    [
      { type: "symbol", key: "draw" },
      { type: "symbol", key: "one" },
    ],
  ],
  tooltipIcon: false,
  pack: "base",
};

export const saloonBase: Omit<Card, "value"> = {
  id: "saloon",
  image: "saloon",
  border: "yellow",
  description: [
    [
      { type: "symbol", key: "beer" },
      { type: "symbol", key: "all" },
    ],
    [{ type: "symbol", key: "beer" }],
  ],
  tooltipIcon: false,
  pack: "base",
};

export const scopeBase: Omit<Card, "value"> = {
  id: "scope",
  image: "saloon",
  border: "blue",
  description: [[{ type: "text" }]],
  tooltipIcon: false,
  pack: "base",
};

export const stagecoachBase: Omit<Card, "value"> = {
  id: "stagecoach",
  image: "stagecoach",
  border: "yellow",
  description: [
    [
      { type: "symbol", key: "pick" },
      { type: "symbol", key: "pick" },
    ],
  ],
  tooltipIcon: false,
  pack: "base",
};

export const wells_cargoBase: Omit<Card, "value"> = {
  id: "wells_fargo",
  image: "wells_fargo",
  border: "yellow",
  description: [
    [
      { type: "symbol", key: "draw" },
      { type: "symbol", key: "draw" },
      { type: "symbol", key: "draw" },
    ],
  ],
  tooltipIcon: false,
  pack: "base",
};

export const carabineBase: Omit<Card, "value"> = {
  id: "carabine",
  image: "carabine",
  border: "blue",
  description: [[{ type: "symbol", key: "four" }]],
  tooltipIcon: false,
  pack: "base",
};

export const remingtonBase: Omit<Card, "value"> = {
  id: "remington",
  image: "remington",
  border: "blue",
  description: [[{ type: "symbol", key: "three" }]],
  tooltipIcon: false,
  pack: "base",
};

export const winchesterBase: Omit<Card, "value"> = {
  id: "winchester",
  image: "winchester",
  border: "blue",
  description: [[{ type: "symbol", key: "five" }]],
  tooltipIcon: false,
  pack: "base",
};

export const schofieldBase: Omit<Card, "value"> = {
  id: "schofield",
  image: "schofield",
  border: "blue",
  description: [[{ type: "symbol", key: "two" }]],
  tooltipIcon: false,
  pack: "base",
};

export const volcanicBase: Omit<Card, "value"> = {
  id: "volcanic",
  image: "volcanic",
  border: "blue",
  description: [[{ type: "symbol", key: "volcanic" }]],
  tooltipIcon: true,
  pack: "base",
};
