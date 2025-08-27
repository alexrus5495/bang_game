import { useEffect, useState } from "react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type {
  CardsMetaData,
  Player_PublicData,
  PlayingCardMeta,
  TooltipMessage,
} from "../../../types";
import { useTooltip } from "../../../hooks/useTooltip";
import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import Tooltip from "../Tooltip/Tooltip";
import { useCardsMetaDataState } from "../../../hooks/useCardsMetaDataState";
import { defaultWeaponMeta } from "../../../config/defaultWeaponMeta";

export default function RangeIcon({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  const [range, setRange] = useState<number | undefined>(undefined);
  const [tooltipContent, setTooltipContent] = useState<TooltipMessage[]>([]);

  const {
    position,
    isVisible,
    isPinned,
    handlersNonPinable,
    handlersPinable,
    hasCardRef,
  } = useTooltip();
  const locale = useSystemLocalization() as Record<string, string>;
  const cardsMeta = useCardsMetaDataState()[0] as CardsMetaData;

  useEffect(() => {
    const newTooltipContent: TooltipMessage[] = [];

    const calculateRange = () => {
      let range = playerData.weapon.range;

      newTooltipContent.push([
        {
          type: "plainText",
          content: `+${range} ${locale["tooltip_from"]} `,
        },
        {
          type: "playingCardRef",
          content:
            playerData.weapon.card === "colt45"
              ? (defaultWeaponMeta as Omit<
                  PlayingCardMeta,
                  "rankAndSuit" | "cardInstanceId" | "effect" | "_range"
                >)
              : cardsMeta.deckMeta[playerData.weapon.card],
        },
      ]);

      const scopeCard = playerData.equipment.find((item) =>
        item.startsWith("scope_"),
      );

      if (scopeCard) {
        range++;

        newTooltipContent.push([
          { type: "plainText", content: `+1 ${locale["tooltip_from"]} ` },
          { type: "playingCardRef", content: cardsMeta.deckMeta[scopeCard] },
        ]);
      }

      if (playerData.char === "rose_doolan") {
        range++;
        newTooltipContent.push([
          { type: "plainText", content: `+1 ${locale["tooltip_from"]} ` },
          {
            type: "charCardRef",
            content: cardsMeta.charDeckMeta["rose_doolan"],
          },
        ]);
      }

      setRange(range);
      setTooltipContent(newTooltipContent);
    };

    calculateRange();
  }, [playerData, locale, cardsMeta]);

  return (
    <>
      <div
        className="h-full aspect-sqare cursor-pointer"
        {...(hasCardRef(tooltipContent) ? handlersPinable : handlersNonPinable)}
      >
        <div
          className="h-[100%] aspect-square border rounded-[50%] bg-[var(--BEIGE)] relative z-1"
          style={{
            borderWidth: sizeAdaptive(300),
          }}
        >
          {range && (
            <div className="h-full w-full text-center" style={{}}>
              {range}
            </div>
          )}
        </div>
        <img
          src="./icon-crosshair.png"
          alt=""
          className="absolute z-0 top-[-65%] h-[100%]"
          draggable={false}
        />
      </div>
      {isVisible && tooltipContent && (
        <Tooltip
          title={`${locale.range} = ${range}`}
          content={tooltipContent}
          position={position}
          hasCardRef={hasCardRef(tooltipContent)}
          isPinned={isPinned}
        />
      )}
    </>
  );
}
