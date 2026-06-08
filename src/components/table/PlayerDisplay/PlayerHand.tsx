import { useState } from "react";
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import CardInHand from "./PlayerHand/CardInHand";
import { useDinamicSpacing } from "../../../hooks/useDinamicSpacing";
import LayoutSlots from "./PlayerHand/LayoutSlots";
import { useCardScale } from "../../../hooks/useCardScale";
import { useLocalState } from "../../../contexts/LocalStateContext";

export default function PlayerHand({ clientId }: { clientId: string }) {
  const localState = useLocalState();
  const visibleCards = localState.visibleCards.cards[clientId]?.hand ?? [];
  const pending = localState.pendingCard;

  // Parent container ref, used in dynamic margin calculation
  const { ref: containerRef, width: containerWidth } =
    useResizeObserver<HTMLDivElement>();

  const { ref: scaleRef, scale } = useCardScale();

  // Which card is user currenlty hovering over
  const [highlightedCard, setHighlightedCard] = useState<number | null>(null);

  const spacing = useDinamicSpacing(
    visibleCards,
    containerWidth,
    pending.id,
    scale,
  );

  return (
    <div ref={containerRef} className="h-full w-full relative">
      <LayoutSlots
        quantity={visibleCards ? visibleCards.length + 1 : 1}
        containerWidth={containerWidth}
      />

      <div className="h-full" ref={scaleRef}>
        {visibleCards &&
          visibleCards.map((cardId, index) => {
            return (
              <CardInHand
                key={cardId}
                cardId={cardId}
                spacing={spacing}
                index={index}
                isHighlighted={highlightedCard === index}
                onMouseMove={() => setHighlightedCard(index)}
                onMouseLeave={() => setHighlightedCard(null)}
              />
            );
          })}
      </div>
    </div>
  );
}
