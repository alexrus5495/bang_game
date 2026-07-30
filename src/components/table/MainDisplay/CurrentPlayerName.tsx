import React from "react";
import { m } from "motion/react";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../lib/images";

const CurrentPlayerName = React.memo(
  ({ playerId }: { playerId: string | null }) => {
    const locale = useSystemLocalization();
    const player = useLocalStateStore((state) => {
      if (playerId) {
        return state.playersController.getPlayerById(playerId);
      } else return null;
    });

    if (!player || locale === "fail") return null;
    const name = player.isAI ? locale[player.nickname] : player.nickname;

    return (
      <m.div layout className="h-full w-full flex justify-center">
        <m.div
          layout
          layoutDependency={name}
          className="h-full flex items-center justify-center will-change-transform"
        >
          {getImageComponent("decoration_b", {
            className: "h-[50%]",
          })}
        </m.div>

        <m.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 38 }}
          className="w-auto h-full text-center will-change-transform"
          style={{
            fontSize: sizeAdaptive(30),
            lineHeight: sizeAdaptive(20),
            marginLeft: sizeAdaptive(50),
            marginRight: sizeAdaptive(50),
          }}
        >
          {name}
        </m.div>

        <m.div
          layout
          layoutDependency={name}
          className="h-full flex items-center justify-center will-change-transform"
        >
          {getImageComponent("decoration_b", {
            className: "h-[50%] rotate-180",
          })}
        </m.div>
      </m.div>
    );
  },
);

export default CurrentPlayerName;
