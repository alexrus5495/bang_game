import { CardController } from "../cards/cardController";
import type { GameState } from "./gameState";
import type { GameStateValidator } from "../validation/gameStateValidator";
import type { Player } from "../player/player";
import { PlayerController } from "../player/playerController";
import type { Runtime } from "../runtime/runtime";
import { promiseKeys, timerKeys } from "../runtime/runtimeKeys";

export class GameStateController {
  private runtime: Runtime;
  private playerCtrl: PlayerController;
  private cardCtrl: CardController;

  constructor(
    state: GameState,
    validator: GameStateValidator,
    runtime: Runtime,
  ) {
    this.runtime = runtime;
    this.playerCtrl = new PlayerController(state, validator, runtime);
    this.cardCtrl = new CardController(state, validator, runtime);
  }

  public readonly player = {
    assignToAnEmptySlot: (nickname: string) =>
      this.playerCtrl.assignToAnEmptySlot(nickname),
    getCurrentPlayer: () => this.playerCtrl.currentPlayer,
    getNewCurrentPlayer: (prevPlayer: number) =>
      this.playerCtrl.getNewCurrentPlayer(prevPlayer),
    getPlayer: (index: number) => this.playerCtrl.getPlayer(index),
    resetBangCounter: (player: Player) =>
      this.playerCtrl.resetBangCounter(player),
    setCurrentPlayer: (index: number) =>
      this.playerCtrl.setCurrentPlayer(index),
    setChar: (player: Player, option: 0 | 1) =>
      this.playerCtrl.setChar(player, option),
  };

  public readonly deal = {
    roleCards: () => this.dealRoleCards(),
    charCards: () => this.dealCharCards(),
    playingCards: () => this.dealPlayingCards(),
  };

  public readonly cards = {
    drawToHand: (player: Player, cardsToDraw: number) =>
      this.drawToHand(player, cardsToDraw),
    discartFromHand: (cardIndex: number, player: Player) =>
      this.discartFromHand(cardIndex, player),
  };

  private dealRoleCards() {
    this.playerCtrl.doForEachPlayer((player, index) => {
      const roleCardId = this.cardCtrl.drawCards(1, "roleDeck")[0];

      if (!roleCardId) {
        throw new Error("Error when getting role card from the deck.");
      }

      this.playerCtrl.assignRole(player, roleCardId);
      this.playerCtrl.savePlayerByRole(player, roleCardId);

      if (roleCardId === "sheriff") this.playerCtrl.setCurrentPlayer(index);
    });
  }

  private dealCharCards() {
    this.runtime.setRuntimePromise(promiseKeys.charSelection);

    this.playerCtrl.doForEachPlayer((player, index) => {
      const options = this.cardCtrl.createCharOptionsSet();
      this.playerCtrl.setCharOptions(player, options);

      //Set timer to auto pick character after 1 minute.
      this.runtime.setRuntimeTimer(
        timerKeys.charSelection.replace("{index}", `${index}`),
        () => {
          this.playerCtrl.setChar(player, 0);
        },
        60000,
      );
    });
  }

  private dealPlayingCards() {
    this.playerCtrl.doForEachPlayer((player) => {
      const cardsToDeal = this.playerCtrl.getMaxHealth(player);
      this.drawToHand(player, cardsToDeal);
    });
  }

  private drawToHand(player: Player, cardsToDraw: number) {
    const cards = this.cardCtrl.drawCards(cardsToDraw);
    this.playerCtrl.addCardsToTheHand(player, cards);
  }

  private discartFromHand(cardIndex: number, player: Player) {
    const discardedCard = this.playerCtrl.getCardFromHand(cardIndex, player);
    this.cardCtrl.discardCard(discardedCard);
  }
}
