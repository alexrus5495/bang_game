import React from "react";
import { m } from "motion/react";

const ScreenDimmer = React.memo(
  ({
    dimStrength = 80,
    fadeIn = false,
  }: {
    dimStrength?: number;
    fadeIn?: boolean;
  }) => {
    if (dimStrength < 0 || dimStrength > 100)
      throw new Error(
        `dimStrength must be between 0 and 100. Recieved: ${dimStrength}`,
      );

    const targetOpacity = dimStrength / 100;

    return (
      <m.div
        className="fixed inset-0 z-30 pointer-events-none bg-black"
        initial={fadeIn ? { opacity: 0 } : false}
        animate={{ opacity: targetOpacity }}
        transition={
          fadeIn ? { duration: 0.3, ease: "easeOut" } : { duration: 0 }
        }
      />
    );
  },
);

export default ScreenDimmer;
