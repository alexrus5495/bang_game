import React from "react";
import RootPortal from "../../shared/RootPortal";
import ScreenDimmer from "../../shared/ScreenDimmer";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { usePendingInteraction } from "../../../stores/hooks/localStateStore.hooks";
import CharPortraits from "./StorePrompt/CharPortraits";
import Title from "./StorePrompt/Title";
import StoreSlots from "./StorePrompt/StoreSlots";
import { m } from "motion/react";

const StorePrompt = React.memo(() => {
  const pendingInteraction = usePendingInteraction();
  if (pendingInteraction?.type !== "GENERAL_STORE") return null;
  const playersOrder = pendingInteraction.pickersOrder ?? [];

  return (
    <RootPortal portalId={`store-prompt`}>
      {/* Единая плавная обертка для всего модального окна */}
      <ScreenDimmer fadeIn={true} />

      <m.div
        className="fixed inset-0 z-40"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div
          className="absolute z-50
            left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] 
            flex flex-col items-center justify-center"
          style={{ height: sizeAdaptive(1), width: sizeAdaptive(0.6) }}
        >
          <div className="h-[25%] w-[50%] flex items-center">
            <Title />
          </div>

          <div className="h-[70%] w-[90%] flex flex-col justify-start">
            <div className="h-[60%] w-full flex justify-around items-center">
              <StoreSlots playersOrder={playersOrder} />
            </div>

            <div className="h-[30%] w-full flex justify-around">
              <CharPortraits playersOrder={playersOrder} />
            </div>
          </div>
        </div>
      </m.div>
    </RootPortal>
  );
});

export default StorePrompt;
