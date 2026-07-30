import { useCallback, useMemo } from "react";
import { useAnchors } from "../../../contexts/AnchorsContext";
import { usePendingCardIndex } from "../../../stores/hooks/localStateStore.hooks";
import { getSizeAdaptivePx } from "../../../lib/css/cssFunctions";

export function useDinamicTargetSelectSpacing({
  players,
}: {
  players: string[];
}) {
  const anchors = useAnchors();
  const pendingCardIndex = usePendingCardIndex();

  const pendingCardRect =
    pendingCardIndex !== null
      ? anchors.getRect({
          type: "player-hand-card",
          index: pendingCardIndex,
        })
      : null;

  const result = useMemo(() => {
    if (!pendingCardRect) return null;

    const containerHeight = pendingCardRect.height;

    //Valid targets + cancel button
    const totalElements = players.length + 1;

    const elementHeight = getSizeAdaptivePx(15);

    const initialTotalHeight = elementHeight * totalElements;

    const deltaHeight = initialTotalHeight - containerHeight;

    if (deltaHeight <= 0) {
      const gap = containerHeight * 0.05; // отступ между кнопками, чисто пространство
      const totalRequiredHeight =
        elementHeight * totalElements + gap * (totalElements - 1);
      const margin = (containerHeight - totalRequiredHeight) / 2;

      return { gap: elementHeight + gap, margin, elementHeight };
    }

    // OffsetFactor - how much cards should overlap to fit the container
    // Evenly split the delta between gaps
    const offsetFactor = deltaHeight / (totalElements - 1);
    const gap = elementHeight - offsetFactor;
    const margin = 0;

    return { gap, margin, elementHeight };
  }, [players, pendingCardRect]);

  return result;
}

export type TargetPositionData = null | {
  top: number;
  zIndex: number;
  translateY: number;
};

export function useTargetPosition(data: {
  spacing: { gap: number; margin: number; elementHeight: number };
  index: number;
  highlightedOption: number | null;
}) {
  const pendingCardIndex = usePendingCardIndex();

  const getTranslateY = useCallback((): number => {
    const SHIFT_OFFSET_FACTOR = 0.4;

    if (
      data.highlightedOption === data.index ||
      data.highlightedOption === null ||
      data.spacing.margin > 0
    )
      return 0;

    // 2. If focus is higher - shift downwards
    if (data.highlightedOption < data.index) {
      return SHIFT_OFFSET_FACTOR * data.spacing.elementHeight;
    }

    // 3. If focus is lower - shift upwards
    return -SHIFT_OFFSET_FACTOR * data.spacing.elementHeight;
  }, [
    data.index,
    data.highlightedOption,
    data.spacing.margin,
    data.spacing.elementHeight,
  ]);

  const position = useMemo((): TargetPositionData => {
    if (pendingCardIndex === null) return null;

    const currentTop =
      data.spacing.gap < 0
        ? data.spacing.gap * data.index
        : data.spacing.gap * data.index + data.spacing.margin;

    const currentZIndex = 20 + data.index;

    const translateY = getTranslateY();

    return {
      top: currentTop,
      zIndex: currentZIndex,
      translateY,
    };
  }, [data.spacing, data.index, pendingCardIndex, getTranslateY]);

  return position;
}
