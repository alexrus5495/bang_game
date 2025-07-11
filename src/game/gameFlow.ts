import type { GameStateController } from "./gameStateController";
import type { GameStateValidator } from "./gameStateValidator";
import { MatchPreparer } from "./matchPreparer";
import type { Player } from "./player";

export class GameFlow {
  private SC: GameStateController;
  private validator: GameStateValidator;
  matchPreparer: MatchPreparer;
  constructor(
    stateController: GameStateController,
    validator: GameStateValidator,
    matchPreparer: MatchPreparer,
  ) {
    this.SC = stateController;
    this.validator = validator;
    this.matchPreparer = matchPreparer;
  }

  async prepareGame() {
    await this.matchPreparer.prepare();
    this.startGame();
  }

  private startGame() {
    console.log("Game has started!");

    this.initiatePlayersTurn(this.SC.currentPlayer);
  }

  private initiatePlayersTurn(currentPlayer: number) {
    const player = this.SC.getPlayer(currentPlayer);
    console.log(
      `Player ${this.SC.getPlayersIndex(player)} (${player.nickname}) turn has started!`,
    );

    this.initiateDrawingPhase(player);
  }

  private initiateDrawingPhase(player: Player) {
    console.log("PHASE 1 - DRAWING CARDS.");

    //TODO: add exceptions for some chars.

    const drawnCards = this.SC.drawCards(2);

    this.SC.addCardsToTheHand(player, drawnCards);

    console.log(
      `Player ${this.SC.getPlayersIndex(player)} (${player.nickname}) has drawn ${drawnCards.length} cards.`,
    );

    console.log(`Cards in hand now: ${player.hand.length}`);

    this.endDrawingPhase(player);
  }

  private endDrawingPhase(player: Player) {
    console.log("End of drawing phase");

    this.initiatePlayingPhase(player);
  }

  private initiatePlayingPhase(player: Player) {
    console.log("PHASE 2 - PLAYING CARDS");
    this.SC.resetBangCounter(player);
  }

  private endPlayingPhase(player: Player) {
    console.log("End of playing phase");

    this.initiateDiscardingPhase(player);
  }

  private initiateDiscardingPhase(player: Player) {
    console.log("PHASE 3 - DISCARDING CARDS");
  }

  private endDiscardingPhase(player: Player) {
    if (!this.validator.canEndDiscardingPhase(player)) {
      console.log("Player must discard extra cards before ending turn");
    } else {
      console.log("End of discarding phase");

      this.endPlayersTurn(player);
    }
  }

  public endPlayersTurn(player: Player) {
    console.log(
      `End of Player ${this.SC.getPlayersIndex(player)} (${player.nickname}) turn`,
    );

    this.passTurn();
  }

  private passTurn() {
    console.log(`Passing turn...`);

    const newPlayerIndex = this.SC.getNewCurrentPlayer(this.SC.currentPlayer);

    this.SC.setCurrentPlayer(newPlayerIndex);

    console.log(
      `New current player: Player ${newPlayerIndex}(${this.SC.getPlayer(newPlayerIndex).nickname})`,
    );

    this.initiatePlayersTurn(newPlayerIndex);
  }

  public tryToPlayCard(
    cardIndex: number,
    playerIndex: number,
    targetPlayerIndex?: number,
  ) {
    const player = this.SC.getPlayer(playerIndex);
    const targetPlayer = targetPlayerIndex
      ? this.SC.getPlayer(targetPlayerIndex)
      : undefined;

    if (targetPlayer && targetPlayer.flags.isEliminated) {
      console.log(`Can't play a card against eliminated player.`);
      return;
    }

    if (this.validator.isCardAllowedToPlay(cardIndex, player, targetPlayer)) {
      this.playCard(cardIndex, player, targetPlayer);
    } else {
      console.log(`Card is not allowed to play!`);
    }
  }

  private playCard(cardIndex: number, player: Player, targetPlayer?: Player) {
    let cardId = player.hand[cardIndex];

    if (player.char === "calamity_janet")
      cardId = this.validator.tryCalamityJanetCardSwap(cardId, player);

    this.triggerCardEffect(cardId, player, targetPlayer);
    this.SC.discardFromHand(cardIndex, player);
  }

  private triggerCardEffect(
    cardId: string,
    player: Player,
    targetPlayer?: Player,
  ) {}
}
