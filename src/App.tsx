import { useEffect, useState } from "react";
import "./normalize.css";
import "./App.css";
import { useAppDispatch } from "./hooks/useAppSelector";
import { loadLocalization } from "./store/slices/localeSlice";
import MainMenu from "./pages/mainMenu";
import { motion, AnimatePresence } from "motion/react";
import CreateLobby from "./pages/createLobby";
import { sizeAdaptive } from "./lib/css/cssFunctions";
import { useSocket } from "./hooks/useSocket";
import SearchLobby from "./pages/searchLobby";
import Lobby from "./pages/lobby";
import { useCurrentPageState } from "./hooks/useCurrentPageState";

export default function App() {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const currentPage = useCurrentPageState();
  const dispatch = useAppDispatch();
  const { isConnected, socketId } = useSocket();

  useEffect(() => {
    dispatch(loadLocalization("enEN"));
  }, [dispatch]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] flex items-center bg-woodenTexture select-none absolute overflow-hidden">
      <div
        style={{
          fontSize: sizeAdaptive(20),
          left: 0,
          top: 0,
          color: "white",
        }}
        className="absolute"
      >
        {isConnected ? `Connected: ${socketId}` : "`Connecting..."}
      </div>
      <AnimatePresence mode="wait">
        {currentPage === "mainMenu" && (
          <motion.div
            key={"mainMenu"}
            exit={{ translateX: "-100vw" }}
            animate={{ translateX: 0 }}
            initial={{ translateX: isFirstRender ? 0 : "-100vw" }}
            transition={{ duration: 0.2 }}
            className="h-[100%] w-[100%] flex items-center justify-center"
          >
            <MainMenu />
          </motion.div>
        )}

        {currentPage === "createLobby" && (
          <motion.div
            key={"createLobby"}
            className="h-[100%] w-[100%] flex items-center justify-center"
            initial={{ translateX: "100vw" }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ translateX: "100vw" }}
          >
            <CreateLobby />
          </motion.div>
        )}

        {currentPage === "searchLobby" && (
          <motion.div
            key={"searchLobby"}
            className="h-[100%] w-[100%] flex items-center justify-center"
            initial={{ translateX: "100vw" }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ translateX: "100vw" }}
          >
            <SearchLobby />
          </motion.div>
        )}

        {currentPage === "lobby" && (
          <motion.div
            key={"lobby"}
            className="h-[100%] w-[100%] flex items-center justify-center"
            initial={{ translateX: "100vw" }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ translateX: "100vw" }}
          >
            <Lobby />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
