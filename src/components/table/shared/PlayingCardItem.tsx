import { motion } from "motion/react";
import type { PlayingCardMeta } from "../../../types";
import PlayingCard from "../../cards/PlayingCard";
import InspectCardTooltip from "../Tooltip/InspectCardTooltip";
import { useTooltip } from "../../../hooks/useTooltip";

export default function PlayingCardItem({
  cardId,
  cardMeta,
  tooltipDelay,
}: {
  cardId: string;
  cardMeta: PlayingCardMeta;
  tooltipDelay: number;
}) {
  const { isVisible, handlersNonPinable } = useTooltip();

  return (
    <motion.div className="h-full w-fit cursor-pointer" {...handlersNonPinable}>
      <PlayingCard cardId={cardId} initialIsFaceDown={false} />

      {isVisible && (
        <InspectCardTooltip
          type={"playingCardRef"}
          content={cardMeta}
          delay={tooltipDelay}
        />
      )}
    </motion.div>
  );
}
