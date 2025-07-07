import { useEffect, useRef, useState } from "react";
import type { CardScalerProps } from "../types";
import { CARD_CONTAINER_HEIGHT, CARD_CONTAINER_WIDTH } from "./constants";

export default function CardScaler({ children }: CardScalerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);

  //Updating scale
  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      const container = containerRef.current;
      if (!container) return;

      //Calculate scale factor
      const newScale = container.clientHeight / CARD_CONTAINER_HEIGHT;

      setScale(newScale);
    };

    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);

    updateScale();

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full flex items-center justify-center"
      style={{ width: `${CARD_CONTAINER_WIDTH * scale}px` }}
    >
      <div className="origin-center" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
