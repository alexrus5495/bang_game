export const deck = [];
import { CARDPACKS } from "../config/cardpacks";
import type { PlayingCardMeta, DeckType, CharacterCardMeta } from "../types";

export class Deck {
  public deck: string[];
  public meta: Record<string, PlayingCardMeta | CharacterCardMeta>;

  //NOTE: The constructor is private because async function is needed to dynamically import all needed json files.
  //To create the deck *await Deck.create()* is used instead.
  //The logic behind creating the deck:
  //1. For every item in CARDPACKS config file the corresponding *meta file is dynamically imported
  //2. The content inside json file is then added to the *meta* and *deck* properties.
  //3. The result is the object with *meta* property that contains meta data of every card from all enabled packs
  //and *deck* property that contains just ids of every card from enabled packs.
  private constructor() {
    this.deck = [];
    this.meta = {} as Record<string, PlayingCardMeta | CharacterCardMeta>;
  }

  /** Returns an instanse of Deck class.
   * @param deckType "char" to create Deck with characters cards or "main" to create regular deck.
   **/
  public static async create(deckType: DeckType): Promise<Deck> {
    const deck = new Deck();
    await deck.loadPacks(deckType);
    return deck;
  }

  private async loadPacks(deckType: DeckType) {
    for (const pack of CARDPACKS) {
      await this.addPack(pack, deckType);
    }
  }

  private async addPack(packName: string, deckType: DeckType) {
    const packData = await this.importPack(packName);

    if (!packData) {
      console.warn(`Pack "${packName}" not found or invalid!`);
      return;
    }

    if (deckType === "main") {
      this.addCards(packData.REGULAR);
      this.addCards(packData.WEAPONS);
    } else this.addCards(packData.CHARACTERS);
  }

  private async importPack(packName: string) {
    try {
      const pack = await import(`../config/cards.${packName}.meta.ts`);
      return pack[`CARDS_${packName.toUpperCase()}`];
    } catch (e) {
      throw new Error(
        e instanceof Error
          ? e.message
          : typeof e === "string"
            ? e
            : "Unknown error loading pack",
      );
    }
  }

  private addCards(cards: PlayingCardMeta | CharacterCardMeta | undefined) {
    if (!cards) return;

    for (const [cardId, cardData] of Object.entries(cards)) {
      if (!this.meta[cardId]) {
        this.meta[cardId] = cardData;
        this.deck.push(cardId);
      } else {
        console.warn(`Card "${cardId}" already exists in deck!`);
      }
    }
  }

  public shuffle() {
    const result = [...this.deck];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    this.deck = result;
  }
}
