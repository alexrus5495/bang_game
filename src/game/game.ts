import type { PlayingCardMeta, DeckType, CharacterCardMeta } from "../types";
import { Deck } from "./deck";

export class Game {
  private _deck: Deck;
  private _charDeck: Deck;

  //NOTE: As with the *Deck* class, the constructor here is also private to enable the dynamic import
  //of JSON files.
  //To create the instance of the deck use *await Game.initialize()* instead.
  private constructor(deck: Deck, charDeck: Deck) {
    this._deck = deck;
    this._charDeck = charDeck;
  }

  public static async initialize(): Promise<Game> {
    const deck = await this.createDeck("main");
    const charDeck = await this.createDeck("char");

    return new Game(deck, charDeck);
  }

  private static async createDeck(deckType: DeckType) {
    const newDeck = await Deck.create(deckType);
    newDeck.shuffle();
    return newDeck;
  }

  public get deck(): string[] {
    return this._deck.deck;
  }

  public get deckMeta() {
    return this._deck.meta as Record<string, PlayingCardMeta>;
  }

  public get charDeck(): string[] {
    return this._charDeck.deck;
  }

  public get charDeckMeta() {
    return this._charDeck.meta as Record<string, CharacterCardMeta>;
  }
}
