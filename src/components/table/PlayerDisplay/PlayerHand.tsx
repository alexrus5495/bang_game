import { useResizeObserver } from "../../../hooks/useResizeObserver";
import CardInHand from "./PlayerHand/CardInHand";
import LayoutSlots from "./PlayerHand/LayoutSlots";
import { useCardScale } from "../../../hooks/useCardScale";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useShallow } from "zustand/shallow";
import HandZeroAnchor from "./PlayerHand/HandZeroAnchor";
import { useDinamicHandSpacing } from "../../../hooks/useDinamicHandSpacing";

export default function PlayerHand({ clientId }: { clientId: string }) {
  const cards = useLocalStateStore(
    useShallow(
      (state) => state.playersController.getPlayerById(clientId)?.hand ?? [],
    ),
  );

  // Parent container ref, used in dynamic margin calculation
  const { ref: containerRef, width: containerWidth } =
    useResizeObserver<HTMLDivElement>();

  const { ref: scaleRef, scale } = useCardScale();

  const spacing = useDinamicHandSpacing(cards, containerWidth, scale);

  return (
    <div ref={containerRef} className="h-full w-full relative">
      <LayoutSlots
        quantity={cards ? cards.length + 1 : 1}
        containerWidth={containerWidth}
        anchorType={"player-hand-slot"}
      />

      <div className="h-full w-full" ref={scaleRef}>
        <HandZeroAnchor />
      </div>

      <div className="fixed top-0 left-0 h-[100vh] w-[100vw] z-[-0] pointer-events-none">
        {cards &&
          cards.map((cardId, index) => {
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
