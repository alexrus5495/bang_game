import type { CardProps } from "../types";
import type {
  BorderColor,
  BorderType,
  CharacterCardMeta,
  PlayingCardMeta,
  RoleCardMeta,
} from "../../../types";
import type { RankAndSuit as RankAndSuitType } from "../../../types";
import {
  CardContent,
  Title,
  Image,
  Description,
  TooltipIcon,
  RankAndSuit,
  Bullets,
  BulletHolesMask,
  Border,
} from ".";
import {
  CARD_CONTAINER_BORDER_RADIUS,
  CARD_CONTAINER_HEIGHT,
  CARD_CONTAINER_WIDTH,
} from "./constants";
import { getImageComponent } from "../../../lib/images";
import { useCardsMetaDataState } from "../../../hooks/useCardsMetaDataState";

export default function CardFace({ cardId, cardType }: CardProps) {
  const cardsMetaData = useCardsMetaDataState()[0];

  if (!cardsMetaData) return null;

  const cardData =
    cardType === "playing"
      ? (cardsMetaData.deckMeta[cardId] as PlayingCardMeta)
      : cardType === "character"
        ? (cardsMetaData.charDeckMeta[cardId] as CharacterCardMeta)
        : (cardsMetaData.roleDeckMeta[cardId] as RoleCardMeta);

  const { cardTypeId, description, image, pack } = cardData;

  const hasBulletHoles = cardData.decorations.includes("bullet_holes");

  const borderColor =
    "borderColor" in cardData ? cardData.borderColor : undefined;
  const borderType = "borderType" in cardData ? cardData.borderType : undefined;
  const rankAndSuit =
    "rankAndSuit" in cardData ? cardData.rankAndSuit : undefined;

  const tooltipIcon =
    "tooltipIcon" in cardData ? cardData.tooltipIcon : undefined;

  const bullets = "bullets" in cardData ? cardData.bullets : undefined;

  return (
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

        {tooltipIcon === true && <TooltipIcon />}
        {rankAndSuit !== undefined && (
          <RankAndSuit rankAndSuit={rankAndSuit as RankAndSuitType} />
        )}
        {bullets !== undefined && <Bullets count={bullets as number} />}

        {cardId === "sheriff" && <SheriffExtraBulletSymbol />}
      </CardContent>
    </div>
  );
}

function SheriffExtraBulletSymbol() {
  return (
    <div className="w-[80px] absolute -right-[15px] -bottom-[25px]">
      {getImageComponent("heal")}
    </div>
  );
}
