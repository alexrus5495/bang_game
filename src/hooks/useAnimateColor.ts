import { animate, type Easing } from "motion";
import { useEffect, useState } from "react";

export default function useAnimateColor(
  color: string,
  duration: number,
  ease: Easing = "easeInOut",
) {
  const [animatedColor, setAnimatedColor] = useState(color);

  useEffect(() => {
    const controls = animate(animatedColor, color, {
      duration: duration,
      ease: ease,
      onUpdate: (latest) => setAnimatedColor(latest),
    });
    return () => controls.stop();
  }, [color]);

  return animatedColor;
}
