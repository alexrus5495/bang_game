import { useResizeObserver } from "../../../hooks/useResizeObserver";
import CardInHand from "./PlayerHand/CardInHand";
import { useDinamicSpacing } from "../../../hooks/useDinamicSpacing";
import LayoutSlots from "./PlayerHand/LayoutSlots";
import { useCardScale } from "../../../hooks/useCardScale";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useShallow } from "zustand/shallow";
import { useStore } from "zustand";

export default function PlayerHand({ clientId }: { clientId: string }) {
  const pending = useLocalStateStore((state) => state.pendingCardId);
  const cards = useStore(
    useLocalStateStore,
    useShallow(
      (state) => state.playersController.getPlayerById(clientId)?.hand ?? [],
    ),
  );

  // Parent container ref, used in dynamic margin calculation
  const { ref: containerRef, width: containerWidth } =
    useResizeObserver<HTMLDivElement>();

  const { ref: scaleRef, scale } = useCardScale();

  const spacing = useDinamicSpacing(cards, containerWidth, pending, scale);

  return (
    <div ref={containerRef} className="h-full w-full relative">
      <LayoutSlots
        quantity={cards ? cards.length + 1 : 1}
        containerWidth={containerWidth}
      />

      <div className="h-full" ref={scaleRef}>
        {cards &&
          cards.map((cardId, index) => {
            if (index >= 1) return null;
            return (
              <CardInHand
                key={cardId}
                clientId={clientId}
                cardId={cardId}
                spacing={spacing}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
}
