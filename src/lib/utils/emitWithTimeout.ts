import { socket } from "../socket";
import { type SocketEventName } from "../../lib/socketEvents";

type ServerResponse<T = unknown> =
  | { success: true; data?: T }
  | { success: false; error: string };

export function emitWithTimeout<T = unknown>(
  eventName: SocketEventName,
  payload: unknown,
  timeoutMs = 5000,
): Promise<T> {
  return new Promise((resolve, reject) => {
    let isSettled = false;

    // 1. Timeout in case the server isn't answering
    const timer = setTimeout(() => {
      if (isSettled) return;
      isSettled = true;
      reject(new Error("Request timeout"));
    }, timeoutMs);

    // 2. Emit socket event with an acknowledgement
    socket.emit(eventName, payload, (response: ServerResponse<T>) => {
      if (isSettled) return;
      isSettled = true;
      clearTimeout(timer);

      if (response.success) {
        resolve(response.data as T);
      } else {
        reject(new Error(response.error || "Server denied the request"));
      }
    });
  });
}
