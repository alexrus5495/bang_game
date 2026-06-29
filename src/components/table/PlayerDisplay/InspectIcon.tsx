import { useTooltip } from "../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type { PlayingCardMeta } from "../../../types";
import InspectCardTooltip from "../Tooltip/InspectCardTooltip";

export default function InspectIcon({
  cardMeta,
}: {
  cardMeta: PlayingCardMeta;
}) {
  const { isVisible, handlersNonPinable } = useTooltip();

  return (
    <div>
      <div
        className="absolute h-auto aspect-square bg-[var(--BEIGE)] cursor-pointer border flex items-center"
        style={{
          top: 0,
          right: 0,
          transform: "translateX(40%) translateY(-40%)",
          borderRadius: "50%",
          padding: sizeAdaptive(250),
          borderWidth: sizeAdaptive(250),
        }}
        {...handlersNonPinable}
      >
        <img src="./icon-eye.png" alt="" style={{ height: sizeAdaptive(50) }} />
      </div>

      <InspectCardTooltip
        content={cardMeta}
        type={"playingCardRef"}
        isVisible={isVisible}
      />
    </div>
  );
}
