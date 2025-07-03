import { useEffect, useRef, useState } from "react";

type CardScalerProps = {
  children: React.ReactNode;
};

export default function CardScaler({ children }: CardScalerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);

  //Updating scale
  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      const container = containerRef.current;
      if (!container) return;

      //Calculate scale factor: FINAL_HEIGHT / CARD_FACE_HEIGHT
      const newScale = container.clientHeight / 500;

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
      style={{ width: `${330 * scale}px` }}
    >
      <div className="origin-center" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
