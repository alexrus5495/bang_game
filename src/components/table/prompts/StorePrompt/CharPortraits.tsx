import { useEffect, useState } from "react";
import type { AnchorId } from "../../../../contexts/AnchorsContext";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import { socket } from "../../../../lib/socket";
import {
  usePendingInteraction,
  usePlayersController,
} from "../../../../stores/hooks/localStateStore.hooks";
import AnimationAnchor from "../../shared/AnimationAnchor";
import CharPortrait from "../../shared/CharPortrait";
import { SocketEvents } from "../../../../lib/socketEvents";
import { ProgressText } from "../../shared/ProgressText"; // Наш новый компонент
import type { BroadcastedTimerData } from "../../../../types";
import { getImageComponent } from "../../../../lib/images";
import { useTranslation } from "../../../../hooks/useTranslation";

export default function CharPortraits({
  playersOrder,
}: {
  playersOrder: string[];
}) {
  return (
    <>
      {playersOrder.map((player, index) => (
        <CharPortraitItem key={`${player}-${index}`} playerId={player} />
      ))}
    </>
  );
}

function CharPortraitItem({ playerId }: { playerId: string }) {
  const pendingInteraction = usePendingInteraction();
  const playersController = usePlayersController();
  const t = useTranslation();

  const playerData = playersController.getPlayerById(playerId);

  const [timerData, setTimerData] = useState<null | BroadcastedTimerData>(null);
  const [hasStartedTimer, setHasStartedTimer] = useState(false);

  const isTimerActive =
    timerData?.timerId === `player${playerData?.id}_storeSelection`;

  useEffect(() => {
    if (isTimerActive) {
      setHasStartedTimer(true);
    }
  }, [isTimerActive]);

  useEffect(() => {
    const onSendTimerUpdate = (data: BroadcastedTimerData) => {
      setTimerData(data);
    };

    socket.on(SocketEvents.SEND_TIMER_UPDATE, onSendTimerUpdate);

    return () => {
      socket.off(SocketEvents.SEND_TIMER_UPDATE, onSendTimerUpdate);
    };
  }, []);

  if (!pendingInteraction || pendingInteraction.type !== "GENERAL_STORE")
    return null;
  if (!playerData) return null;

  const isClient = playerData.id === socket.id;
  const anchorId: AnchorId = {
    type: "interaction-char",
    playerId,
  };

  const isCurrentPicker = pendingInteraction.currentPickerId === playerId;
  const isFinished = pendingInteraction.finishedPickers.includes(playerId);

  const hasCompletedPick =
    isFinished || (hasStartedTimer && !isTimerActive && isCurrentPicker);

  let StatusIcon = null;
  if (isFinished) StatusIcon = getImageComponent("checkmark");
  if (isCurrentPicker && !hasCompletedPick)
    StatusIcon = getImageComponent("icon-hourglass", {
      className: "h-[85%]",
      style: { transform: "translateY(2%)" },
    });

  const nickname = isClient
    ? playerData.nickname
    : t(playerData?.nickname ?? "");

  return (
    <div
      className="relative h-auto flex flex-col justify-center items-center"
      style={{
        width: sizeAdaptive(5),
      }}
    >
      <div className="h-[50%] w-auto relative">
        <AnimationAnchor id={anchorId} className="h-full w-full absolute" />
        <CharPortrait playerId={playerId} tooltipDisabled={true} />
      </div>

      <ProgressText
        currentValue={timerData?.currentValue ?? null}
        maxValue={timerData?.maxValue ?? null}
        isCompleted={hasCompletedPick}
        className="w-auto text-center truncate"
        style={{
          marginTop: sizeAdaptive(90),
          fontSize: sizeAdaptive(25),
        }}
        disabled={!isTimerActive}
      >
        {nickname}
      </ProgressText>

      {StatusIcon && (
        <div
          className="absolute top-[8%] right-[18%] border aspect-square rounded-[50%] overflow-hidden bg-paperTexture-yellow flex justify-center items-center"
          style={{
            borderColor: "var(--BLACK)",
            borderWidth: sizeAdaptive(270),
            height: sizeAdaptive(25),
          }}
        >
          {StatusIcon}
        </div>
      )}
    </div>
  );
}
