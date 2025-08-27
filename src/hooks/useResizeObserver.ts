import { useEffect, useRef, useState } from "react";

export const useResizeObserver = <T extends HTMLElement>() => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  return { ref, ...dimensions };
};
