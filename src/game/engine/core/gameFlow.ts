import { MatchPreparer } from "./matchPreparer";
import type { PhaseContoller } from "./phaseContoller";
import type { CardEffectsDispatcher } from "../cards/cardEffectsDispatcher";

export class GameFlow {
  matchPreparer: MatchPreparer;
  private phaseCtrl: PhaseContoller;
  private CEF: CardEffectsDispatcher;
  constructor(
    matchPreparer: MatchPreparer,
    phaseController: PhaseContoller,
    cardEffectsDispatcher: CardEffectsDispatcher,
  ) {
    this.matchPreparer = matchPreparer;
    this.phaseCtrl = phaseController;
    this.CEF = cardEffectsDispatcher;
  }

  public readonly phase = {
    prepareGame: () => this.prepareGame(),
    startGame: () => this.phaseCtrl.startGame(),
    gameOver: (winner: string) => this.phaseCtrl.gameOver(winner),
  };

  public readonly card = {
    tryToPlayCard: (
      cardIndex: number,
      playerIndex: number,
      targetPlayerIndex?: number,
    ) => this.CEF.tryToPlayCard(cardIndex, playerIndex, targetPlayerIndex),
  };

  private async prepareGame() {
    await this.matchPreparer.prepare();
    this.phaseCtrl.startGame();
  }
}
