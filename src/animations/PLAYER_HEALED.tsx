import { useMemo } from "react";
import type { EventType } from "../types";
import { useAnchors } from "../contexts/AnchorsContext";
import { getImageComponent } from "../lib/images";
import FloatUpContainer from "./shared/FloatUpContainer";

export default function PLAYER_HEALED({
  data,
  onComplete,
}: {
  data: EventType["PLAYER_HEALED"];
  onComplete: () => void;
}) {
  const anchors = useAnchors();
  const portraitRect = anchors.getRect({
    type: "player-portrait",
    playerId: data.playerId,
  });

  const portraitHeight = portraitRect?.height ?? 0;
  const bulletHeight = portraitHeight * 0.5;
  const fontSize = bulletHeight * 0.75;

  const bulletImage = useMemo(() => {
    return getImageComponent("bullet_full_V", {
      draggable: false,
      style: { height: `${bulletHeight}px`, width: "auto" },
      className: "drop-shadow-md",
    });
  }, [bulletHeight]);

  if (!portraitRect) {
    onComplete();
    return null;
  }

  const centerX = portraitRect.x + portraitRect.width / 2;
  const centerY = portraitRect.y + portraitRect.height / 2;
  const flyDistance = portraitRect.height;

  return (
    <FloatUpContainer
      left={centerX}
      top={centerY}
      travelDistance={flyDistance}
      onComplete={onComplete}
    >
      {bulletImage}
      <span
        className="font-black text-green-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-mono leading-none"
        style={{ fontSize: `${fontSize}px` }}
      >
        +{data.amount}
      </span>
    </FloatUpContainer>
  );
}
