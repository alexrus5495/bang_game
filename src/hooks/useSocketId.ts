import { useSocket } from "./useSocket";

export function useSocketId() {
  const { socket } = useSocket();
  return socket.id || null;
}
