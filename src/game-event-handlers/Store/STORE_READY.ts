import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import type { EventType } from "../../types";

export default function STORE_READY() {
  return (data: EventType["STORE_READY"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      console.log(`got STORE_READY event`);
    }
  };
}
