import { game } from "../../../main";
import { BORDER_COLORS } from "../../../config/borders.config";
import { useCardLocalization } from "../../../hooks/useCardLocalization";
import type { CardProps } from "../types";
import {
  Title,
  Border,
  Image,
  Description,
  TooltipIcon,
  RankAndSuit,
} from "../shared/";

export default function CardFace({ cardId }: CardProps) {
  const {
    border,
    cardTypeId,
    description,
    image,
    pack,
    rankAndSuit,
    tooltipIcon,
  } = game.deckMeta[cardId];

  const title = useCardLocalization(pack, cardTypeId).title;
  const borderColor = `#${BORDER_COLORS[border].color}`;

  const tooltipIconClasses = "h-[20px] z-3 absolute bottom-41 left-10";

  return (
    <div
      className="
        h-[500px] 
        w-[330px]
        relative"
    >
      <Border borderColor={borderColor} />
      <div className="p-[25px] h-full w-full">
        <Title text={title} />
        <Image cardImage={image} />
        <Description description={description} packKey={pack} />
        {tooltipIcon === true && <TooltipIcon className={tooltipIconClasses} />}
        {rankAndSuit && <RankAndSuit rankAndSuit={rankAndSuit} />}
      </div>
    </div>
  );
}
