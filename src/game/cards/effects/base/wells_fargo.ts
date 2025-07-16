import type { Game } from "../../../engine/core/game";
import type { Player } from "../../../engine/player/player";

export function WELLS_FARGO(game: Game, player: Player, cardId: string) {
  game.SC.cards.drawToHand(player, 3);
}
