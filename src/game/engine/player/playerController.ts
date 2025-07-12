import type { Role } from "../../../types";
import type { GameState } from "../state/gameState";
import type { GameStateValidator } from "../validation/gameStateValidator";
import type { Player } from "./player";
import type { Runtime } from "../runtime/runtime";
import { promiseKeys } from "../runtime/runtimeKeys";

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

  addCardsToTheHand(player: Player, cards: string[]) {
    player.hand.push(...cards);
  }

  assignToAnEmptySlot(nickname: string) {
    for (let i = 0; i <= this.state.players.length - 1; i++) {
      const player = this.state.players[i];

      if (!player.flags.isPlayerAssigned) {
        player.assingPlayer(nickname);
        break;
      }
    }

    if (this.validator.isAllPlayersAssigned) {
      this.shufflePlayers();
      this.runtime.resolveRuntimePromise(promiseKeys.allPlayersAssigned, true);
    }
  }

  assignRole(player: Player, roleCardId: string) {
    player.assignRole(roleCardId);
  }

  doForEachPlayer(callback: (player: Player, index: number) => void) {
    this.state.players.forEach((player, index) => callback(player, index));
  }

  getCardFromHand(cardIndex: number, player: Player) {
    if (cardIndex < 0 || cardIndex >= player.hand.length)
      throw new Error("Invalid index");

    const [discardedCard] = player.hand.splice(cardIndex, 1);
    return discardedCard;
  }

  getMaxHealth(player: Player) {
    return player.stats.health.max;
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

  setChar(player: Player, option: 0 | 1) {
    player.pickCharCard(option);
    if (this.validator.isAllCharsAssigned) {
      this.runtime.resolveRuntimePromise(promiseKeys.charSelection, true);
    }
  }

  setCharOptions(player: Player, options: { id: string; bullets: number }[]) {
    player._charOptions = options;
  }

  setCurrentPlayer(index: number) {
    this.state.currentPlayer = index;
  }

  resetBangCounter(player: Player) {
    player.stats.bangCardsPlayed = 0;
  }
}
