import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type {
  CardsMetaData,
  Player_PublicData,
  TooltipMessage,
} from "../../../../types";
import { usePublicDataState } from "../../../../stores/hooks/usePublicDataState";
import { processPlayersArray } from "../../../../lib/gameData/processPlayersArray";
import { useEffect, useState } from "react";
import { useSystemLocalization } from "../../../../stores/hooks/useSystemLocalization";
import Tooltip from "../../Tooltip/Tooltip";
import { useTooltip } from "../../../../hooks/useTooltip";
import { useCardsMetaDataState } from "../../../../stores/hooks/useCardsMetaDataState";
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

      //Distance clockwise
      let distanceA = 0;
      for (const player of playersArray) {
        if (player.playerData.id !== playerData.id) {
          if (!player.playerData.isEliminated) distanceA++;
        } else break;
      }

      //Distance couter-clockwise
      let distanceB = 1;
      for (const player of playersArray) {
        if (player.playerData.id !== playerData.id) {
          if (!player.playerData.isEliminated) distanceB++;
        } else distanceB = 1;
      }

      let shortestDistance = Math.min(distanceA, distanceB);

      newTooltipContent.push([
        {
          type: "plainText",
          content: `${locale["tooltip_baseDistance"]}: ${shortestDistance}`,
        },
      ]);

      const mustangCard = playerData.equipment.find((item) =>
        item.startsWith("mustang" + "_"),
      );

      if (mustangCard) {
        shortestDistance++;

        newTooltipContent.push([
          { type: "plainText", content: `+1 ${locale["tooltip_from"]} ` },
          {
            type: "playingCardRef",
            content: cardsMeta.deckMeta[mustangCard],
          },
        ]);
      }

      if (playerData.char === "paul_regret") {
        shortestDistance++;

        newTooltipContent.push([
          { type: "plainText", content: `+1 ${locale["tooltip_from"]} ` },
          {
            type: "charCardRef",
            content: cardsMeta.charDeckMeta["paul_regret"],
          },
        ]);
      }

      setDistance(shortestDistance);
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
            <div className="h-full w-full text-center">{distance}</div>
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
