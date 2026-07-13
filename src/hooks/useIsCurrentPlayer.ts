import { socket } from "../lib/socket";
import { useLocalStateStore } from "../stores/localStateStore";

export default function useIsCurrentPlayer(playerId: string = socket.id ?? "") {
  const currentPlayerId = useLocalStateStore(
    (state) => state.turn.playerId ?? state.turn.previousPlayerId,
  );

  return playerId === currentPlayerId;
}
