import type {
  PlayingCardMeta,
  DeckType,
  CharacterCardMeta,
  RoleCardMeta,
} from "../types";
import { Deck } from "./deck";

export class Game {
  private _deck: Deck;
  private _charDeck: Deck;
  private _roleDeck: Deck;

  //NOTE: As with the *Deck* class, the constructor here is also private to enable the dynamic import
  //of JSON files.
  //To create the instance of the deck use *await Game.initialize()* instead.
  private constructor(deck: Deck, charDeck: Deck, roleDeck: Deck) {
    this._deck = deck;
    this._charDeck = charDeck;
    this._roleDeck = roleDeck;
  }

  public static async initialize(playerCount: number): Promise<Game> {
    //Check for correct player count
    if (playerCount < 4 || playerCount > 7 || !playerCount) {
      throw new Error("Incorrect number of players");
    }

    const deck = await this.createDeck("main");
    const charDeck = await this.createDeck("char");
    const roleDeck = await this.createDeck("role", playerCount);

    return new Game(deck, charDeck, roleDeck);
  }

  private static async createDeck(deckType: DeckType, playerCount?: number) {
    const newDeck = await Deck.create(deckType);

    if (playerCount) {
      //Clear generated .deck property and fill it again to account player count.
      newDeck.deck = this.fillRoleDeck(playerCount);
    }

    newDeck.shuffle();
    return newDeck;
  }

  private static fillRoleDeck(playerCount: number) {
    switch (playerCount) {
      case 4:
        return ["sheriff", "renegade", "outlaw", "outlaw"];
      case 5:
        return ["sheriff", "renegade", "outlaw", "outlaw", "deputy"];
      case 6:
        return ["sheriff", "renegade", "outlaw", "outlaw", "outlaw", "deputy"];
      case 7:
        return [
          "sheriff",
          "renegade",
          "outlaw",
          "outlaw",
          "outlaw",
          "deputy",
          "deputy",
        ];
      default:
        return [];
    }
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

  public get roleDeck(): string[] {
    return this._roleDeck.deck;
  }

  public get roleDeckMeta() {
    return this._roleDeck.meta as Record<string, RoleCardMeta>;
  }
}
