import type { Game } from "../../../engine/core/game";
import type { Player } from "../../../engine/player/player";

export function SALOON(game: Game, player: Player, cardId: string) {
  console.log(`${player.nickname} plays [SALOON]`);

  const activePlayers = game.SC.player.getActivePlayers();

  for (const player of activePlayers) {
    const healingAmount = game.validator.getHealingAmount(player);
    game.SC.player.heal(player, healingAmount);
    console.log(`${player.nickname} restores ${healingAmount} HP`);
  }
}
