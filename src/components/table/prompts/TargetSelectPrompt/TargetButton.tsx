import { m } from "motion/react";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import {
  useCardActionsController,
  usePendingCardIndex,
  usePlayersController,
  useUiController,
} from "../../../../stores/hooks/localStateStore.hooks";
import { getImageComponent } from "../../../../lib/images";
import { useTargetPosition } from "../TargetSelectPrompt.hooks";
import React from "react";
import { useTranslation } from "../../../../hooks/useTranslation";

const TargetButton = React.memo(
  ({
    player,
    index,
    spacing,
    highlightedOption,
    setHighlightedOption,
  }: {
    player: string;
    spacing: { gap: number; margin: number; elementHeight: number };
    index: number;
    highlightedOption: number | null;
    setHighlightedOption: (v: number | null) => void;
  }) => {
    const playersController = usePlayersController();
    const pendingCardIndex = usePendingCardIndex();
    const uiController = useUiController();
    const cardActionController = useCardActionsController();
    const t = useTranslation();
    const playerData = playersController.getPlayerById(player);
    const position = useTargetPosition({ spacing, index, highlightedOption });

    if (pendingCardIndex === null) return null;

    const onMouseEnter = () => {
      setHighlightedOption(index);
      uiController.setHighlightedOpponent(player);
    };

    const onMouseLeave = () => {
      setHighlightedOption(null);
      uiController.setHighlightedOpponent(null);
    };

    const onClick = () => {
      cardActionController.playCard(pendingCardIndex, player);
    };

    if (!position || !playerData) return null;

    return (
      <m.div
        className="absolute cursor-pointer flex justify-center items-center"
        style={{
          height: sizeAdaptive(15),
          top: position.top,
          zIndex: highlightedOption === index ? 999 : position.zIndex,
        }}
        initial={{ scale: 0, filter: "grayscale(0)" }}
        transition={{ scale: { duration: 0.2 } }}
        animate={{
          translateY: position.translateY,
          scale: highlightedOption === index ? 1.3 : 1,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <div
          className="h-full aspect-square rounded-[50%] border overflow-hidden"
          style={{ borderWidth: sizeAdaptive(300) }}
        >
          {getImageComponent(playerData.char, {
            className: "h-full w-full",
            style: {
              filter:
                highlightedOption === index
                  ? "grayscale(0%)"
                  : "grayscale(50%)",
            },
          })}
        </div>

        <div
          className="absolute h-[95%] w-[95%]"
          style={{ opacity: highlightedOption === index ? 1 : 0 }}
        >
          {getImageComponent("target", {
            className: "h-full",
            draggable: "false",
          })}
        </div>

        {highlightedOption === index && (
          <m.div
            key={`${player}-nameTooltip`}
            className="w-max whitespace-nowrap absolute left-[100%] top-1/2 -translate-y-1/2 bg-paperTexture-yellow font-palatino pointer-events-none"
            style={{
              fontSize: sizeAdaptive(55),
              borderWidth: sizeAdaptive(250),
              borderColor: "var(--BLACK)",
              color: "var(--BLACK)",
              fontWeight: "bolder",
              padding: sizeAdaptive(150),
              marginLeft: sizeAdaptive(150),
            }}
          >
            {t(playerData.nickname)}
          </m.div>
        )}
      </m.div>
    );
  },
);

export default TargetButton;
