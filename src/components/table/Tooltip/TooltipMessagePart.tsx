import React, { useState } from "react";
import { useCardLocalization } from "../../../stores/hooks/useCardLocalization";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type {
  CharacterCardMeta,
  PlayingCardMeta,
  RoleCardMeta,
} from "../../../types";
import { useTooltip } from "../../../hooks/useTooltip";
import InspectCardTooltip from "./InspectCardTooltip";

const TooltipMessageCardRef = React.memo(
  ({
    meta,
    type,
  }: {
    meta: PlayingCardMeta | CharacterCardMeta | RoleCardMeta;
    type: "playingCardRef" | "charCardRef" | "roleCardRef";
  }) => {
    const cardTitle = useCardLocalization(meta.pack, meta.cardTypeId).title;
    const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
    const { isVisible, handlersNonPinable } = useTooltip();

    const cardId =
      "cardInstanceId" in meta ? meta.cardInstanceId : meta.cardTypeId;

    return (
      <>
        <span
          className="font-oldtown cursor-pointer"
          style={{
            fontSize: sizeAdaptive(30),
            fontWeight: "normal",
            textDecoration: "underline",
            color: isHighlighted ? "var(--RED)" : "var(--BLACK)",
          }}
          onMouseEnter={() => {
            setIsHighlighted(true);
            handlersNonPinable.onMouseEnter();
          }}
          onMouseLeave={() => {
            setIsHighlighted(false);
            handlersNonPinable.onMouseLeave();
          }}
          onMouseMove={handlersNonPinable.onMouseMove}
        >{`[${cardTitle}]`}</span>

        <InspectCardTooltip cardId={cardId} type={type} isVisible={isVisible} />
      </>
    );
  },
);

export default TooltipMessageCardRef;
