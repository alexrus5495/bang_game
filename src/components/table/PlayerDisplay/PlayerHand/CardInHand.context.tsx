import { createContext, useContext, useMemo, type ReactNode } from "react";
import { MotionValue } from "motion/react";
import {
  useCardDrag,
  useCardHighlight,
  useIsCardPlayable,
  use3dTilt,
  type CardPositionData,
  useCardAuraEffect,
} from "./CardInHand.hooks";
import type { AnchorId } from "../../../../contexts/AnchorsContext";
import {
  useIsCurrentPlayer,
  useIsOverPlayArea,
} from "../../../../stores/hooks/localStateStore.hooks";

type CardContextProviderProps = {
  cardId: string;
  index: number;
  spacing: number;
  children: ReactNode;
  position: Exclude<CardPositionData, null>;
};

interface CardContextValue {
  card: {
    id: string;
    index: number;
    isPlayable: boolean;
  };

  drag: {
    isDragged: boolean;
    isDragging: boolean;
    isOverPlayArea: boolean;
    shouldSnapToOrigin: boolean;
    shouldDrag: boolean;
    stiffness: number;
    damping: number;
    x: MotionValue;
    y: MotionValue;
  };

  aura: {
    color: string;
    isVisible: boolean;
  };

  misc: {
    isCurrent: boolean;
    anchorId: AnchorId;
  };

  highlight: {
    isHighlighted: boolean;
  };

  handlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onDragStart: (index: number) => void;
    onDragEnd: () => void;
  };

  position: Exclude<CardPositionData, null> & {
    rotateY: MotionValue;
    rotateX: MotionValue;
  };
}

const CardContext = createContext<CardContextValue | null>(null);

export const useCardInHandContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error(
      "useCardInHandContext must be used within CardInHandProvider",
    );
  }
  return context;
};

export const CardInHandProvider = ({
  cardId,
  index,
  children,
  position,
}: CardContextProviderProps) => {
  const isCurrent = useIsCurrentPlayer();
  const isOverPlayArea = useIsOverPlayArea();
  const isCardPlayable = useIsCardPlayable(index);

  const {
    isDragging,
    dragX,
    dragY,
    onDragStart,
    onDragEnd,
    stiffness,
    damping,
    isDragged,
    shouldSnapToOrigin,
    shouldDrag,
  } = useCardDrag(index);
  const { isHighlighted, onMouseEnter, onMouseLeave } = useCardHighlight(index);
  const { rotateX, rotateY } = use3dTilt(isDragging, dragX, dragY);
  const aura = useCardAuraEffect(index);

  const anchorId: AnchorId = useMemo(
    () => ({ type: "player-hand-card", index }),
    [index],
  );

  const value = useMemo<CardContextValue>(
    () => ({
      card: {
        id: cardId,
        index,
        isPlayable: isCardPlayable,
      },
      drag: {
        isDragging,
        isDragged,
        shouldSnapToOrigin,
        shouldDrag,
        stiffness,
        damping,
        isOverPlayArea,
        x: dragX,
        y: dragY,
      },
      aura: {
        color: aura.color,
        isVisible: aura.isVisible,
      },
      highlight: {
        isHighlighted,
      },
      misc: {
        isCurrent,
        anchorId,
      },
      position: {
        ...position,
        rotateY,
        rotateX,
      },
      handlers: {
        onMouseEnter,
        onMouseLeave,
        onDragStart,
        onDragEnd,
      },
    }),
    [
      cardId,
      index,
      isCardPlayable,
      isDragging,
      isDragged,
      isOverPlayArea,
      dragX,
      dragY,
      isHighlighted,
      isCurrent,
      anchorId,
      position,
      rotateY,
      rotateX,
      onMouseEnter,
      onMouseLeave,
      onDragStart,
      onDragEnd,
      aura.color,
      aura.isVisible,
      shouldDrag,
      shouldSnapToOrigin,
      stiffness,
      damping,
    ],
  );

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
