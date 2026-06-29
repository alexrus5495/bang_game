import { useLocalStateStore } from "../stores/localStateStore";
import { socket } from "../lib/socket";

export default function DevKiller() {
  return (
    <div className="h-auto w-60 p-3 bg-amber-500 flex gap-5 justify-center">
      <div className="flex flex-col gap-2 items-center">
        <div className="text-3xl">Player</div>
        <SeatButton seatIndex={0} />
        <SeatButton seatIndex={1} />
        <SeatButton seatIndex={2} />
        <SeatButton seatIndex={3} />
        <SeatButton seatIndex={4} />
        <SeatButton seatIndex={5} />
        <SeatButton seatIndex={6} />
      </div>
    </div>
  );
}

function SeatButton({ seatIndex }: { seatIndex: number }) {
  const players = useLocalStateStore((state) => state.players);
  const devController = useLocalStateStore((state) => state.devController);
  const player = players[seatIndex];
  const isAlive = !player.flags.isEliminated;

  const onClick = () => {
    devController.toggleAlive(player.id);
  };

  return (
    <div
      className="h-10 w-15 text-3xl text-center cursor-pointer"
      style={{ backgroundColor: isAlive ? "green" : "red" }}
      onClick={onClick}
    >
      {`${seatIndex}`}
      {player?.id === socket.id ? "!!" : ""}
    </div>
  );
}
