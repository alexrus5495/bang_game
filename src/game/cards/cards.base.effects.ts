import type { CardEffectRegistry } from "../cardEffectsRegistry";
import type { Game } from "../game";
import type { Player } from "../player";

export default {
  async bang(game: Game, player: Player, targetPlayer: Player) {
    player.stats.bangCardsPlayed++;
    targetPlayer.flags.isUnderSight = true;

    game.setRuntimePromise("bang");
    const willTakeDamage = await game.getRuntimePromise("bang");

    if (willTakeDamage) {
      targetPlayer.takeDamage(1);
    }

    if (targetPlayer.flags.isEliminated) game.checkWinConditions();
  },
} satisfies CardEffectRegistry;
