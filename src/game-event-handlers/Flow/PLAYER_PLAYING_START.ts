import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";
import { SocketEvents } from "../../lib/socketEvents";
import { socket } from "../../lib/socket";

export default function PLAYER_PLAYING_START() {
  return (
    _data: EventType["PLAYER_PLAYING_START"],
    stage: StateUpdaterStage,
  ) => {
    if (stage === "beforeAnimation") {
      const { flowController } = useLocalStateStore.getState();
      flowController.playingStart();
      console.log(`requesting hand validation`);
      socket.emit(SocketEvents.REQUEST_HAND_VALIDATION);
    }
  };
}
