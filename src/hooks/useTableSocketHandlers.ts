import { useEffect } from "react";
import {
  setupTableSocketHandlers,
  type TableSocketDependencies,
} from "../pages/table/utils/setupTableSocketHandlers";

export function useTableSocketHandlers({
  socket,
  lobbyId,
  setCardsMeta,
  setGameEvents,
}: TableSocketDependencies) {
  useEffect(() => {
    return setupTableSocketHandlers({
      socket,
      lobbyId,
      setCardsMeta,
      setGameEvents,
    });
  }, [socket, lobbyId, setCardsMeta, setGameEvents]);
}
