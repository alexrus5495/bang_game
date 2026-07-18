import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import CardPlayingAreaAuraEffect from "../../../shaders/cardPlayingAreaAuraEffect";
import useAnimateColor from "../../../hooks/useAnimateColor";
import {
  useIsDragging,
  useIsOverPlayArea,
  useUiController,
} from "../../../stores/hooks/localStateStore.hooks";
import React, { useCallback, useMemo } from "react";

const CardPlayingArea = React.memo(() => {
  const { color, animatedColor, onMouseLeave, onMouseEnter } =
    useCardPlayAreaHighlight();

  return (
    <div className="w-full h-full relative flex justify-center items-center">
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

      <CardPlayingAreaAuraEffect color={color} />
    </div>
  );
});

export default CardPlayingArea;

const useCardPlayAreaHighlight = () => {
  const isOverPlayArea = useIsOverPlayArea();
  const uiController = useUiController();
  const isDragging = useIsDragging();

  const isHighlighted = isDragging && isOverPlayArea;

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
      animatedColor,
      onMouseEnter,
      onMouseLeave,
    }),
    [color, animatedColor, onMouseLeave, onMouseEnter],
  );
};
