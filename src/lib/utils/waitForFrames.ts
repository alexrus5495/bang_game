/**
 * Pauses async function for N animation frames (rAF). Useful in cases when you
 * need to wait for React to commit DOM changes and useLayoutEffect/ResizeObserver
 * to finish
 */
export function waitForFrames(count = 2): Promise<void> {
  return new Promise((resolve) => {
    let framesLeft = count;

    function step() {
      framesLeft--;
      if (framesLeft <= 0) {
        resolve();
      } else {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  });
}
