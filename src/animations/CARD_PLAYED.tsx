import { socket } from "../lib/socket";
import type { EventType } from "../types";
import ClientCardPlayed from "./CARD_PLAYED/ClientCardPlayed";
import OpponentCardPlayed from "./CARD_PLAYED/OpponentCardPlayed";

export default function CARD_PLAYED({
  id,
  data,
  onComplete,
}: {
  id: number;
  data: EventType["CARD_PLAYED"];
  onComplete: () => void;
}) {
  const playerIsClient = data.playerId === socket.id;
  return (
    <div className="w-0 h-0 z-1000 absolute">
      {playerIsClient ? (
        <ClientCardPlayed data={data} onComplete={onComplete} id={id} />
      ) : (
        <OpponentCardPlayed data={data} onComplete={onComplete} />
      )}
    </div>
  );
}
