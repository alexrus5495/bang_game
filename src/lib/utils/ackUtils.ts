import type { EventType } from "../../types";
import { socket } from "../socket";
import { SocketEvents } from "../socketEvents";

export function createAckKey(
  eventType: keyof EventType,
  playerId: string,
): string {
  return `${eventType}:${playerId}`;
}

export function resolveAck(eventType: keyof EventType, playerId: string) {
  socket.emit(SocketEvents.CLIENT_ACK, {
    ackKey: createAckKey(eventType, playerId),
  });
}
