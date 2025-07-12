import { Runtime } from "../runtime/runtime";
import { GameState } from "../state/gameState";
import { GameStateValidator } from "../validation/gameStateValidator";
import { GameFlow } from "./gameFlow";
import { GameStateController } from "../state/gameStateController";
import { MatchPreparer } from "./matchPreparer";
import { InteractionController } from "../interactionController";
import { PromiseManager } from "../runtime/promiseManager";
import { TimerManager } from "../runtime/timerManager";

export class Game {
  private runtime: Runtime;
  state: GameState;
  SC: GameStateController;
  IC: InteractionController;
  private validator: GameStateValidator;
  flow: GameFlow;

  public constructor(gameState: GameState) {
    this.runtime = new Runtime(new PromiseManager(), new TimerManager());
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
