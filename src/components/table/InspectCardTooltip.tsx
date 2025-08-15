import { motion } from "motion/react";
import type {
  CharacterCardMeta,
  PlayingCardMeta,
  RoleCardMeta,
} from "../../types";
import { useRef } from "react";
import RoleCard from "../cards/RoleCard";
import { CARD_CONTAINER_BORDER_RADIUS } from "../cards/shared/constants";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import CharacterCard from "../cards/CharacterCard";
import PlayingCard from "../cards/PlayingCard";

export default function InspectCardTooltip({
  content,
  type,
}: {
  content: PlayingCardMeta | CharacterCardMeta | RoleCardMeta;
  type: "playingCardRef" | "charCardRef" | "roleCardRef";
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  if (type === "playingCardRef") {
    console.table(content);
  }

  return (
    <motion.div
      ref={tooltipRef}
      className="z-[1000] bg-black/80 flex flex-col justify-center items-center"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        translateY: "-50%",
        translateX: "-50%",
        borderRadius: CARD_CONTAINER_BORDER_RADIUS,
        height: sizeAdaptive(1.6),
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      {type === "roleCardRef" && <RoleCard cardId={content.cardTypeId} />}

      {type === "charCardRef" && <CharacterCard cardId={content.cardTypeId} />}

      {type === "playingCardRef" &&
        (content.cardTypeId !== "colt45" ? (
          "cardInstanceId" in content && (
            <PlayingCard
              cardId={content.cardInstanceId}
              initialIsFaceDown={false}
              initialIsInteractable={false}
            />
          )
        ) : (
          <></>
        ))}
    </motion.div>
  );
}
