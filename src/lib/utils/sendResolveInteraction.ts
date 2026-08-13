import { socket } from "../socket";
import { SocketEvents } from "../socketEvents";

export type ResolveInteractionPayload =
  | {
      type: "GENERAL_STORE";
      cardIndex: number;
      playerId: string;
    }
  | {
      type: "CHAR_SELECTION";
      playerId: string;
      optionIndex: number;
    };

/**
 * Send player's choice for current interaction to the server
 */
export const sendResolveInteraction = (payload: ResolveInteractionPayload) => {
  socket.emit(SocketEvents.RESOLVE_INTERACTION, payload);
};
