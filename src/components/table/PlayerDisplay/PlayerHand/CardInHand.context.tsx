import { createContext, useContext, useMemo, type ReactNode } from "react";
import { MotionValue } from "motion/react";
import {
  useCardDrag,
  useCardHighlight,
  useIsCardPlayable,
  use3dTilt,
  type CardPositionData,
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
    x: MotionValue;
    y: MotionValue;
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

  const { isDragging, dragX, dragY, onDragStart, onDragEnd, isDragged } =
    useCardDrag(index);
  const { isHighlighted, onMouseEnter, onMouseLeave } = useCardHighlight(index);
  const { rotateX, rotateY } = use3dTilt(isDragging, dragX, dragY);

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
        isOverPlayArea,
        x: dragX,
        y: dragY,
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
    ],
  );

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
