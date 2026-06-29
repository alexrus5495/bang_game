import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import { useTooltip } from "../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import Tooltip from "../Tooltip/Tooltip";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useDragDropStore } from "../../../stores/dragDropStore";

export default function HandIcon({ playerId }: { playerId: string }) {
  const { position, isVisible, handlersNonPinable } = useTooltip();
  const locale = useSystemLocalization() as Record<string, string>;
  const isDragging = useDragDropStore((state) => state.isDragging);

  const handLength =
    useLocalStateStore((state) =>
      state.playersController.getPlayerHandLength(playerId),
    ) ?? 0;

  return (
    <>
      <div
        className="h-full aspect-square"
        style={{ cursor: isDragging ? "default" : "pointer" }}
        {...handlersNonPinable}
      >
        <div
          className="h-full aspect-square border rounded-[50%] bg-paperTexture-yellow relative z-1"
          style={{
            borderWidth: sizeAdaptive(300),
          }}
        >
          <div className="h-full w-full text-center" style={{}}>
            {handLength}
          </div>
        </div>
        <img
          src="./icon-cards.png"
          alt=""
          className="absolute h-[90%] border border-white object-contain z-0"
          style={{ top: "-60%", right: "-1.5%" }}
          draggable={false}
        />
      </div>

      {isVisible && (
        <Tooltip
          title={`${locale["tooltip_handSize"]}: ${handLength}`}
          content={undefined}
          position={position}
          hasCardRef={false}
        />
      )}
    </>
  );
}
