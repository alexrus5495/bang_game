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
import DefaultWeaponCard from "../cards/DefaultWeaponCard";

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
    <>
      <motion.div
        className="h-[100vh] w-[100vw] z-[999] bg-black fixed top-0 left-0 pointer-events-none"
        style={{ backdropFilter: "600px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.2, duration: 0.2 }}
      ></motion.div>

      <motion.div
        ref={tooltipRef}
        className="z-[1000] flex flex-col justify-center items-center"
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
        transition={{ delay: 0.2, duration: 0.2 }}
      >
        {type === "roleCardRef" && <RoleCard cardId={content.cardTypeId} />}

        {type === "charCardRef" && (
          <CharacterCard cardId={content.cardTypeId} />
        )}
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
            <DefaultWeaponCard />
          ))}
      </motion.div>
    </>
  );
}
