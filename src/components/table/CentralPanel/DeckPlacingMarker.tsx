import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import CardScaler from "../../cards/shared/CardScaler";
import {
  CARD_CONTAINER_BORDER_RADIUS,
  CARD_CONTAINER_HEIGHT,
  CARD_CONTAINER_WIDTH,
} from "../../cards/shared/constants";

export default function DeckPlacingMarker() {
  return (
    <CardScaler>
      <div
        style={{
          height: `${CARD_CONTAINER_HEIGHT}px`,
          width: `${CARD_CONTAINER_WIDTH}px`,
          borderRadius: `${CARD_CONTAINER_BORDER_RADIUS}px`,
          borderWidth: sizeAdaptive(70),
          borderColor: "var(--WHITE)",
        }}
      ></div>
    </CardScaler>
  );
}
