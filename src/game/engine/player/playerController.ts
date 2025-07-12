import type { Role } from "../../../types";
import type { GameState } from "../state/gameState";
import type { GameStateValidator } from "../validation/gameStateValidator";
import type { Player } from "./player";
import type { Runtime } from "../runtime/runtime";

export class PlayerController {
  state: GameState;
  validator: GameStateValidator;
  runtime: Runtime;

  constructor(
    state: GameState,
    validator: GameStateValidator,
    runtime: Runtime,
  ) {
    this.state = state;
    this.validator = validator;
    this.runtime = runtime;
  }

  get currentPlayer() {
    return this.state.currentPlayer;
  }

  doForEachPlayer(callback: (player: Player, index: number) => void) {
    this.state.players.forEach((player, index) => callback(player, index));
  }

  getMaxHealth(player: Player) {
    return player.stats.health.max;
  }

  assingPlayerToAnEmptySlot(nickname: string) {
    for (let i = 0; i <= this.state.players.length - 1; i++) {
      const player = this.state.players[i];

      if (!player.flags.isPlayerAssigned) {
        player.assingPlayer(nickname);
        break;
      }
    }

    if (this.validator.isAllPlayersAssigned) {
      this.shufflePlayers();
      this.runtime.resolveRuntimePromise("allPlayersAssigned", true);
    }
  }

  assignRole(player: Player, roleCardId: string) {
    player.assignRole(roleCardId);
  }

  savePlayerByRole(player: Player, role: string) {
    this.state.roles[role as Role].push(player);
  }

  private shufflePlayers() {
    const result = [...this.state.players];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    this.state.players = result;
  }

  setPlayerChar(player: Player, option: 0 | 1) {
    player.pickCharCard(option);
    if (this.validator.isAllCharsAssigned) {
      this.runtime.resolveRuntimePromise("charSelection", true);
    }
  }

  setCharOptions(player: Player, options: { id: string; bullets: number }[]) {
    player._charOptions = options;
  }

  setCurrentPlayer(index: number) {
    this.state.currentPlayer = index;
  }

  getPlayer(index: number) {
    if (this.state.players[index]) {
      return this.state.players[index];
    } else {
      throw new Error("No player with such index");
    }
  }

  getPlayersIndex(player: Player) {
    return this.state.players.indexOf(player);
  }

  getNewCurrentPlayer(prevPlayer: number): number {
    if (this.validator.playersActive < 2) {
      throw new Error(
        "Trying to pass turn with less then two active players left",
      );
    }

    const nextPlayer =
      prevPlayer + 1 >= this.state.players.length ? 0 : prevPlayer + 1;

    if (this.state.players[nextPlayer].flags.isEliminated) {
      return this.getNewCurrentPlayer(nextPlayer);
    } else return nextPlayer;
  }

  addCardsToTheHand(player: Player, cards: string[]) {
    player.hand.push(...cards);
  }

  discardFromHand(cardIndex: number, player: Player) {
    if (cardIndex < 0 || cardIndex >= player.hand.length)
      throw new Error("Invalid index");

    const [discardedCard] = player.hand.splice(cardIndex, 1);
    this.state.discardPile.push(discardedCard);
  }

  resetBangCounter(player: Player) {
    player.stats.bangCardsPlayed = 0;
  }
}
