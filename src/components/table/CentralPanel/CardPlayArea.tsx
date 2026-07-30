import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import CardPlayAreaAuraEffect from "../../../shaders/cardPlayingAreaAuraEffect";
import useAnimateColor from "../../../hooks/useAnimateColor";
import {
  useGameFlowPhase,
  useInteractionPhase,
  useIsOverPlayArea,
  usePendingCardIndex,
  useUiController,
} from "../../../stores/hooks/localStateStore.hooks";
import React, { useCallback, useMemo } from "react";
import type { AnchorId } from "../../../contexts/AnchorsContext";
import AnimationAnchor from "../shared/AnimationAnchor";
import CardScaler from "../../cards/shared/CardScaler";
import SkeletonCard from "../../cards/SkeletonCard";
import CardsOnTheTable from "./CardsOnTheTable";

const CardPlayArea = React.memo(() => {
  const { color, animatedColor, onMouseLeave, onMouseEnter, isShown } =
    useCardPlayAreaHighlight();

  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <CardPlayAreaAnchor />

      <div
        className="w-full h-full border border-[var(--WHITE)] mask-weathered_2 flex justify-center items-center"
        style={{
          borderWidth: sizeAdaptive(200),
          borderRadius: sizeAdaptive(70),
          borderColor: animatedColor,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          className="w-full h-auto text-[var(--WHITE)] text-center rotate-340 mask-weathered_3"
          style={{
            fontSize: sizeAdaptive(10),
            color: animatedColor,
          }}
        >
          BANG!
        </div>
      </div>

      <CardPlayAreaAuraEffect color={color} isShown={isShown} />

      <CardsOnTheTable />
    </div>
  );
});

export default CardPlayArea;

const useCardPlayAreaHighlight = () => {
  const isOverPlayArea = useIsOverPlayArea();
  const interactionPhase = useInteractionPhase();
  const pendingCardIndex = usePendingCardIndex();
  const uiController = useUiController();
  const gameFlowPhase = useGameFlowPhase();

  const isShown =
    (gameFlowPhase === "CLIENT_TURN" || gameFlowPhase === "CLIENT_REACTION") &&
    (interactionPhase === "AWAITING_ACTION" ||
      interactionPhase === "DRAGGING" ||
      interactionPhase === "AWAITING_TARGET");

  const isHighlighted =
    (interactionPhase === "DRAGGING" && isOverPlayArea) ||
    (interactionPhase === "WAITING_FOR_SERVER" && pendingCardIndex !== null) ||
    interactionPhase === "AWAITING_TARGET";

  const color = isHighlighted ? "#ffdd22" : "#f3efe3";
  const animatedColor = useAnimateColor(color, 0.5);

  const onMouseEnter = useCallback(() => {
    uiController.setIsOverPlayArea(true);
  }, [uiController]);

  const onMouseLeave = useCallback(() => {
    uiController.setIsOverPlayArea(false);
  }, [uiController]);

  return useMemo(
    () => ({
      color,
      isShown,
      animatedColor,
      onMouseEnter,
      onMouseLeave,
    }),
    [color, animatedColor, onMouseLeave, onMouseEnter, isShown],
  );
};

function CardPlayAreaAnchor() {
  const anchorId: AnchorId = { type: "play-area" };

  return (
    <div className="h-full w-full absolute flex justify-center items-center opacity-0 pointer-events-none">
      <CardScaler>
        <AnimationAnchor id={anchorId} className="h-full w-full absolute " />
        <SkeletonCard />
      </CardScaler>
    </div>
  );
}
