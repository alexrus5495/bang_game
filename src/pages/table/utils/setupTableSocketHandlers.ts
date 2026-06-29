import type { Socket } from "socket.io-client";
import type { CardsMetaData, GameEvent } from "../../../types";
import { SocketEvents } from "../../../lib/socketEvents.ts";

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
  const onSendCardsMeta = (data: CardsMetaData) => {
    setCardsMeta(data);
  };

  const onBroadcastMessages = (data: GameEvent[]) => {
    setGameEvents(data);
  };

  //Emit after joining the game
  socket.emit(SocketEvents.JOIN_GAME, lobbyId);

  //Subscribe to events
  socket.on(SocketEvents.SEND_CARDS_META, onSendCardsMeta);
  socket.on(SocketEvents.BROADCAST_EVENTS, onBroadcastMessages);

  //Return cleanup function
  return () => {
    socket.off(SocketEvents.SEND_CARDS_META, onSendCardsMeta);
    socket.off(SocketEvents.BROADCAST_EVENTS, onBroadcastMessages);
  };
}
