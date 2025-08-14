import { TOOLTIP_OFFSET } from "../../config/menu.config";

export function checkBounds(
  mouseX: number,
  mouseY: number,
  tooltipWidth: number,
  tooltipHeight: number,
) {
  const OFFSET = TOOLTIP_OFFSET;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const isOverflowRight = mouseX + tooltipWidth + OFFSET > screenWidth;
  const isOverflowBottom = mouseY + tooltipHeight + OFFSET > screenHeight;

  return {
    top: isOverflowBottom ? undefined : mouseY + OFFSET,
    bottom: isOverflowBottom ? screenHeight - mouseY + OFFSET : undefined,
    left: isOverflowRight ? undefined : mouseX + OFFSET,
    right: isOverflowRight ? screenWidth - mouseX + OFFSET : undefined,
  };
}
