import type { Game } from "../../../engine/core/game";
import type { Player } from "../../../engine/player/player";

export function STAGECOACH(game: Game, player: Player, cardId: string) {
  game.SC.cards.drawToHand(player, 2);
}
