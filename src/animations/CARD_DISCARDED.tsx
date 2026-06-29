import { useSocket } from "../hooks/useSocket";
import type { EventType } from "../types";
import ClientCardDiscarded from "./CARD_DISCARDED/ClientCardDiscarded";
import OpponentCardDiscarded from "./CARD_DISCARDED/OpponentCardDiscarded";

export default function CARD_DISCARDED({
  data,
  onComplete,
}: {
  data: EventType["CARD_DISCARDED"];
  onComplete: () => void;
  animationId: string;
}) {
  const { socket } = useSocket();
  const playerIsClient = data.playerId === socket.id;

  return (
    <div className="w-0 h-0 z-1000 absolute">
      {playerIsClient ? (
        <ClientCardDiscarded data={data} onComplete={onComplete} />
      ) : (
        <OpponentCardDiscarded data={data} onComplete={onComplete} />
      )}
    </div>
  );
}
