import { Runtime } from "./runtime";
import { GameState } from "./gameState";
import { GameStateValidator } from "./gameStateValidator";
import { GameFlow } from "./gameFlow";
import { GameStateController } from "./gameStateController";
import { MatchPreparer } from "./matchPreparer";
import { InteractionController } from "./interactionController";

export class Game {
  private runtime: Runtime;
  state: GameState;
  SC: GameStateController;
  IC: InteractionController;
  private validator: GameStateValidator;
  flow: GameFlow;

  public constructor(gameState: GameState) {
    this.runtime = new Runtime();
    this.state = gameState;
    this.validator = new GameStateValidator(this.state);
    this.SC = new GameStateController(this.state, this.validator, this.runtime);
    this.IC = new InteractionController(this.SC); //WARNING: Don't forget about this one!
    this.flow = new GameFlow(
      this.SC,
      this.validator,
      new MatchPreparer(this.SC, this.runtime),
    );
  }
}
