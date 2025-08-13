import type React from "react";
import type { LobbyConfig } from "../../../types";
import SeatLine from "./SeatLine";
import { motion, AnimatePresence } from "motion/react";
import SeatLine_self from "./SeatLine_self";

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
    const newSeats = [...lobbyConfig.seats];

    const newType = seat.type === "human" ? "ai" : "human";
    newSeats[seatIndex].type = newType;

    if (newType === "human") {
      newSeats[seatIndex].status = "open";
      newSeats[seatIndex].playerId = "";
      newSeats[seatIndex].playerName = "";
    } else {
      newSeats[seatIndex].status = "occupied";
      newSeats[seatIndex].playerId = undefined;
      newSeats[seatIndex].playerName = undefined;
    }

    const newLobbyConfig = { ...lobbyConfig, seats: newSeats };

    setLobbyConfig(newLobbyConfig);
  };

  return (
    <div className="h-[85%]">
      <AnimatePresence>
        {lobbyConfig.seats.map((item, index) => (
          <motion.div
            key={`lobbyname + ${index}`}
            className="h-[14.3%]"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            exit={{ opacity: 0 }}
          >
            {index === 0 ? (
              <SeatLine_self name={lobbyConfig.playerName} seat={item} />
            ) : (
              <SeatLine seat={item} index={index} setSeatType={setSeatType} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
