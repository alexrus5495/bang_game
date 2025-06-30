import type { PlayingCardMeta } from "../types";
import { Deck } from "./deck";

export class Game {
  private _deck: Deck;

  //NOTE: As with the *Deck* class, the constructor here is also private to enable the dynamic import
  //of JSON files.
  //To create the instance of the deck use *await Game.initialize()* instead.
  private constructor(deck: Deck) {
    this._deck = deck;
  }

  public static async initialize(): Promise<Game> {
    const deck = await this.createDeck();
    return new Game(deck);
  }

  private static async createDeck() {
    const newDeck = await Deck.create();
    newDeck.shuffle();
    return newDeck;
  }

  public get deck(): string[] {
    return this._deck.deck;
  }

  public get deckMeta(): Record<string, PlayingCardMeta> {
    return this._deck.meta;
  }
}
