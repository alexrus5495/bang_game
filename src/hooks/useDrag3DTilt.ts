import { useMotionValue, type PanInfo } from "framer-motion";
import { useCallback } from "react";

export function useDrag3DTilt() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const updateTilt = useCallback(
    (info: PanInfo) => {
      // Scales pixel/sec velocity to reasonable rotation degrees (max 15 deg)
      rotateY.set(Math.max(-15, Math.min(15, info.velocity.x / 200)));
      rotateX.set(Math.max(-15, Math.min(15, -info.velocity.y / 200)));
    },
    [rotateX, rotateY],
  );

  const resetTilt = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { rotateX, rotateY, updateTilt, resetTilt };
}
