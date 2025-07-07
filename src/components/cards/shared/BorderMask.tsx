import type { BorderType } from "../../../types";
import { CARD_CONTAINER_BORDER_RADIUS } from "./constants";

export default function BorderMask({ borderType }: { borderType: BorderType }) {
  return (
    <div
      className={`mask-border-${borderType} h-full w-full absolute bg-white`}
      style={{
        borderRadius: `${CARD_CONTAINER_BORDER_RADIUS}px`,
      }}
    ></div>
  );
}
