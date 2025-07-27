/** @returns adaptive size that allows consistent dimensions under any aspect ratios
 * @param factor - a number representing part of viewport.
 */
export function sizeAdaptive(factor: number) {
  return `min(calc(51vw/${factor}), calc(100vh/${factor}))`;
}
