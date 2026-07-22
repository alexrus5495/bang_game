import { useAnchors } from "../../../../contexts/AnchorsContext";
import { useHandValidation } from "../../../../hooks/useHandValidation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { MotionValue, useAnimationFrame, useMotionValue } from "motion/react";
import {
  useHighlightedCardIndex,
  useInteractionPhase,
  useIsCurrentPlayer,
  useIsDragged,
  useIsDragging,
  useIsOverPlayArea,
  useIsPending,
  useUiController,
} from "../../../../stores/hooks/localStateStore.hooks";
import { animate } from "motion";

export type CardPositionData = null | {
  top: number;
  translateX: number;
  zIndex: number;
  left: number;
  height: number;
  scale: number;
};

const DRAG_TRANSITION_TYPE = "spring";
const DRAG_TRANSITION_STIFFNESS = 400;
const DRAG_TRANSITION_DAMPING = 24;

const SHIFT_OFFSET = 50;
const NEGATIVE_SHIFT_OFFSET = -50;

export function useCardPosition(data: { spacing: number; index: number }) {
  const anchor = useAnchors();
  const zeroAnchor = anchor.getRect({ type: "player-hand-zero" });

  const isCurrent = useIsCurrentPlayer();
  const isPending = useIsPending(data.index);
  const isCardPlayable = useIsCardPlayable(data.index);
  const highlightedCardIndex = useHighlightedCardIndex();

  const isHighlighted = highlightedCardIndex === data.index;

  const getTop = useCallback((): number => {
    if (!zeroAnchor) return 0;
    let currentTop = zeroAnchor.top;

    if (!isCardPlayable && isCurrent) {
      currentTop += zeroAnchor.height * 0.1;
    }

    if (isHighlighted || isPending) {
      currentTop -= zeroAnchor.height * 0.15;
    }

    return currentTop;
  }, [isCardPlayable, isHighlighted, zeroAnchor, isCurrent, isPending]);

  const getTranslateX = useCallback((): number => {
    // 1. If no focus or it's on this card - no shift
    if (highlightedCardIndex === null || highlightedCardIndex === data.index) {
      return 0;
    }

    // 2. If focus to the left - shift right
    if (highlightedCardIndex < data.index) {
      return SHIFT_OFFSET;
    }

    // 3. If focus to the right - shift left
    return NEGATIVE_SHIFT_OFFSET;
  }, [highlightedCardIndex, data.index]);

  const position = useMemo((): CardPositionData => {
    if (!zeroAnchor) return null;
    const currentZIndex = isHighlighted ? 100 : 20 + data.index;
    const currentLeft = zeroAnchor.left + data.spacing * data.index;
    const currentHeight = zeroAnchor.height;
    const currentScale = isHighlighted ? 1.2 : 1;
    return {
      top: getTop(),
      translateX: getTranslateX(),
      zIndex: currentZIndex,
      left: currentLeft,
      height: currentHeight,
      scale: currentScale,
    };
  }, [
    data.index,
    data.spacing,
    getTranslateX,
    getTop,
    isHighlighted,
    zeroAnchor,
  ]);

  return position;
}

export function useIsCardPlayable(index: number) {
  const handValidationData = useHandValidation();

  const isCardPlayable = handValidationData
    ? handValidationData[index].canPlay
    : false;

  return isCardPlayable;
}

export function useCardDrag(index: number) {
  const isDragging = useIsDragging();
  const isDragged = useIsDragged(index);
  const isCurrent = useIsCurrentPlayer();
  const isCardPlayable = useIsCardPlayable(index);
  const interactionPhase = useInteractionPhase();
  const isOverPlayArea = useIsOverPlayArea();
  const uiController = useUiController();

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const onDragStart = useCallback(() => {
    uiController.startDrag(index);
  }, [index, uiController]);

  const onDragEnd = useCallback(() => {
    uiController.endDrag();
  }, [uiController]);

  useManualSnapToOrigin(dragX, dragY);

  const shouldSnapToOrigin =
    interactionPhase === "AWAITING_ACTION" ||
    (interactionPhase === "DRAGGING" && !isOverPlayArea);

  const shouldDrag =
    isCurrent &&
    isCardPlayable &&
    (interactionPhase === "DRAGGING" || interactionPhase === "AWAITING_ACTION");

  return {
    isDragging,
    isDragged,
    dragX,
    dragY,
    shouldSnapToOrigin,
    shouldDrag,
    stiffness: DRAG_TRANSITION_STIFFNESS,
    damping: DRAG_TRANSITION_DAMPING,
    onDragStart,
    onDragEnd,
  };
}

