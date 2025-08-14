import { useSystemLocalization } from "../../../../hooks/useSystemLocalization";
import { useTooltip } from "../../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { Player_PublicData } from "../../../../types";
import Tooltip from "../../Tooltip";

export default function HandIcon({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  const { position, isVisible, handlersNonPinable } = useTooltip();
  const locale = useSystemLocalization() as Record<string, string>;

  return (
    <>
      <div
        className="h-full aspect-square cursor-pointer"
        {...handlersNonPinable}
      >
        <div
          className="h-full aspect-square border rounded-[50%] bg-[var(--BEIGE)] relative z-1"
          style={{
            borderWidth: sizeAdaptive(300),
          }}
        >
          <div
            className="h-full w-full text-center"
            style={{
              fontSize: sizeAdaptive(25),
              lineHeight: sizeAdaptive(25),
            }}
          >
            {playerData.handLength}
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
          title={`${locale["tooltip_handSize"]}: ${playerData.handLength}`}
          content={undefined}
          position={position}
          hasCardRef={false}
        />
      )}
    </>
  );
}
