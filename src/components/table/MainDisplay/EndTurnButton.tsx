import React from "react";
import { m } from "motion/react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";

const EndTurnButton = React.memo(() => {
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
      className="relative top-0 left-0 right-0 flex justify-center z-[0]"
    >
      <div className="w-[80%] relative" style={{ height: sizeAdaptive(30) }}>
        <img className="absolute z-0" src="./base_turn.png" alt="" />

        <div className="h-full w-full z-1 relative flex justify-center items-center">
          <div className="h-full flex items-center justify-center will-change-transform">
            <img className="h-[50%]" src="./decoration_b.png" alt="" />
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
            END TURN
          </div>

          <div className="h-full flex items-center justify-center will-change-transform">
            <img
              className="h-[50%] rotate-180"
              src="./decoration_b.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </m.div>
  );
});

export default EndTurnButton;
