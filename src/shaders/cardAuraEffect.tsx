import React from "react";
import { FractalNoise, Neon, Shader } from "shaders/react";
import useIsCurrentPlayer from "../hooks/useIsCurrentPlayer";
import { m } from "motion/react";

const CardAuraEffect = React.memo(({ color }: { color: string }) => {
  const randomSeed = Math.random() * 100;
  const isCurrent = useIsCurrentPlayer();

  return (
    <m.div
      animate={{
        opacity: isCurrent ? 1 : 0,
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
          seed={randomSeed}
        />

        <Neon
          shape={JSON.stringify({
            type: "roundedRectSDF",
            height: 0.41,
            width: 0.26,
            rounding: 0.03,
            rotation: 0,
          })}
          glowColor={color}
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
});

export default CardAuraEffect;
