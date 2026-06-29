import Lobby_content from "../components/lobby/Lobby_content";
import Background_big from "../components/shared/Background_big";
import { useSocket } from "../hooks/useSocket";
import { useEffect } from "react";
import { SocketEvents } from "../lib/socketEvents";
import { useCurrentPageState } from "../stores/hooks/useCurrentPageState";

export default function Lobby({
  setExitAnimationType,
}: {
  setExitAnimationType: (type: "left" | "up") => void;
}) {
  const { socket } = useSocket();
  const setCurrentPage = useCurrentPageState()[1];

  useEffect(() => {
    socket.on(SocketEvents.KICKED_OUT, handleKickedOut);

    return () => {
      socket.off(SocketEvents.KICKED_OUT, handleKickedOut);
    };
  });

  const handleKickedOut = () => {
    setCurrentPage("mainMenu");
  };

  return (
    <div
      className="w-[100vw] absolute select-none flex justify-center items-center "
      style={{ height: "min(51vw, 100vh)", width: "min(100vw, 196vh)" }}
    >
      <Background_big />
      <Lobby_content setExitAnimationType={setExitAnimationType} />
    </div>
  );
}
