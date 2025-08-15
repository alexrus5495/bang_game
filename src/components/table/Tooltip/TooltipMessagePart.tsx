import { useState } from "react";
import { useCardLocalization } from "../../../hooks/useCardLocalization";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type {
  CharacterCardMeta,
  PlayingCardMeta,
  RoleCardMeta,
} from "../../../types";
import { useTooltip } from "../../../hooks/useTooltip";
import InspectCardTooltip from "../InspectCardTooltip";

export default function TooltipMessageCardRef({
  meta,
  type,
}: {
  meta: PlayingCardMeta | CharacterCardMeta | RoleCardMeta;
  type: "playingCardRef" | "charCardRef" | "roleCardRef";
}) {
  const cardTitle = useCardLocalization(meta.pack, meta.cardTypeId).title;
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const { isVisible, handlersNonPinable } = useTooltip();

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

      {isVisible && <InspectCardTooltip content={meta} type={type} />}
    </>
  );
}
