import type { GameStateController } from "./gameStateController";
import type { Runtime } from "./runtime";

export class MatchPreparer {
  SC: GameStateController;
  runtime: Runtime;

  constructor(stateController: GameStateController, runtime: Runtime) {
    this.SC = stateController;
    this.runtime = runtime;
  }

  async prepare() {
    await this.assingPlayers();
    await this.dealAllCards();
  }

  async assingPlayers() {
    this.runtime.setRuntimePromise("allPlayersAssigned", 60000, false);

    const allPlayersAssignedSuccessfully =
      await this.runtime.getRuntimePromise("allPlayersAssigned");

    if (!allPlayersAssignedSuccessfully)
      throw new Error("Players failed to connect in time");
  }

  async dealAllCards() {
    this.SC.dealRoleCards();
    this.SC.dealCharCards();
    await this.waitForCharSelection();
    this.SC.dealPlayingCards();
  }

  private async waitForCharSelection() {
    //NOTE: something probably wrong here, possibly need to refactor logic
    //to consider (true/false) resolve.
    await this.runtime.getRuntimePromise("charSelection");
  }
}
