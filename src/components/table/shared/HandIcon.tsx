import { useTooltip } from "../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import Tooltip from "../Tooltip/Tooltip";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useIsDragging } from "../../../stores/hooks/localStateStore.hooks";
import { getImageComponent } from "../../../lib/images";
import { m } from "motion/react";
import { useTranslation } from "../../../hooks/useTranslation";

export default function HandIcon({ playerId }: { playerId: string }) {
  const t = useTranslation();
  const { position, isVisible, handlersNonPinable } = useTooltip();
  const isDragging = useIsDragging();

  const handLength =
    useLocalStateStore((state) =>
      state.playersController.getPlayerHandLength(playerId),
    ) ?? 0;

  return (
    <div className="z-[0]">
      <div
        className="h-full aspect-square"
        style={{ cursor: isDragging ? "default" : "pointer" }}
        {...handlersNonPinable}
      >
        <m.div
          key={handLength}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.35, 1] }}
          transition={{
            duration: 0.35,
            times: [0, 0.5, 1],
            ease: "easeInOut",
          }}
          className="h-full aspect-square border rounded-[50%] bg-paperTexture-yellow relative z-1"
          style={{
            borderWidth: sizeAdaptive(300),
          }}
        >
          <div className="h-full w-full text-center" style={{}}>
            {handLength}
          </div>
        </m.div>

        {getImageComponent("icon-cards", {
          className: "absolute h-[90%] border border-white object-contain z-0",
          style: { top: "-60%", right: "-1.5%" },
        })}
      </div>

      {isVisible && (
        <Tooltip
          title={`${t("tooltip_handSize")}: ${handLength}`}
          content={undefined}
          position={position}
          hasCardRef={false}
        />
      )}
    </div>
  );
}
