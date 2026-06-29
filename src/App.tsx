import { useEffect, useState } from "react";
import "./normalize.css";
import "./App.css";
import MainMenu from "./pages/mainMenu";
import { m, AnimatePresence } from "motion/react";
import CreateLobby from "./pages/createLobby";
import { sizeAdaptive } from "./lib/css/cssFunctions";
import { useSocket } from "./hooks/useSocket";
import SearchLobby from "./pages/searchLobby";
import Lobby from "./pages/lobby";
import { useCurrentPageState } from "./stores/hooks/useCurrentPageState";
import Table from "./pages/table";
import { SocketEvents } from "./lib/socketEvents";
import { useLoadLocalization } from "./stores/hooks/useLoadLocalization";

export default function App() {
  const { isConnected, socketId } = useSocket();
  const [currentPage, setCurrentPage] = useCurrentPageState();
  const loadLocalization = useLoadLocalization();
  const { socket } = useSocket();

  useEffect(() => {
    const handleTestGame = () => {
      setCurrentPage("table");
    };
    socket.emit("TEST_GAME");
    socket.once(SocketEvents.GAME_CREATED, handleTestGame);
  }, [socket, setCurrentPage]);

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [exitAnimationType, setExitAnimationType] = useState<"left" | "up">(
    "left",
  );

  useEffect(() => {
    loadLocalization("enEN");
  }, [loadLocalization]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] flex items-center bg-woodenTexture select-none absolute overflow-hidden">
      <div
        style={{
          fontSize: sizeAdaptive(30),
          left: 0,
          bottom: 0,
          color: "white",
        }}
        className="absolute"
      >
        {isConnected ? `Connected: ${socketId}` : "Connecting..."}
      </div>
      <AnimatePresence mode="wait">
        {currentPage === "mainMenu" && (
          <m.div
            key={"mainMenu"}
            exit={{ translateX: "-100vw" }}
            animate={{ translateX: 0 }}
            initial={{ translateX: isFirstRender ? 0 : "-100vw" }}
            transition={{ duration: 0.2 }}
            className="h-[100%] w-[100%] flex items-center justify-center"
          >
            <MainMenu />
          </m.div>
        )}

        {currentPage === "createLobby" && (
          <m.div
            key={"createLobby"}
            className="h-[100%] w-[100%] flex items-center justify-center"
            initial={{ translateX: "100vw" }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ translateX: "100vw" }}
          >
            <CreateLobby />
          </m.div>
        )}

        {currentPage === "searchLobby" && (
          <m.div
            key={"searchLobby"}
            className="h-[100%] w-[100%] flex items-center justify-center"
            initial={{ translateX: "100vw" }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ translateX: "100vw" }}
          >
            <SearchLobby />
          </m.div>
        )}

        {currentPage === "lobby" && (
          <m.div
            key={"lobby"}
            className="h-[100%] w-[100%] flex items-center justify-center"
            initial={{ translateX: "100vw" }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.2 }}
            exit={
              exitAnimationType === "left"
                ? { translateX: "100vw" }
                : { translateY: "100vh" }
            }
          >
            <Lobby setExitAnimationType={setExitAnimationType} />
          </m.div>
        )}

        {currentPage === "table" && (
          <m.div
            key={"table"}
            className="h-[100%] w-[100%] flex items-center justify-center"
            initial={{ translateY: "-100vh" }}
            animate={{ translateY: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ translateY: "100vh" }}
          >
            <Table />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
