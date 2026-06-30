import type { EventType } from "../types";
import OpponentCardDrawn from "./CARD_DRAWN/OpponentCardDrawn";
import ClientCardDrawn from "./CARD_DRAWN/ClientCardDrawn";
import { socket } from "../lib/socket";

export default function CARD_DRAWN({
  data,
  onComplete,
}: {
  data: EventType["CARD_DRAWN"];
  onComplete: () => void;
  animationId: string;
}) {
  const playerIsClient = data.playerId === socket.id;

  return (
    <div className="w-0 h-0 z-1000 absolute">
      {playerIsClient ? (
        <ClientCardDrawn data={data} onComplete={onComplete} />
      ) : (
        <OpponentCardDrawn data={data} onComplete={onComplete} />
      )}
    </div>
  );
}
