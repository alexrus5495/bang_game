import { m } from "motion/react";
import { FractalNoise, Neon, Shader } from "shaders/react";
import useAnimateColor from "../hooks/useAnimateColor";
import { useIsCurrentPlayer } from "../stores/hooks/localStateStore.hooks";

export default function CardPlayingAreaAuraEffect({
  color,
}: {
  color: string;
}) {
  const animatedColor = useAnimateColor(color, 0.4);
  const isCurrent = useIsCurrentPlayer();

  return (
    <m.div
      className="w-[140%] h-[140%] absolute z-[0] pointer-events-none"
      animate={{
        opacity: isCurrent ? 1 : 0,
      }}
      transition={{ duration: 0.5 }}
    >
      <Shader className="w-full h-full">
        <FractalNoise
          visible={false}
          id={"noise"}
          octaves={2}
          detail={7}
          contrast={4}
          angle={15}
          speed={1.5}
        />

        <Neon
          shape={JSON.stringify({
            type: "roundedRectSDF",
            height: 0.35,
            width: 0.49,
            rounding: 0.05,
            rotation: 0,
          })}
          intensity={5}
          glowColor={animatedColor}
          maskSource="noise"
          maskType="luminance"
          glowIntensity={3}
          glowRadius={0.25}
          tubeThickness={0.01}
          flowSpeed={0}
          flowAmount={0}
          flickerSpeed={0}
          flickerAmount={0}
          cornerSmoothing={0}
        ></Neon>
      </Shader>
    </m.div>
  );
}
