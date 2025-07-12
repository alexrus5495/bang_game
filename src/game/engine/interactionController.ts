import type { GameStateController } from "./state/gameStateController";
import type { Player } from "./player/player";

export class InteractionController {
  SC: GameStateController;
  constructor(stateController: GameStateController) {
    this.SC = stateController;
  }
  onPlayerPickChar(player: Player, option: 0 | 1) {
    this.SC.playerCtrl.setPlayerChar(player, option);
  }
}
