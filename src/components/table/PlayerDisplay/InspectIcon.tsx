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
        className="absolute aspect-square bg-paperTexture-yellow cursor-pointer border flex items-center will-change-transform"
        style={{
          height: sizeAdaptive(23),
          top: 0,
          right: 0,
          transform: "translateX(30%) translateY(-30%)",
          borderRadius: "50%",
          padding: sizeAdaptive(250),
          borderWidth: sizeAdaptive(250),
        }}
        {...handlersNonPinable}
      >
        <img
          className="h-[90%] w-auto will-change-transform"
          src="./icon-inspect.png"
          alt=""
        />
      </div>

      <InspectCardTooltip
        content={cardMeta}
        type={"playingCardRef"}
        isVisible={isVisible}
      />
    </div>
  );
}
