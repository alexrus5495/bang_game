import { getImageComponent } from "../../../lib/images";
import CardScaler from "./CardScaler";
import {
  CARD_CONTAINER_BORDER_RADIUS,
  CARD_CONTAINER_HEIGHT,
  CARD_CONTAINER_WIDTH,
} from "./constants";

export default function CardBack() {
  return (
    <CardScaler>
      <div
        className="relative border-2 shadow"
        style={{
          height: `${CARD_CONTAINER_HEIGHT}px`,
          width: `${CARD_CONTAINER_WIDTH}px`,
          borderRadius: `${CARD_CONTAINER_BORDER_RADIUS}px`,
        }}
      >
        {getImageComponent("cardback_1", {
          className: "w-full h-auto m-auto",
        })}
      </div>
    </CardScaler>
  );
}
