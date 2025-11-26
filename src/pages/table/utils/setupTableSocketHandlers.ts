import type { Socket } from "socket.io-client";
import type { CardsMetaData, Messages, PublicData } from "../../../types";
import { SocketEvents } from "../../../lib/socketEvents.ts";

interface TableSocketDependencies {
  socket: Socket;
  lobbyId: string;
  setCardsMeta: (data: CardsMetaData) => void;
  setPublicData: (data: PublicData) => void;
  setMessages: (data: Messages) => void;
}

export function setupTableSocketHandlers({
  socket,
  lobbyId,
  setCardsMeta,
  setPublicData,
  setMessages,
}: TableSocketDependencies) {
  const onSendCardsMeta = (data: CardsMetaData) => {
    setCardsMeta(data);
  };

  const onSendPublicData = (data: PublicData) => {
    setPublicData(data);
  };

  const onBroadcastMessages = (data: Messages) => {
    setMessages(data);
  };

  //Emit after joining the game
  socket.emit(SocketEvents.JOIN_GAME, lobbyId);

  //Subscribe to events
  socket.on(SocketEvents.SEND_CARDS_META, onSendCardsMeta);
  socket.on(SocketEvents.SEND_PUBLIC_DATA, onSendPublicData);
  socket.on(SocketEvents.BROADCAST_MESSAGES, onBroadcastMessages);

  //Return cleanup function
  return () => {
    socket.off(SocketEvents.SEND_CARDS_META, onSendCardsMeta);
    socket.off(SocketEvents.SEND_PUBLIC_DATA, onSendPublicData);
    socket.off(SocketEvents.BROADCAST_MESSAGES, onBroadcastMessages);
  };
}
