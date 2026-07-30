type Size = { height: number };

interface ScaleOptions {
  baseSize: Size;
  initialSize: Size;
  targetSize: Size;
}

/**
 * Calculates initial and target scale factors based on the base element size.
 */
export function getAnimationScale({
  baseSize,
  initialSize,
  targetSize,
}: ScaleOptions) {
  return {
    initialScale: initialSize.height / baseSize.height,
    targetScale: targetSize.height / baseSize.height,
  };
}
