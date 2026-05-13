import { useEffect } from "react";

export function useReadyAfterPaint(callback: () => void) {
  useEffect(() => {
    let frame1 = 0;
    let frame2 = 0;

    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        callback();
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [callback]);
}
