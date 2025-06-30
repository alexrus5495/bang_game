import type { PlayingCardMeta } from "../types";

export const bangBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "bang",
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

export const barrelBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "barrel",
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

export const beerBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "beer",
  image: "beer",
  border: "yellow",
  description: [[{ type: "symbol", key: "beer" }]],
  tooltipIcon: false,
  pack: "base",
};

export const cat_balouBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> =
  {
    cardTypeId: "cat_balou",
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

export const duelBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "duel",
  image: "duel",
  border: "yellow",
  description: [[{ type: "text", key: "duel" }]],
  tooltipIcon: true,
  pack: "base",
};

export const dynamiteBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "dynamite",
  image: "dynamite",
  border: "blue",
  description: [
    [
      { type: "symbol", key: "range_spades_2-9" },
      { type: "symbol", key: "equals" },
      { type: "text", key: "dynamite" },
    ],
  ],
  tooltipIcon: true,
  pack: "base",
};

export const gatlingBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "gatling",
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

export const general_storeBase: Omit<
  PlayingCardMeta,
  "value" | "cardInstanceId"
> = {
  cardTypeId: "general_store",
  image: "general_store",
  border: "yellow",
  description: [[{ type: "text", key: "general_store" }]],
  tooltipIcon: true,
  pack: "base",
};

export const indiansBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "indians",
  image: "indians",
  border: "yellow",
  description: [[{ type: "text", key: "indians" }]],
  tooltipIcon: true,
  pack: "base",
};

export const jailBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "jail",
  image: "jail",
  border: "blue",
  description: [
    [
      { type: "symbol", key: "range_hearts" },
      { type: "symbol", key: "equals" },
      { type: "text", key: "jail" },
    ],
  ],
  tooltipIcon: true,
  pack: "base",
};

export const missedBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "missed",
  image: "missed",
  border: "yellow",
  description: [[{ type: "symbol", key: "miss" }]],
  tooltipIcon: false,
  pack: "base",
};

export const mustangBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "mustang",
  image: "mustang",
  border: "blue",
  description: [[{ type: "text", key: "mustang" }]],
  tooltipIcon: false,
  pack: "base",
};

export const panicBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "panic",
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

export const saloonBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "saloon",
  image: "saloon",
  border: "yellow",
  description: [
    [
      { type: "symbol", key: "beer" },
      { type: "symbol", key: "all" },
    ],
    [{ type: "divider", key: "divider" }],
    [{ type: "symbol", key: "beer" }],
  ],
  tooltipIcon: false,
  pack: "base",
};

export const scopeBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "scope",
  image: "scope",
  border: "blue",
  description: [[{ type: "text", key: "scope" }]],
  tooltipIcon: false,
  pack: "base",
};

export const stagecoachBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> =
  {
    cardTypeId: "stagecoach",
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

export const wells_cargoBase: Omit<
  PlayingCardMeta,
  "value" | "cardInstanceId"
> = {
  cardTypeId: "wells_fargo",
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

export const carabineBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "carabine",
  image: "carabine",
  border: "blue",
  description: [[{ type: "symbol", key: "four" }]],
  tooltipIcon: false,
  pack: "base",
};

export const remingtonBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> =
  {
    cardTypeId: "remington",
    image: "remington",
    border: "blue",
    description: [[{ type: "symbol", key: "three" }]],
    tooltipIcon: false,
    pack: "base",
  };

export const winchesterBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> =
  {
    cardTypeId: "winchester",
    image: "winchester",
    border: "blue",
    description: [[{ type: "symbol", key: "five" }]],
    tooltipIcon: false,
    pack: "base",
  };

export const schofieldBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> =
  {
    cardTypeId: "schofield",
    image: "schofield",
    border: "blue",
    description: [[{ type: "symbol", key: "two" }]],
    tooltipIcon: false,
    pack: "base",
  };

export const volcanicBase: Omit<PlayingCardMeta, "value" | "cardInstanceId"> = {
  cardTypeId: "volcanic",
  image: "volcanic",
  border: "blue",
  description: [[{ type: "symbol", key: "volcanic" }]],
  tooltipIcon: true,
  pack: "base",
};
