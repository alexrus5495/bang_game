import { useCallback, useEffect, useRef } from "react";
import type { DragControls } from "framer-motion";

interface OrchestrationProps {
  isDragging: boolean;
  pointerEvent: React.PointerEvent | null;
  dragControls: DragControls;
  stopDragging: () => void;
}

export function useDragOrchestration({
  isDragging,
  pointerEvent,
  dragControls,
  stopDragging,
}: OrchestrationProps) {
  const hasDragStarted = useRef(false);
  const pendingDragEvent = useRef<React.PointerEvent | null>(null);
  const motionDivRef = useRef<HTMLDivElement>(null);

  // 1. Fail-safe mechanism for unexpected mouse releases without movement
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalPointerUp = () => {
      if (!hasDragStarted.current) {
        stopDragging();
      }
    };

    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);

    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointercancel", handleGlobalPointerUp);
    };
  }, [isDragging, stopDragging]);

  // 2. Synchronize store pointer events with local layout ref
  useEffect(() => {
    if (isDragging && pointerEvent) {
      pendingDragEvent.current = pointerEvent;
    }
  }, [isDragging, pointerEvent]);

  useEffect(() => {
    if (!isDragging) {
      pendingDragEvent.current = null;
    }
  }, [isDragging]);

  // 3. Callback ref that forces framer-motion to start tracking on DOM entry
  const handleMotionDivRef = useCallback(
    (node: HTMLDivElement | null) => {
      motionDivRef.current = node;

      if (node && pendingDragEvent.current) {
        const event = pendingDragEvent.current;
        pendingDragEvent.current = null;

        // Small timeout to guarantee framer-motion initialized its internal listeners
        setTimeout(() => {
          dragControls.start(event);
        }, 0);
      }
    },
    [dragControls],
  );

  return {
    motionDivRef,
    handleMotionDivRef,
    hasDragStarted,
  };
}
