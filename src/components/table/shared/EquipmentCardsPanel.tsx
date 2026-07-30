import { getSizeAdaptivePx, sizeAdaptive } from "../../../lib/css/cssFunctions";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import React, { useMemo } from "react";
import LayoutSlots from "../PlayerDisplay/PlayerHand/LayoutSlots";
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import { socket } from "../../../lib/socket";
import type { AnchorId } from "../../../contexts/AnchorsContext";
import AnimationAnchor from "./AnimationAnchor";
import SkeletonCard from "../../cards/SkeletonCard";
import { useCardScale } from "../../../hooks/useCardScale";
import { useDinamicHandSpacing } from "../../../hooks/useDinamicHandSpacing";
import EquippedCard from "./EquippedCard";

const EquipmentCardsPanel = React.memo(({ playerId }: { playerId: string }) => {
  const isClient = playerId === socket.id;
  const equippedCards = useStore(
    useLocalStateStore,
    useShallow(
      (state) =>
        state.playersController.getPlayerById(playerId)?.equipment ?? [],
    ),
  );

  const { ref: scaleRef, scale } = useCardScale();

  const { ref: containerRef, width: containerWidth } =
    useResizeObserver<HTMLDivElement>();

  const spacing = useDinamicHandSpacing(equippedCards, containerWidth, scale);

  if (!equippedCards) return null;

  return (
    <div
      ref={containerRef}
      className="w-[90%] relative"
      style={{
        height: isClient ? "120%" : "110%",
        marginTop: isClient ? `-${getSizeAdaptivePx(50)}px` : sizeAdaptive(40),
      }}
    >
      <LayoutSlots
        quantity={equippedCards ? equippedCards.length + 1 : 1}
        containerWidth={containerWidth}
        anchorType={"equipment-slot"}
        playerId={playerId}
      />

      <div className="h-full w-full" ref={scaleRef}>
        <EquipmentZeroAnchor playerId={playerId} />
      </div>

      <div className="fixed top-0 left-0 h-[100vh] w-[100vw] z-[-0] pointer-events-none">
        {equippedCards.map((cardId, index) => {
          return (
            <EquippedCard
              key={cardId}
              cardId={cardId}
              index={index}
              spacing={spacing}
              playerId={playerId}
            />
          );
        })}
      </div>
    </div>
  );
});

export default EquipmentCardsPanel;

function EquipmentZeroAnchor({ playerId }: { playerId: string }) {
  const anchorId: AnchorId = useMemo(
    () => ({
      type: "equipment-zero",
      playerId,
    }),
    [playerId],
  );

  return (
    <div className="w-auto h-full absolute z-0 pointer-events-none">
      <div
        className="w-auto h-full absolute"
        // react-doctor-disable-next-line no-array-index-as-key
        style={{ opacity: 0 }}
      >
        <AnimationAnchor id={anchorId} className="w-full h-full absolute" />
        <SkeletonCard />;
      </div>
    </div>
  );
}
