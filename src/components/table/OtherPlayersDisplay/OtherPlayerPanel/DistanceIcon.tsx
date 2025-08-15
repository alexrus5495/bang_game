import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type {
  CardsMetaData,
  Player_PublicData,
  TooltipMessage,
} from "../../../../types";
import { usePublicDataState } from "../../../../hooks/usePublicDataState";
import { processPlayersArray } from "../../../../lib/gameData/processPlayersArray";
import { useEffect, useState } from "react";
import { useSystemLocalization } from "../../../../hooks/useSystemLocalization";
import Tooltip from "../../Tooltip";
import { useTooltip } from "../../../../hooks/useTooltip";
import { useCardsMetaDataState } from "../../../../hooks/useCardsMetaDataState";
import { useSocket } from "../../../../hooks/useSocket";

export default function DistanceIcon({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  const publicData = usePublicDataState()[0];
  const cardsMeta = useCardsMetaDataState()[0] as CardsMetaData;
  const { socket } = useSocket();
  const clientId = socket.id;

  const [distance, setDistance] = useState<number | undefined>(undefined);
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

  useEffect(() => {
    const newTooltipContent: TooltipMessage[] = [];

    const calculateDistance = () => {
      if (!publicData?.playersPublicData || !clientId) return;
      const playersArray = processPlayersArray(
        publicData.playersPublicData,
        clientId,
      );
      if (!playersArray) return;

      let distance = 0;

      for (const player of playersArray) {
        if (player.id !== playerData.id) {
          if (!player.isEliminated) distance++;
        } else break;
      }

      newTooltipContent.push([
        {
          type: "plainText",
          content: `${locale["tooltip_baseRange"]}: ${distance}`,
        },
      ]);

      const mustangCard = playerData.equipment.find((item) =>
        item.startsWith("mustang" + "_"),
      );

      if (mustangCard) {
        distance++;

        newTooltipContent.push([
          { type: "plainText", content: `+1 ${locale["tooltip_from"]} ` },
          {
            type: "playingCardRef",
            content: cardsMeta.deckMeta[mustangCard],
          },
        ]);
      }

      if (playerData.char === "paul_regret") {
        distance++;

        newTooltipContent.push([
          { type: "plainText", content: `+1 ${locale["tooltip_from"]} ` },
          {
            type: "charCardRef",
            content: cardsMeta.charDeckMeta["paul_regret"],
          },
        ]);
      }

      setDistance(distance);
      setTooltipContent(newTooltipContent);
    };

    calculateDistance();
  }, [playerData, clientId, publicData, locale, cardsMeta]);

  return (
    <>
      <div
        className="h-full aspect-sqare cursor-pointer"
        {...(hasCardRef(tooltipContent) ? handlersPinable : handlersNonPinable)}
      >
        <div
          className="h-[100%] aspect-square border rounded-[50%] bg-[var(--BEIGE)] relative z-2"
          style={{
            borderWidth: sizeAdaptive(300),
          }}
        >
          {distance && (
            <div
              className="h-full w-full text-center"
              style={{
                fontSize: sizeAdaptive(25),
                lineHeight: sizeAdaptive(25),
              }}
            >
              {distance}
            </div>
          )}
        </div>
        <img
          src="./icon-distance.png"
          alt=""
          className="absolute top-[-60%] right-[12.5%] h-[70%] z-0"
          draggable={false}
        />
      </div>

      {isVisible && tooltipContent && (
        <Tooltip
          title={`${locale.distance} = ${distance}`}
          content={tooltipContent}
          position={position}
          hasCardRef={hasCardRef(tooltipContent)}
          isPinned={isPinned}
        />
      )}
    </>
  );
}
