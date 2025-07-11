import type { GameStateController } from "./gameStateController";
import type { Player } from "./player";

export class InteractionController {
  SC: GameStateController;
  constructor(stateController: GameStateController) {
    this.SC = stateController;
  }
  onPlayerPickChar(player: Player, option: 0 | 1) {
    this.SC.setPlayerChar(player, option);
  }
}
