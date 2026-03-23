import { usePublicDataState } from "../../hooks/usePublicDataState";
import { useSocket } from "../../hooks/useSocket";
import { useSystemLocalization } from "../../hooks/useSystemLocalization";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import type { PublicData } from "../../types";
import Queue from "./CurrentTurnDisplay/Queue";
import TurnControls from "./CurrentTurnDisplay/TurnControls";

export default function CurrentTurnDisplay() {
  const { socket } = useSocket();
  const publicData = usePublicDataState()[0] as PublicData;
  const currentPlayer = publicData?.playersPublicData[publicData.currentPlayer];
  if (!currentPlayer) return;

  return (
    <div
      className="w-full h-auto absolute border bg-[var(--BEIGE)] flex flex-col overflow-hidden"
      style={{
        borderBottomRightRadius: sizeAdaptive(35),
        borderBottomLeftRadius: sizeAdaptive(30),
        borderWidth: sizeAdaptive(300),
      }}
    >
      <Title />
      <Queue />

      {socket.id === currentPlayer.id && <TurnControls />}

      <PlayerName />
    </div>
  );
}

function Title() {
  const locale = useSystemLocalization() as Record<string, string>;
  return (
    <div
      className="w-[80%] m-auto font-oldtown border-black text-[var(--BLACK)] text-center font-bold tracking-widest"
      style={{
        fontSize: sizeAdaptive(25),
        lineHeight: sizeAdaptive(20),
      }}
    >
      {locale["current_turn"]}
    </div>
  );
}

function PlayerName() {
  const { socket } = useSocket();
  const locale = useSystemLocalization() as Record<string, string>;

  const publicData = usePublicDataState()[0] as PublicData;

  if (!publicData) return;

  const currentPlayer = publicData.playersPublicData[publicData.currentPlayer];

  return (
    <div
      className="w-[100%] h-[30%] m-auto font-oldtown border-black text-[var(--BLACK)] text-center tracking-widest"
      style={{
        borderTopWidth: sizeAdaptive(300),
        fontSize: sizeAdaptive(30),
        lineHeight: sizeAdaptive(24),
        backgroundColor: currentPlayer.id === socket.id ? "green" : "",
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
