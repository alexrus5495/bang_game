import { type LocalState } from "../stores/localStateStore";
import { socket } from "../lib/socket";
import {
  useDevController,
  useIsCurrentPlayer,
  usePlayersController,
  useTurnPhase,
} from "../stores/hooks/localStateStore.hooks";

export default function DevFlowControls() {
  return (
    <div className="h-auto w-60 p-3 bg-amber-500 flex gap-5 justify-center">
      <div className="flex flex-col gap-2 items-center">
        <div className="text-3xl">TURN:</div>
        <SeatButton seatIndex={-1} />
        <SeatButton seatIndex={0} />
        <SeatButton seatIndex={1} />
        <SeatButton seatIndex={2} />
        <SeatButton seatIndex={3} />
        <SeatButton seatIndex={4} />
        <SeatButton seatIndex={5} />
        <SeatButton seatIndex={6} />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <div className="text-3xl">PHASE:</div>
        <PhaseButton phase={"IDLE"} />
        <PhaseButton phase={"DRAWING"} />
        <PhaseButton phase={"PLAYING"} />
        <PhaseButton phase={"DISCARDING"} />
      </div>
    </div>
  );
}

function SeatButton({ seatIndex }: { seatIndex: number }) {
  const devController = useDevController();
  const playersController = usePlayersController();
  const player = playersController.getPlayerByIndex(seatIndex);
  const isCurrent = useIsCurrentPlayer(player?.id ?? "");

  if (!player) return null;

  const onClick = () => {
    if (seatIndex !== -1) {
      devController.setTurn(player.id);
    } else devController.setTurn(null);
  };

  return (
    <div
      className="h-10 w-15 text-3xl text-center cursor-pointer"
      style={{ backgroundColor: isCurrent ? "green" : "white" }}
      onClick={onClick}
    >
      {`${seatIndex}`}
      {player?.id === socket.id ? "!!" : ""}
    </div>
  );
}

function PhaseButton({ phase }: { phase: LocalState["turnPhase"] }) {
  const currentPhase = useTurnPhase();
  const devController = useDevController();
  const isCurrent = currentPhase === phase;

  const onClick = () => {
    devController.setPhase(phase);
  };

  return (
    <div
      className="h-10 w-25 text-3xl text-center cursor-pointer"
      style={{ backgroundColor: isCurrent ? "green" : "white" }}
      onClick={onClick}
    >
      {phase}
    </div>
  );
}
