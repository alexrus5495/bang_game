import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { useLocalStateStore } from "../stores/localStateStore";
import { socket } from "../lib/socket";

export function useRotatedPlayerIds() {
  const ids = useStore(
    useLocalStateStore,
    useShallow((state) =>
      state.playersController.getRotatedPlayerIds(socket.id!),
    ),
  );

  return ids;
}
