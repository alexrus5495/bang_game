import { useEffect, useState } from "react";
import type { TooltipMessage } from "../types";

export function useTooltip() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPinned) setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsPinned(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsVisible(false);
        setIsPinned(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const hasCardRef = (content: TooltipMessage[]) => {
    if (!content) return false;
    for (const message of content) {
      for (const part of message) {
        if (part.type !== "plainText") return true;
      }
    }
    return false;
  };

  return {
    position,
    isVisible: isVisible,
    isPinned,
    handlersPinable: {
      onMouseEnter: () => {
        if (!isPinned) setIsVisible(true);
      },
      onMouseLeave: () => {
        if (!isPinned) setIsVisible(false);
      },
      onMouseMove: handleMouseMove,
    },
    handlersNonPinable: {
      onMouseEnter: () => setIsVisible(true),
      onMouseLeave: () => setIsVisible(false),
      onMouseMove: handleMouseMove,
    },
    hasCardRef,
  };
}
