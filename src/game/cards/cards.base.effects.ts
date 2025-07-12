import type { CardEffectRegistry } from "../engine/cards/cardEffectsRegistry";
import type { Game } from "../engine/core/game";
import type { Player } from "../engine/player/player";

export default {
  async bang(game: Game, player: Player, targetPlayer: Player) {
    player.stats.bangCardsPlayed++;
    targetPlayer.flags.isUnderSight = true;

    game.flow.setRuntimePromise("bang", 10000, false);
    const willTakeDamage = await game.getRuntimePromise("bang");

    if (willTakeDamage) {
      targetPlayer.takeDamage(1);
    }

    if (targetPlayer.flags.isEliminated) game.checkWinConditions();
  },
} satisfies CardEffectRegistry;
