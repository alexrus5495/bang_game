import React from "react";
import { m } from "motion/react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../lib/images";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";

const EndTurnButton = React.memo(() => {
  const locale = useSystemLocalization() as Record<string, string>;
  return (
    <m.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="h-full w-full relative top-0 left-0 right-0 flex justify-center z-[0]"
    >
      <div className="w-[80%] relative" style={{ height: sizeAdaptive(30) }}>
        {getImageComponent("mainDisplay-turn", { className: "absolute z-0" })}

        <div className="h-full w-full z-1 relative flex justify-center items-center">
          <div className="h-full flex items-center justify-center will-change-transform">
            {getImageComponent("decoration_b", { className: "h-[50%]" })}
          </div>

          <div
            className="h-full w-auto"
            style={{
              fontSize: sizeAdaptive(35),
              lineHeight: sizeAdaptive(28),
              marginLeft: sizeAdaptive(70),
              marginRight: sizeAdaptive(70),
            }}
          >
            {locale["end_turn"]}
          </div>

          <div className="h-full flex items-center justify-center will-change-transform">
            {getImageComponent("decoration_b", {
              className: "h-[50%] rotate-180",
            })}
          </div>
        </div>
      </div>
    </m.div>
  );
});

export default EndTurnButton;
