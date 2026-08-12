import { m } from "motion/react";
import type { AnchorId } from "../../../../contexts/AnchorsContext";
import CardAuraEffect from "../../../../shaders/cardAuraEffect";
import PlayingCard from "../../../cards/PlayingCard";
import SkeletonCard from "../../../cards/SkeletonCard";
import AnimationAnchor from "../../shared/AnimationAnchor";
import { StoreSlotsProvider, useStoreSlotsContext } from "./StoreSlots.context";
import { sendResolveInteraction } from "../../../../lib/utils/sendResolveInteraction";
import { socket } from "../../../../lib/socket";

export default function StoreSlots({
  playersOrder,
}: {
  playersOrder: string[];
}) {
  return (
    <StoreSlotsProvider>
      {playersOrder.map((player, index) => (
        <StoreSlot index={index} key={`${player}-${index}`} />
      ))}
    </StoreSlotsProvider>
  );
}

function StoreSlot({ index }: { index: number }) {
  const {
    checkIfHighlighted,
    getStoreCardId,
    onMouseEnter,
    onMouseLeave,
    checkIfVisible,
    isClientPicking,
  } = useStoreSlotsContext();
  const cardId = getStoreCardId(index);
  const isHighlighted = checkIfHighlighted(index);
  const isVisible = checkIfVisible(index);

  const anchorId: AnchorId = { type: "interaction-slot", index };

  const handleClick = (cardIndex: number) => {
    if (!cardId || !isClientPicking) return;
    sendResolveInteraction({
      type: "GENERAL_STORE",
      cardIndex,
      playerId: socket.id ?? "",
    });
  };

  return (
    <m.div
      className="relative h-[75%]"
      style={{
        opacity: isVisible ? 1 : 0,
        zIndex: isHighlighted ? 50 : 35,
      }}
      animate={{ scale: isHighlighted ? 1.3 : 1 }}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      onClick={() => handleClick(index)}
    >
      <AnimationAnchor id={anchorId} className="w-full h-full absolute" />
      {cardId !== null ? (
        <>
          <CardAuraEffect
            isVisible={isClientPicking}
            color={isHighlighted ? "#a9b0fc" : "#09e510"}
          />
          <PlayingCard cardId={cardId} initialIsFaceDown={false} />
        </>
      ) : (
        <SkeletonCard />
      )}
    </m.div>
  );
}
