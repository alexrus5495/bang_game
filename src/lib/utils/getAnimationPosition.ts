type Size = { width: number; height: number };
type Rect = { x: number; y: number; width: number; height: number };

interface PositionOptions {
  containerSize: Size;
  targetRect: Rect;
}

/**
 * Calculates (x, y) coordinates for a container scaled with `transformOrigin: "center center"`,
 * ensuring its visual center perfectly aligns with the target rectangle's center.
 */
export function getAnimationPosition({
  containerSize,
  targetRect,
}: PositionOptions) {
  return {
    x: targetRect.x + (targetRect.width - containerSize.width) / 2,
    y: targetRect.y + (targetRect.height - containerSize.height) / 2,
  };
}
