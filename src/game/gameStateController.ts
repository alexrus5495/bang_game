import type { Role } from "../types";
import type { GameState } from "./gameState";
import type { GameStateValidator } from "./gameStateValidator";
import type { Player } from "./player";
import type { Runtime } from "./runtime";

export class GameStateController {
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
  //
  //Player manipulation
  //

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

  //
  //Card manipulation
  //

  dealRoleCards() {
    this.state.players.forEach((player, index) => {
      const roleCardId = this.state.roleDeck.shift();

      if (roleCardId === undefined) {
        throw new Error("Error when getting role card from the deck.");
      }

      player.assignRole(roleCardId);

      //Save player's index in corresponding role array
      this.savePlayerByRole(player, roleCardId);

      //Set the current player to the one who got dealt the sheriff card.
      if (roleCardId === "sheriff") this.setCurrentPlayer(index);
    });
  }

  dealCharCards() {
    this.state.players.forEach((player, index) => {
      const optionA_id = this.state.charDeck.shift();
      const optionB_id = this.state.charDeck.shift();

      if (optionA_id === undefined || optionB_id === undefined) {
        throw new Error("Error when getting char card from the deck.");
      }

      const optionA = {
        id: optionA_id,
        bullets: this.state.charDeckMeta[optionA_id].bullets,
      };

      const optionB = {
        id: optionB_id,
        bullets: this.state.charDeckMeta[optionB_id].bullets,
      };

      player._charOptions = [optionA, optionB];

      //Set timer to auto pick character after 1 minute.
      this.runtime.setRuntimeTimer(
        `player${index}_charSelection`,
        () => {
          this.setPlayerChar(player, 0);
        },
        60000,
      );
    });

    this.runtime.setRuntimePromise(`charSelection`);
  }

  dealPlayingCards() {
    this.state.players.forEach((player) => {
      const cardsToDeal = player.stats.health.max;

      player.hand = this.state.deck.splice(0, cardsToDeal);
    });
  }

  newDeckFromDiscardPile() {
    this.state._deck.deck = this.state.discardPile;
    this.state._deck.shuffle();
    this.state.discardPile = [];
  }

  drawCards(cardsToDraw: number) {
    const drawnCards = [];

    for (let i = 1; i <= cardsToDraw; i++) {
      if (this.validator.isDeckEmpty) this.newDeckFromDiscardPile();

      drawnCards.push(this.state.deck.shift() as string);

      if (this.validator.isDeckEmpty) this.newDeckFromDiscardPile();
    }

    return drawnCards;
  }
}
