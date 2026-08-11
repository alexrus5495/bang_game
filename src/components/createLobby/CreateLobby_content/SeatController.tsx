import { PLAYER_COLORS } from "../../../config/player.colors";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { m } from "motion/react";
import type { LobbyConfig, LobbySeat } from "../../../types";
import { useTranslation } from "../../../hooks/useTranslation";

export default function SeatController({
  lobbyConfig,
  setLobbyConfig,
}: {
  lobbyConfig: LobbyConfig;
  setLobbyConfig: React.Dispatch<React.SetStateAction<LobbyConfig>>;
}) {
  const t = useTranslation();

  const updateNumberOfSeats = (newNumber: number, newSeats: LobbySeat[]) => {
    const updatedPlayerConfig = {
      ...lobbyConfig,
      numberOfSeats: newNumber,
      seats: newSeats,
    };
    setLobbyConfig(updatedPlayerConfig);
  };

  const increaseNumberOfPlayers = () => {
    if (lobbyConfig.numberOfSeats >= 7) return;

    const newNumber = lobbyConfig.numberOfSeats + 1;
    const newSeats = lobbyConfig.seats;
    const prevId = lobbyConfig.seats.length - 1;
    newSeats.push({
      id: prevId + 1,
      type: "human",
      color: PLAYER_COLORS[prevId + 1],
      status: "open",
      playerId: "",
    });

    updateNumberOfSeats(newNumber, newSeats);
  };

  const decreaseNumberOfPlayers = () => {
    if (lobbyConfig.numberOfSeats <= 4) return;

    const newNumber = lobbyConfig.numberOfSeats - 1;
    const newSeats = lobbyConfig.seats;
    newSeats.pop();

    updateNumberOfSeats(newNumber, newSeats);
  };

  return (
    <div
      className="w-full h-[15%] flex items-center justify-center"
      style={{ gap: sizeAdaptive(40) }}
    >
      <h2
        style={{
          fontSize: sizeAdaptive(20),
        }}
      >
        {t("seats")}:
      </h2>

      <div
        className="flex h-full items-center"
        style={{ gap: sizeAdaptive(90) }}
      >
        <m.button
          type="button"
          className="h-[45%] aspect-square"
          style={{
            backgroundImage: `url("./minus.png")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: lobbyConfig.numberOfSeats > 4 ? 1 : 0,
            cursor: lobbyConfig.numberOfSeats > 4 ? "pointer" : "default",
          }}
          disabled={lobbyConfig.numberOfSeats > 4 ? false : true}
          onClick={() => decreaseNumberOfPlayers()}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.15 }}
        ></m.button>

        <div
          className="h-[40%] outline aspect-square text-center"
          style={{
            fontSize: sizeAdaptive(20),
            lineHeight: sizeAdaptive(23),
            outlineWidth: sizeAdaptive(200),
          }}
        >
          {lobbyConfig.numberOfSeats}
        </div>

        <m.button
          type="button"
          className="h-[45%] aspect-square"
          style={{
            backgroundImage: `url("./plus.png")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: lobbyConfig.numberOfSeats < 7 ? 1 : 0,
            cursor: lobbyConfig.numberOfSeats < 7 ? "pointer" : "default",
          }}
          disabled={lobbyConfig.numberOfSeats < 7 ? false : true}
          onClick={() => increaseNumberOfPlayers()}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.15 }}
        ></m.button>
      </div>
    </div>
  );
}
