import { usePublicDataState } from "../../hooks/usePublicDataState";
import { useSocket } from "../../hooks/useSocket";
import { useSystemLocalization } from "../../hooks/useSystemLocalization";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import type { PublicData } from "../../types";
import Queue from "./CurrentTurnDisplay/Queue";

export default function CurrentTurnDisplay() {
  return (
    <div
      className="w-full h-full absolute border bg-[var(--BEIGE)] flex flex-col overflow-hidden"
      style={{
        borderBottomRightRadius: sizeAdaptive(35),
        borderBottomLeftRadius: sizeAdaptive(30),
        borderWidth: sizeAdaptive(300),
      }}
    >
      <Title />
      <Queue />
      <PlayerName />
    </div>
  );
}

function Title() {
  return (
    <div
      className="w-[80%] h-[30%] m-auto font-oldtown text-[var(--BLACK)] text-center font-bold tracking-widest"
      style={{
        fontSize: sizeAdaptive(25),
      }}
    >
      CURRENT TURN:
    </div>
  );
}

function PlayerName() {
  const { socket } = useSocket();
  const clientId = socket.id;
  const locale = useSystemLocalization() as Record<string, string>;

  const publicData = usePublicDataState()[0] as PublicData;

  if (!publicData) return;

  const currentPlayer = publicData.playersPublicData[publicData.currentPlayer];

  return (
    <div
      className="w-[100%] h-[30%] m-auto font-oldtown text-[var(--BLACK)] text-center tracking-widest"
      style={{
        fontSize: sizeAdaptive(30),
        lineHeight: sizeAdaptive(24),
        backgroundColor: "green",
      }}
    >
      {currentPlayer.id === socket.id
        ? locale["your_turn"]
        : currentPlayer.isAI
          ? locale[currentPlayer.nickname]
          : currentPlayer.nickname}
    </div>
  );
}
