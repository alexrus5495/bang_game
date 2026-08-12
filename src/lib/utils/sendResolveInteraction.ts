import { socket } from "../socket";
import { SocketEvents } from "../socketEvents";

export type ResolveInteractionPayload = {
  type: "GENERAL_STORE";
  cardIndex: number;
  playerId: string;
};

/**
 * Send player's choice for current interaction to the server
 */
export const sendResolveInteraction = (payload: ResolveInteractionPayload) => {
  console.log(`sending resolve interaction`);
  console.table(payload);
  socket.emit(SocketEvents.RESOLVE_INTERACTION, payload);
};
