import { useAnchors } from "../../../../contexts/AnchorsContext";
import { useHandValidation } from "../../../../hooks/useHandValidation";
import { useCallback, useMemo, useRef } from "react";
import { MotionValue, useAnimationFrame, useMotionValue } from "motion/react";
import {
  useHighlightedCardIndex,
  useIsCurrentPlayer,
  useIsDragged,
  useIsDragging,
  useUiController,
} from "../../../../stores/hooks/localStateStore.hooks";

export type CardPositionData = null | {
  top: number;
  translateX: number;
  zIndex: number;
  left: number;
  height: number;
  scale: number;
};

export function useCardPosition(data: { spacing: number; index: number }) {
  const SHIFT_OFFSET = 50;
  const NEGATIVE_SHIFT_OFFSET = -50;

  const highlightedCardIndex = useHighlightedCardIndex();
  const isCardPlayable = useIsCardPlayable(data.index);
  const isHighlighted = highlightedCardIndex === data.index;
  const anchor = useAnchors();
  const zeroAnchor = anchor.getRect({ type: "player-hand-zero" });
  const isCurrent = useIsCurrentPlayer();
  const isDragged = useIsDragged(data.index);

  const getTop = useCallback((): number => {
    if (!zeroAnchor) return 0;
    let currentTop = zeroAnchor.top;

    if (!isCardPlayable && isCurrent) {
      currentTop += zeroAnchor.height * 0.1;
    }

    if (isHighlighted || isDragged) {
      currentTop -= zeroAnchor.height * 0.15;
    }

    return currentTop;
  }, [isCardPlayable, isHighlighted, zeroAnchor, isCurrent, isDragged]);

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
  }, [highlightedCardIndex, data.index, NEGATIVE_SHIFT_OFFSET]);

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
  const uiController = useUiController();

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const onDragStart = useCallback(() => {
    uiController.startDrag(index);
  }, [index, uiController]);

  const onDragEnd = useCallback(() => {
    uiController.endDrag();
  }, [uiController]);

  return {
    isDragging,
    isDragged,
    dragX,
    dragY,
    onDragStart,
    onDragEnd,
  };
}

export function useCardHighlight(index: number) {
  const uiController = useUiController();
  const isDragging = useIsDragging();
  const highlightedCardIndex = useHighlightedCardIndex();
  const isHighlighted = highlightedCardIndex === index;

  const onMouseEnter = useCallback(() => {
    if (isDragging) return;
    uiController.setHighlightedCardIndex(index);
  }, [index, uiController, isDragging]);

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
