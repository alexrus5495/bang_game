import { useMemo } from "react";
import type { EventType } from "../types";
import { useAnchors } from "../contexts/AnchorsContext";
import { getImageComponent } from "../lib/images";
import FloatUpContainer from "./shared/FloatUpContainer";

export default function MASS_PLAYER_HEALED({
  data,
  onComplete,
}: {
  data: EventType["MASS_PLAYER_HEALED"];
  onComplete: () => void;
}) {
  const anchors = useAnchors();

  // 1. Get anchor / position data for every target
  const activeTargets = useMemo(() => {
    return data.targets
      .map((target) => {
        const rect = anchors.getRect({
          type: "player-portrait",
          playerId: target.playerId,
        });

        if (!rect) return null;

        const bulletHeight = rect.height * 0.5;
        const fontSize = bulletHeight * 0.75;
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const flyDistance = rect.height;

        return {
          ...target,
          bulletHeight,
          fontSize,
          centerX,
          centerY,
          flyDistance,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [data.targets, anchors]);

  // 2. Guard close in case no targets were provided
  if (activeTargets.length === 0) {
    onComplete();
    return null;
  }

  // 3. Finish animation only after each target finished animating
  let completedCount = 0;
  const handleSingleComplete = () => {
    completedCount++;
    if (completedCount >= activeTargets.length) {
      onComplete();
    }
  };

  return (
    <>
      {activeTargets.map((target) => (
        <FloatUpContainer
          key={target.playerId}
          left={target.centerX}
          top={target.centerY}
          travelDistance={target.flyDistance}
          onComplete={handleSingleComplete}
        >
          {getImageComponent("bullet_full_V", {
            draggable: false,
            style: { height: `${target.bulletHeight}px`, width: "auto" },
            className: "drop-shadow-md",
          })}
          <span
            className="font-black text-green-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-mono leading-none"
            style={{ fontSize: `${target.fontSize}px` }}
          >
            +{target.amount}
          </span>
        </FloatUpContainer>
      ))}
    </>
  );
}
