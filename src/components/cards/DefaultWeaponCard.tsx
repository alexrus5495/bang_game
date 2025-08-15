import { defaultWeaponMeta } from "../../config/defaultWeaponMeta";
import type { BorderColor, BorderType, PlayingCardMeta } from "../../types";
import {
  Image,
  Border,
  BulletHolesMask,
  CardContent,
  Description,
  Title,
} from "./shared";
import CardScaler from "./shared/CardScaler";
import {
  CARD_CONTAINER_BORDER_RADIUS,
  CARD_CONTAINER_HEIGHT,
  CARD_CONTAINER_WIDTH,
} from "./shared/constants";

export default function DefaultWeaponCard() {
  const cardData = defaultWeaponMeta as Omit<
    PlayingCardMeta,
    "rankAndSuit" | "cardInstanceId" | "effect" | "_range"
  >;

  const { cardTypeId, description, image, pack } = cardData;
  const cardType = "playing";

  const hasBulletHoles = cardData.decorations.includes("bullet_holes");

  const borderColor =
    "borderColor" in cardData ? cardData.borderColor : undefined;
  const borderType = "borderType" in cardData ? cardData.borderType : undefined;

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
        {hasBulletHoles && <BulletHolesMask />}

        {borderColor && (
          <Border
            borderColor={borderColor as BorderColor}
            borderType={borderType as BorderType}
          />
        )}
        <CardContent>
          <Title pack={pack} cardTypeId={cardTypeId} cardType={cardType} />
          <Image cardImage={image} />
          <Description description={description} packKey={pack} />
        </CardContent>
      </div>
    </CardScaler>
  );
}
