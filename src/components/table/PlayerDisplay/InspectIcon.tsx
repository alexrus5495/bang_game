import { useTooltip } from "../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../lib/images";
import InspectCardTooltip from "../Tooltip/InspectCardTooltip";

export default function InspectIcon({ cardId }: { cardId: string }) {
  const { isVisible, handlersNonPinable } = useTooltip();

  return (
    <div>
      <div
        className="absolute aspect-square bg-paperTexture-yellow cursor-pointer border flex items-center will-change-transform"
        style={{
          height: sizeAdaptive(20),
          top: 0,
          right: 0,
          transform: "translateX(50%) translateY(-50%)",
          borderRadius: "50%",
          padding: sizeAdaptive(250),
          borderWidth: sizeAdaptive(250),
        }}
        {...handlersNonPinable}
      >
        {getImageComponent("icon-inspect", {
          className: "h-[90%] w-auto",
        })}
      </div>

      <InspectCardTooltip
        cardId={cardId}
        type={"playingCardRef"}
        isVisible={isVisible}
      />
    </div>
  );
}
