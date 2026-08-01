import { m } from "motion/react";
import type { ReactNode } from "react";

export default function FloatUpContainer({
  left,
  top,
  travelDistance,
  children,
  onComplete,
}: {
  left: number;
  top: number;
  travelDistance: number;
  children: ReactNode;
  onComplete: () => void;
}) {
  return (
    <m.div
      className="fixed z-50 flex items-center gap-1.5 pointer-events-none select-none"
      style={{
        left: left,
        top: top,
      }}
      initial={{
        x: "-50%",
        y: "-50%",
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        x: "-50%",
        y: [
          "calc(-50% - 0px)",
          `calc(-50% - ${travelDistance * 0.9}px)`,
          `calc(-50% - ${travelDistance}px)`,
        ],
        opacity: [0.2, 1, 0],
        scale: [0.5, 1, 0.7],
      }}
      transition={{
        duration: 1.5,
        ease: "easeOut",
        times: [0, 0.9, 1],
      }}
      onAnimationComplete={onComplete}
    >
      {children}
    </m.div>
  );
}
