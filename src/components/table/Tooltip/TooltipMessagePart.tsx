import { useState } from "react";
import { useCardLocalization } from "../../../hooks/useCardLocalization";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type {
  CharacterCardMeta,
  PlayingCardMeta,
  RoleCardMeta,
} from "../../../types";

export default function TooltipMessageCardRef({
  meta,
}: {
  meta: PlayingCardMeta | CharacterCardMeta | RoleCardMeta;
}) {
  const cardTitle = useCardLocalization(meta.pack, meta.cardTypeId).title;
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  return (
    <span
      className="font-oldtown cursor-pointer"
      style={{
        fontSize: sizeAdaptive(30),
        fontWeight: "normal",
        textDecoration: "underline",
        color: isHighlighted ? "var(--RED)" : "var(--BLACK)",
      }}
      onMouseEnter={() => setIsHighlighted(true)}
      onMouseLeave={() => setIsHighlighted(false)}
    >{`[${cardTitle}]`}</span>
  );
}
