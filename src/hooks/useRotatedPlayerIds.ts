import { useStore } from "zustand";
import { useSocket } from "./useSocket";
import { useShallow } from "zustand/shallow";
import { useLocalStateStore } from "../stores/localStateStore";

export function useRotatedPlayerIds() {
  const { socket } = useSocket();

  const ids = useStore(
    useLocalStateStore,
    useShallow((state) =>
      state.playersController.getRotatedPlayerIds(socket.id!),
    ),
  );

  return ids;
}
