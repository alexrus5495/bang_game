import { useCallback, useEffect, useMemo, useState } from "react";
import type { TooltipMessage } from "../types";

export function useTooltip() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPinned) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    },
    [isPinned],
  );

  useEffect(() => {
    if (!isVisible) return;

    const handleMouseDown = () => {
      setIsPinned(true);
    };

    const handleMouseUp = () => {
      setIsVisible(false);
      setIsPinned(false);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isVisible]);

  const hasCardRef = useCallback((content: TooltipMessage[]) => {
    if (!content) return false;
    for (const message of content) {
      for (const part of message) {
        if (part.type !== "plainText") return true;
      }
    }
    return false;
  }, []);

  const handlersPinable = useMemo(
    () => ({
      onMouseEnter: () => {
        if (!isPinned) setIsVisible(true);
      },
      onMouseLeave: () => {
        if (!isPinned) setIsVisible(false);
      },
      onMouseMove: handleMouseMove,
    }),
    [isPinned, handleMouseMove],
  );

  const handlersNonPinable = useMemo(
    () => ({
      onMouseEnter: () => setIsVisible(true),
      onMouseLeave: () => setIsVisible(false),
      onMouseMove: handleMouseMove,
    }),
    [handleMouseMove],
  );

  return {
    position,
    isVisible,
    isPinned,
    handlersPinable,
    handlersNonPinable,
    hasCardRef,
  };
}
