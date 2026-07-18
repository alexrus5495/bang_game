import React, { useEffect, useState } from "react";
import { m } from "motion/react";
import { type LocalState } from "../../../stores/localStateStore";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { useTurnPhase } from "../../../stores/hooks/localStateStore.hooks";

const PhaseDisplay = React.memo(() => {
  const phase = useTurnPhase();

  return (
    <m.div layout className="h-full w-full flex">
      <PlayingIndicator phase={phase} />
      <TurnTimer />
      <DiscardIndicator phase={phase} />
    </m.div>
  );
});

const PlayingIndicator = ({ phase }: { phase: LocalState["turnPhase"] }) => {
  return (
    <m.div layout className="h-full w-[30%] flex justify-end items-center">
      <m.img
        layout
        className="h-[80%] w-auto border"
        src="./phase_play.png"
        alt=""
        animate={{ opacity: phase === "PLAYING" ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </m.div>
  );
};

const TurnTimer = () => {
  const [timer, setTimer] = useState<number>(20);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        const next = prev - 1;
        return next <= 0 ? 20 : next;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <m.div
      layout
      className="h-full w-[40%] flex justify-center items-center"
      style={{
        gap: sizeAdaptive(150),
      }}
    >
      <img className="h-[80%]" src="./icon_hourglass.png" alt="" />
      <m.div
        layout
        className="h-full w-auto text-center"
        style={{
          width: sizeAdaptive(40),
          fontSize: sizeAdaptive(30),
          lineHeight: sizeAdaptive(25),
          color: timer <= 10 ? "var(--RED)" : "var(--BLACK)",
        }}
      >
        {timer.toString().padStart(2, "0")}
      </m.div>
    </m.div>
  );
};

const DiscardIndicator = ({ phase }: { phase: LocalState["turnPhase"] }) => {
  return (
    <m.div layout className="h-full w-[30%] flex justify-start items-center">
      <m.img
        layout
        className="h-[80%]"
        src="./phase_discard.png"
        alt=""
        animate={{ opacity: phase === "DISCARDING" ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </m.div>
  );
};

export default PhaseDisplay;
