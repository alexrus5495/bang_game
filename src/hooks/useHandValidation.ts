import { useShallow } from "zustand/shallow";
import { useLocalStateStore } from "../stores/localStateStore";
import { socket } from "../lib/socket";

export function useHandValidation() {
  const handValidationData = useLocalStateStore(
    useShallow(
      (state) =>
        state.playersController.getPlayerById(socket.id ?? "")
          ?.handValidationData,
    ),
  );

  return handValidationData;
}
