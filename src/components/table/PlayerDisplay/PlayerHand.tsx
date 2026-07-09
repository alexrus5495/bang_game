import { useResizeObserver } from "../../../hooks/useResizeObserver";
import CardInHand from "./PlayerHand/CardInHand";
import { useDinamicSpacing } from "../../../hooks/useDinamicSpacing";
import LayoutSlots from "./PlayerHand/LayoutSlots";
import { useCardScale } from "../../../hooks/useCardScale";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useShallow } from "zustand/shallow";
import HandZeroAnchor from "./PlayerHand/HandZeroAnchor";

export default function PlayerHand({ clientId }: { clientId: string }) {
  const pending = useLocalStateStore((state) => state.pendingCardId);
  const cards = useLocalStateStore(
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

      <div className="h-full w-full" ref={scaleRef}>
        <HandZeroAnchor />
      </div>

      <div className="fixed top-0 left-0 h-[100vh] w-[100vw] z-[-0] pointer-events-none">
        {cards &&
          cards.map((cardId, index) => {
            {
              {
                /* if (index >= 1) return null; */
              }
            }
            return (
              <CardInHand
                key={cardId}
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
