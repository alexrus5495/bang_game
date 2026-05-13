import { motion } from "motion/react";
import { useSocket } from "../hooks/useSocket";
import type { MessageTemplate } from "../types";
import PlayingCard from "../components/cards/PlayingCard";
import { useAnchors } from "../contexts/AnchorsContext";
import { useVisibleCards } from "../contexts/VisibleCardsContext";

export default function PlayerCardDrawn({
  data,
  onComplete,
}: {
  data: MessageTemplate["player_card_drawn"];
  onComplete: () => void;
  animationId: string;
}) {
  const { socket } = useSocket();
  const playerIsClient = data.player.id === socket.id;

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

function OpponentCardDrawn({
  data,
  onComplete,
}: {
  data: MessageTemplate["player_card_drawn"];
  onComplete: () => void;
}) {
  const anchors = useAnchors();
  const from = anchors.getRect({ type: "deck" });
  const to = anchors.getRect({
    type: "opponent-hand",
    playerId: data.player.id,
  });

  if (!from || !to) return null;

  return (
    <motion.div
      className=""
      initial={{ x: from.x, y: from.y, height: from.height }}
      animate={{ x: to.x, y: to.y, height: to.height }}
      transition={{ duration: 0.2 }}
      onAnimationComplete={onComplete}
    >
      <PlayingCard cardId={null} initialIsFaceDown={true} />
    </motion.div>
  );
}

function ClientCardDrawn({
  data,
  onComplete,
}: {
  data: MessageTemplate["player_card_drawn"];
  onComplete: () => void;
}) {
  const { addToHand } = useVisibleCards();
  const anchors = useAnchors();
  const from = anchors.getRect({ type: "deck" });
  const to = anchors.getRect({
    type: "player-hand-slot",
    index: data.card.index,
  });

  const onCompleteExtended = () => {
    setTimeout(() => addToHand(data.player.id, data.card.id as string), 0);
    setTimeout(() => onComplete(), 0);
  };

  if (!from || !to) return null;

  return (
    <motion.div
      className="z-0"
      initial={{ x: from.x, y: from.y, height: from.height }}
      animate={{ x: to.x, y: to.y, height: to.height }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onAnimationComplete={onCompleteExtended}
    >
      <PlayingCard
        cardId={data.card.id}
        initialIsFaceDown={true}
        flipDelay={100}
      />
    </motion.div>
  );
}
