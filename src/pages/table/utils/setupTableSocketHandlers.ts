import type { Socket } from "socket.io-client";
import type { CardsMetaData, GameEvent } from "../../../types";
import { SocketEvents } from "../../../lib/socketEvents.ts";
import type { CardValidationData } from "../../../stores/localStateStore/types.ts";
import { useLocalStateStore } from "../../../stores/localStateStore.ts";

export interface TableSocketDependencies {
  socket: Socket;
  lobbyId: string;
  setCardsMeta: (data: CardsMetaData) => void;
  setGameEvents: (data: GameEvent[]) => void;
}

export function setupTableSocketHandlers({
  socket,
  lobbyId,
  setCardsMeta,
  setGameEvents,
}: TableSocketDependencies) {
  const localStateStore = useLocalStateStore.getState();

  const onSendCardsMeta = (data: CardsMetaData) => {
    setCardsMeta(data);
  };

  const onBroadcastMessages = (data: GameEvent[]) => {
    setGameEvents(data);
  };

  const onSendHandValidationData = (data: CardValidationData[]) => {
    if (!socket.id) return;
    localStateStore.playersController.setHandValidationData(data, socket.id);
  };

  //Emit after joining the game
  socket.emit(SocketEvents.JOIN_GAME, lobbyId);

  //Subscribe to events
  socket.on(SocketEvents.SEND_CARDS_META, onSendCardsMeta);
  socket.on(SocketEvents.BROADCAST_EVENTS, onBroadcastMessages);
  socket.on(SocketEvents.SEND_HAND_VALIDATION_DATA, onSendHandValidationData);

  //Return cleanup function
  return () => {
    socket.off(SocketEvents.SEND_CARDS_META, onSendCardsMeta);
    socket.off(SocketEvents.BROADCAST_EVENTS, onBroadcastMessages);
    socket.off(
      SocketEvents.SEND_HAND_VALIDATION_DATA,
      onSendHandValidationData,
    );
  };
}