function useManualSnapToOrigin(dragX: MotionValue, dragY: MotionValue) {
  const interactionPhase = useInteractionPhase();
  // Manual snapback to hand after server rejected cardPlay, or player cancelled
  // an attempt during target selection.
  const prevPhaseRef = useRef(interactionPhase);
  useEffect(() => {
    const prevPhase = prevPhaseRef.current;
    const hasOffset = dragX.get() !== 0 || dragY.get() !== 0;
    if (!hasOffset) return;

    const isResetting =
      interactionPhase === "AWAITING_ACTION" &&
      (prevPhase === "WAITING_FOR_SERVER" || prevPhase === "AWAITING_TARGET");

    if (isResetting && hasOffset) {
      animate(dragX, 0, {
        type: DRAG_TRANSITION_TYPE,
        stiffness: DRAG_TRANSITION_STIFFNESS,
        damping: DRAG_TRANSITION_DAMPING,
      });
      animate(dragY, 0, {
        type: DRAG_TRANSITION_TYPE,
        stiffness: DRAG_TRANSITION_STIFFNESS,
        damping: DRAG_TRANSITION_DAMPING,
      });
    }
    prevPhaseRef.current = interactionPhase;
  }, [interactionPhase, dragX, dragY]);
}

export function useCardHighlight(index: number) {
  const uiController = useUiController();
  const interactionPhase = useInteractionPhase();
  const isDragging = useIsDragging();
  const highlightedCardIndex = useHighlightedCardIndex();
  const isHighlighted = highlightedCardIndex === index;

  const shouldHighlight = useMemo(
    () => !isDragging && interactionPhase === "AWAITING_ACTION",
    [interactionPhase, isDragging],
  );

  const onMouseEnter = useCallback(() => {
    if (!shouldHighlight) return;
    uiController.setHighlightedCardIndex(index);
  }, [index, uiController, shouldHighlight]);

  const onMouseLeave = useCallback(() => {
    uiController.setHighlightedCardIndex(null);
  }, [uiController]);

  return { highlightedCardIndex, isHighlighted, onMouseEnter, onMouseLeave };
}

export function use3dTilt(
  isDragging: boolean,
  dragX: MotionValue,
  dragY: MotionValue,
) {
  // Motion values to store tilt angles
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Reft to store previous values, used to calculate drag speed
  const prevX = useRef(0);
  const prevY = useRef(0);

  // Calculate drag speed on each frame and translate it into tilt angle
  useAnimationFrame(() => {
    if (!isDragging) {
      // If stopped moving smoothly reset tilt angles
      rotateX.set(rotateX.get() * 0.85);
      rotateY.set(rotateY.get() * 0.85);
      return;
    }

    const currentX = dragX.get();
    const currentY = dragY.get();

    // Velocity is a difference between current frame and previous frame
    const velocityX = currentX - prevX.current;
    const velocityY = currentY - prevY.current;

    // Clamp tilt angles between -15deg and 15deg
    // Horisontal speed rotate the card on Y axis, vertical speed - on X axis
    const targetRotateY = Math.min(Math.max(velocityX * 0.4, -15), 15);
    const targetRotateX = Math.min(Math.max(-velocityY * 0.4, -15), 15);

    // Linear interpolation to smooth out the rotation
    rotateX.set(rotateX.get() + (targetRotateX - rotateX.get()) * 0.2);
    rotateY.set(rotateY.get() + (targetRotateY - rotateY.get()) * 0.2);

    // Store current coordinates to use in the next frame
    prevX.current = currentX;
    prevY.current = currentY;
  });

  return { rotateX, rotateY };
}

export function useCardAuraEffect(index: number) {
  // Colors for card's aura effect
  const AURA_AVAILABLE = "#09e510";
  const AURA_ACTIVE = "#a9b0fc";

  const interactionPhase = useInteractionPhase();
  const isPending = useIsPending(index);
  const isCardPlayable = useIsCardPlayable(index);

  const color = isPending ? AURA_ACTIVE : AURA_AVAILABLE;
  const isVisible =
    isCardPlayable &&
    (interactionPhase === "AWAITING_ACTION" || interactionPhase === "DRAGGING");

  return { color, isVisible };
}
