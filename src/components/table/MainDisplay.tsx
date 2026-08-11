import { AnimatePresence, m } from "motion/react";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import Carousel from "./MainDisplay/Carousel";
import React from "react";
import CurrentPlayerName from "./MainDisplay/CurrentPlayerName";
import PhaseDisplay from "./MainDisplay/PhaseDisplay";
import EndTurnButton from "./MainDisplay/EndTurnButton";
import { twMerge } from "tailwind-merge";
import {
  useCurrentPlayerId,
  useIsCurrentPlayer,
  useIsPreparing,
  usePreviousPlayerId,
} from "../../stores/hooks/localStateStore.hooks";
import { getImageComponent } from "../../lib/images";
import { useTranslation } from "../../hooks/useTranslation";

const MainDisplay = React.memo(({ className }: { className?: string }) => {
  const isCurrent = useIsCurrentPlayer();

  return (
    <div className={twMerge(className)}>
      <Content />
      <Backdrop />
      <AnimatePresence>{isCurrent && <EndTurnButton />}</AnimatePresence>
    </div>
  );
});

function Backdrop() {
  return (
    <div
      className="absolute h-full w-full left-0 z-1"
      style={{ bottom: sizeAdaptive(110) }}
    >
      {getImageComponent("mainDisplay-base")}
    </div>
  );
}

function Content() {
  const t = useTranslation();
  const currentPlayerId = useCurrentPlayerId();
  const previousPlayerId = usePreviousPlayerId();
  const currentPlayer = currentPlayerId ?? previousPlayerId;
  const isPreparing = useIsPreparing();

  return (
    <div
      className="relative z-2"
      style={{ height: sizeAdaptive(4.6), width: sizeAdaptive(2.95) }}
    >
      <AnimatePresence mode="wait">
        {isPreparing && <PreparationCurtain />}

        {!isPreparing && (
          <m.div
            className="h-full w-full flex flex-col justify-center items-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div
              className="w-full h-[30%] text-center tracking-wide"
              style={{
                borderBottomWidth: sizeAdaptive(250),
                borderBlockColor: "var(--BLACK)",
                fontSize: sizeAdaptive(25),
                lineHeight: sizeAdaptive(12.6),
              }}
            >
              {`${t("current_turn")}:`}
            </div>

            <div className="w-full h-[25%]">
              <Carousel />
            </div>

            <div
              className="w-full h-[25%]"
              style={{
                borderTopWidth: sizeAdaptive(250),
                borderBottomWidth: sizeAdaptive(250),
                borderBlockColor: "var(--BLACK)",
              }}
            >
              <CurrentPlayerName playerId={currentPlayer} />
            </div>
            <div
              className="w-full h-[20%]"
              style={{ paddingBottom: sizeAdaptive(150) }}
            >
              <PhaseDisplay />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PreparationCurtain() {
  return (
    <m.div
      className="h-full w-full flex flex-col justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {getImageComponent("decoration_c", {
        style: { width: sizeAdaptive(4.5) },
      })}
      <div
        className="text-center"
        style={{ fontSize: sizeAdaptive(20), lineHeight: sizeAdaptive(17) }}
      >
        PREPARING...
      </div>
      {getImageComponent("decoration_c", {
        style: { width: sizeAdaptive(4.5) },
      })}
    </m.div>
  );
}

export default MainDisplay;
