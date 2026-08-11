import { socket } from "../../lib/socket";
import type { EventType } from "../../types";
import ClientCardUnequipped from "./CARD_UNEQUIPPED/ClientCardUnequipped";
import { OpponentCardUnequipped } from "./CARD_UNEQUIPPED/OpponentCardUnequipped";

export default function CARD_UNEQUIPPED({
  data,
  onComplete,
}: {
  data: EventType["CARD_EQUIPPED"];
  onComplete: () => void;
}) {
  const playerIsClient = data.playerId === socket.id;
  return (
    <div className="w-0 h-0 z-1000 absolute">
      {playerIsClient ? (
        <ClientCardUnequipped data={data} onComplete={onComplete} />
      ) : (
        <OpponentCardUnequipped data={data} onComplete={onComplete} />
      )}
    </div>
  );
}
