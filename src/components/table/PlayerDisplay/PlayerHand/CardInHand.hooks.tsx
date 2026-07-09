import { useShallow } from "zustand/shallow";
import { useAnchors } from "../../../../contexts/AnchorsContext";
import { useHandValidation } from "../../../../hooks/useHandValidation";
import { useDragDropStore } from "../../../../stores/dragDropStore";
import { useCallback, useMemo, useRef } from "react";
import { useAnimationFrame, useMotionValue } from "motion/react";

export function useCardPosition(data: {
  spacing: number;
  index: number;
  highlightedCardIndex: number | null;
  isCardPlayable: boolean;
}) {
  const SHIFT_OFFSET = 70;
  const NEGATIVE_SHIFT_OFFSET = -70;

  const isHighlighted = data.highlightedCardIndex === data.index;
  const anchor = useAnchors();
  const zeroAnchor = anchor.getRect({ type: "player-hand-zero" });

  const getTop = useCallback((): number => {
    if (!zeroAnchor) return 0;
    let currentTop = zeroAnchor.top;

    if (!data.isCardPlayable) {
      currentTop += zeroAnchor.height * 0.1;
    }

    if (isHighlighted) {
      currentTop -= zeroAnchor.height * 0.15;
    }

    return currentTop;
  }, [data.isCardPlayable, isHighlighted, zeroAnchor]);

  const getTranslateX = useCallback((): string | number => {
    // 1. If no focus or it's on this card - no shift
    if (
      data.highlightedCardIndex === null ||
      data.highlightedCardIndex === data.index
    ) {
      return 0;
    }

    // 2. If focus to the left - shift right
    if (data.highlightedCardIndex < data.index) {
      return SHIFT_OFFSET;
    }

    // 3. If focus to the right - shift left
    return NEGATIVE_SHIFT_OFFSET;
  }, [data.highlightedCardIndex, data.index, NEGATIVE_SHIFT_OFFSET]);

  const position = useMemo(() => {
    if (!zeroAnchor) return null;
    const currentZIndex = isHighlighted ? 100 : 20 + data.index;
    const currentLeft = `${zeroAnchor.left + data.spacing * data.index}px`;
    const currentHeight = `${zeroAnchor.height}px`;
    const currentScale = isHighlighted ? 1.2 : 1;
    return {
      currentTop: getTop(),
      currentTranslateX: getTranslateX(),
      currentZIndex,
      currentLeft,
      currentHeight,
      currentScale,
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

export function useCardHighlight(index: number) {
  const { highlightedCardIndex, setHighlightedCardIndex } = useDragDropStore(
    useShallow((state) => ({
      highlightedCardIndex: state.highlightedCardIndex,
      setHighlightedCardIndex: state.setHighlightedCardIndex,
    })),
  );

  const isHighlighted = highlightedCardIndex === index;

  const onMouseEnter = useCallback(() => {
    setHighlightedCardIndex(index);
  }, [index, setHighlightedCardIndex]);

  const onMouseLeave = useCallback(() => {
    setHighlightedCardIndex(null);
  }, [setHighlightedCardIndex]);

  return { highlightedCardIndex, isHighlighted, onMouseEnter, onMouseLeave };
}

export function use3dTilt(isDragging: boolean) {
  // 1. Создаем MotionValues для отслеживания физических координат драга
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // 2. Создаем MotionValues для углов наклона
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Рефы для хранения предыдущих значений, чтобы считать скорость
  const prevX = useRef(0);
  const prevY = useRef(0);

  // 3. Каждый кадр анимации считаем скорость движения и переводим её в наклон
  useAnimationFrame(() => {
    if (!isDragging) {
      // Если не тащим, плавно возвращаем наклон в ноль
      rotateX.set(rotateX.get() * 0.85);
      rotateY.set(rotateY.get() * 0.85);
      return;
    }

    const currentX = dragX.get();
    const currentY = dragY.get();

    // Скорость — это разница между текущим и прошлым кадром
    const velocityX = currentX - prevX.current;
    const velocityY = currentY - prevY.current;

    // Ограничиваем максимальный угол наклона (например, в пределах -15 до 15 градусов)
    // Движение по оси X наклоняет карту по вертикальной оси (rotateY)
    // Движение по оси Y наклоняет карту по горизонтальной оси (rotateX)
    const targetRotateY = Math.min(Math.max(velocityX * 0.4, -15), 15);
    const targetRotateX = Math.min(Math.max(-velocityY * 0.4, -15), 15);

    // Применяем небольшое сглаживание (линейную интерполяцию), чтобы наклон не был дерганым
    rotateX.set(rotateX.get() + (targetRotateX - rotateX.get()) * 0.2);
    rotateY.set(rotateY.get() + (targetRotateY - rotateY.get()) * 0.2);

    // Запоминаем текущие координаты для следующего кадра
    prevX.current = currentX;
    prevY.current = currentY;
  });

  return { rotateX, rotateY, dragX, dragY };
}
