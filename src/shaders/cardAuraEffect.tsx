import React, { useRef } from "react";
import { FractalNoise, Neon, Shader } from "shaders/react";
import { m } from "motion/react";
import useAnimateColor from "../hooks/useAnimateColor";

const CardAuraEffect = React.memo(
  ({ color, isVisible }: { color: string; isVisible: boolean }) => {
    const randomSeedRef = useRef(Math.random() * 100);
    const animatedColor = useAnimateColor(color, 0.5);

    return (
      <m.div
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <Shader
          className="w-[130%] h-[120%] 
      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      absolute flex justify-center items-center pointer-events-none"
        >
          <FractalNoise
            visible={false}
            id={"noise"}
            octaves={2}
            detail={10}
            contrast={4}
            angle={15}
            speed={1.5}
            seed={randomSeedRef.current}
          />

          <Neon
            shape={JSON.stringify({
              type: "roundedRectSDF",
              height: 0.41,
              width: 0.26,
              rounding: 0.03,
              rotation: 0,
            })}
            glowColor={animatedColor}
            intensity={4}
            maskSource="noise"
            maskType="luminance"
            glowIntensity={4}
            glowRadius={0.13}
            tubeThickness={0.1}
            flowSpeed={0}
            flowAmount={0}
            flickerSpeed={0}
            flickerAmount={0}
            cornerSmoothing={0}
          />
        </Shader>
      </m.div>
    );
  },
);

export default CardAuraEffect;
