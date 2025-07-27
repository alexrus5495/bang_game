import type React from "react";
import type { LobbyConfig } from "../CreateLobby_content";
import SeatLine from "./SeatLine";
import { motion, AnimatePresence } from "motion/react";

export default function CreateLobby_seatDisplay({
  lobbyConfig,
  setLobbyConfig,
}: {
  lobbyConfig: LobbyConfig;
  setLobbyConfig: React.Dispatch<React.SetStateAction<LobbyConfig>>;
}) {
  const setSeatType = (seatIndex: number, type: "human" | "ai") => {
    const seat = lobbyConfig.seats[seatIndex];
    if (seat.type === type) return;

    const newType = seat.type === "human" ? "ai" : "human";

    const newSeats = [...lobbyConfig.seats];
    newSeats[seatIndex].type = newType;
    const newLobbyConfig = { ...lobbyConfig, seats: newSeats };

    setLobbyConfig(newLobbyConfig);
  };

  return (
    <div className="h-[85%]">
      <AnimatePresence>
        {lobbyConfig.seats.map((item, index) => (
          <motion.div
            key={index}
            className="h-[14.3%]"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            exit={{ opacity: 0 }}
          >
            <SeatLine seat={item} index={index} setSeatType={setSeatType} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
