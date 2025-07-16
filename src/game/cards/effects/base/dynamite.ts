import type { Game } from "../../../engine/core/game";
import type { Player } from "../../../engine/player/player";

export function DYNAMITE(game: Game, player: Player, cardId: string) {
  if (!cardId.startsWith("dynamite_")) throw new Error("Got unexpected cardId");
  console.log(`${player.nickname} plays [DYNAMITE]`);

  game.SC.player.addCardToEquipment(player, cardId);
}
