import { CardController } from "../cards/cardController";
import type { GameState } from "./gameState";
import type { GameStateValidator } from "../validation/gameStateValidator";
import type { Player } from "../player/player";
import { PlayerController } from "../player/playerController";
import type { Runtime } from "../runtime/runtime";

export class GameStateController {
  state: GameState;
  validator: GameStateValidator;
  runtime: Runtime;
  playerCtrl: PlayerController;
  cardCtrl: CardController;

  constructor(
    state: GameState,
    validator: GameStateValidator,
    runtime: Runtime,
  ) {
    this.state = state;
    this.validator = validator;
    this.runtime = runtime;
    this.playerCtrl = new PlayerController(state, validator, runtime);
    this.cardCtrl = new CardController(state, validator, runtime);
  }

  dealRoleCards() {
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

  dealCharCards() {
    this.runtime.setRuntimePromise("charSelection");

    this.playerCtrl.doForEachPlayer((player, index) => {
      const options = this.cardCtrl.createCharOptionsSet();
      this.playerCtrl.setCharOptions(player, options);

      //Set timer to auto pick character after 1 minute.
      this.runtime.setRuntimeTimer(
        `player${index}_charSelection`,
        () => {
          this.playerCtrl.setPlayerChar(player, 0);
        },
        60000,
      );
    });
  }

  dealPlayingCards() {
    this.playerCtrl.doForEachPlayer((player) => {
      const cardsToDeal = this.playerCtrl.getMaxHealth(player);
      this.drawToHand(player, cardsToDeal);
    });
  }

  drawToHand(player: Player, cardToDraw: number) {
    const cards = this.cardCtrl.drawCards(cardToDraw);
    this.playerCtrl.addCardsToTheHand(player, cards);
  }
}
