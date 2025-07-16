import type { Game } from "../../../engine/core/game";
import type { Player } from "../../../engine/player/player";

export function REMINGTON(game: Game, player: Player, cardId: string) {
  if (!cardId.startsWith("remington_"))
    throw new Error("Got unexpected cardId");
  console.log(`${player.nickname} plays [REMINGTON]`);

  const playersWeapon = game.SC.player._findWeapon(player);

  if (playersWeapon) {
    game.SC.player.removeEquipmentCard(playersWeapon, player);
  }

  game.SC.player.addCardToEquipment(player, cardId);
}
