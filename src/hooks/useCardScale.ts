import { useLayoutEffect, useRef, useState } from "react";
import { CARD_CONTAINER_HEIGHT } from "../components/cards/shared/constants";

export function useCardScale() {
  const ref = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const updateScale = () => {
      if (!ref.current) return;

      const newScale = ref.current.clientHeight / CARD_CONTAINER_HEIGHT;

      setScale(newScale);
    };

    const observer = new ResizeObserver(updateScale);

    observer.observe(ref.current);

    updateScale();

    return () => observer.disconnect();
  }, []);

  return {
    ref,
    scale,
  };
}
