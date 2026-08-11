import { socket } from "../../lib/socket";
import type { EventType } from "../../types";
import ClientCardEquipped from "./CARD_EQUIPPED/ClientCardEquipped";
import OpponentCardEquipped from "./CARD_EQUIPPED/OpponentCardEquipped";

export default function CARD_EQUIPPED({
  id,
  data,
  onComplete,
}: {
  id: number;
  data: EventType["CARD_EQUIPPED"];
  onComplete: () => void;
}) {
  const playerIsClient = data.playerId === socket.id;
  return (
    <div className="w-0 h-0 z-1000 absolute">
      {playerIsClient ? (
        <ClientCardEquipped id={id} data={data} onComplete={onComplete} />
      ) : (
        <OpponentCardEquipped id={id} data={data} onComplete={onComplete} />
      )}
    </div>
  );
}
