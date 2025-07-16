import type { Game } from "../../../engine/core/game";
import type { Player } from "../../../engine/player/player";

export function VOLCANIC(game: Game, player: Player, cardId: string) {
  if (!cardId.startsWith("volcanic_")) throw new Error("Got unexpected cardId");
  console.log(`${player.nickname} plays [VOLCANIC]`);

  const playersWeapon = game.SC.player._findWeapon(player);

  if (playersWeapon) {
    game.SC.player.removeEquipmentCard(playersWeapon, player);
  }

  game.SC.player.addCardToEquipment(player, cardId);
}
