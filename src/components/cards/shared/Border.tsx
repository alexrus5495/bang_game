import { BORDER_COLORS } from "../../../config/borders.config";
import type { BorderColor, BorderType } from "../../../types";
import BorderMask from "./BorderMask";
import { CARD_CONTAINER_BORDER_RADIUS } from "./constants";

export default function Border({
  borderType,
  borderColor,
}: {
  borderType: BorderType;
  borderColor: BorderColor;
}) {
  const backgroundColor =
    borderColor !== "none" ? BORDER_COLORS[borderColor].color : "";

  const gradientClass = borderColor !== "none" ? "" : "bg-gradient-custom-1";

  return (
    <>
      <BorderMask borderType={borderType} />
      <div
        className={`h-full w-full ${gradientClass}`}
        style={{
          borderRadius: `${CARD_CONTAINER_BORDER_RADIUS}px`,
          backgroundColor: backgroundColor,
        }}
      ></div>
    </>
  );
}
