import { useMemo } from "react";
import type { AnchorId } from "../../../contexts/AnchorsContext";
import { getCardTableTransform } from "../../../lib/utils/getCardTableTransform";
import { useCardsOnTheTable } from "../../../stores/hooks/localStateStore.hooks";
import PlayingCard from "../../cards/PlayingCard";
import AnimationAnchor from "../shared/AnimationAnchor";

export default function CardsOnTheTable() {
  const cardsOnTheTable = useCardsOnTheTable();
  return (
    <div className="h-full w-full absolute flex justify-center items-center pointer-events-none">
      {cardsOnTheTable.map((card, index) => (
        <CardOnTheTable card={card} index={index} key={card.id} />
      ))}
    </div>
  );
}

function CardOnTheTable({
  card,
  index,
}: {
  card: { id: string; eventId: number };
  index: number;
}) {
  const { offsetX, offsetY, rotation } = getCardTableTransform(
    card.id,
    card.eventId,
  );
  const anchorId: AnchorId = useMemo(
    () => ({ type: "player-hand-card", index }),
    [index],
  );

  return (
    <div
      className="absolute h-full"
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`,
        zIndex: index,
      }}
    >
      <AnimationAnchor id={anchorId} className="w-full h-full absolute" />
      <PlayingCard cardId={card.id} initialIsFaceDown={false} />
    </div>
  );
}
