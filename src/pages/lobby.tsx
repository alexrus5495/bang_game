import Lobby_content from "../components/lobby/Lobby_content";
import Background_big from "../components/shared/Background_big";
import { motion } from "motion/react";
import { useSocket } from "../hooks/useSocket";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppSelector";
import { setCurrentPage } from "../store/slices/currentPageSlice";
import { SocketEvents } from "../lib/socketEvents";

export default function Lobby() {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on(SocketEvents.KICKED_OUT, handleKickedOut);
  });

  const handleKickedOut = () => {
    dispatch(setCurrentPage("mainMenu"));
  };

  return (
    <motion.div
      className="w-[100vw] absolute select-none flex justify-center items-center "
      style={{ height: "min(51vw, 100vh)", width: "min(100vw, 196vh)" }}
    >
      <Background_big />
      <Lobby_content />
    </motion.div>
  );
}
