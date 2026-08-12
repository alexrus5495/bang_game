import { useTranslation } from "../../../../hooks/useTranslation";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../../lib/images";
import { socket } from "../../../../lib/socket";
import {
  usePendingInteraction,
  usePlayersController,
} from "../../../../stores/hooks/localStateStore.hooks";
import DecoratedFrame from "../../../shared/DecoratedFrame";

export default function Title() {
  const pendingInteraction = usePendingInteraction();
  const playersController = usePlayersController();
  const t = useTranslation();

  if (!pendingInteraction || pendingInteraction.type !== "GENERAL_STORE")
    return null;

  const currentPickerId = pendingInteraction.currentPickerId;
  const currentPicker = playersController.getPlayerById(currentPickerId);
  const playerName = currentPicker
    ? currentPicker.isAI
      ? t(currentPicker.nickname)
      : currentPicker.nickname
    : "";

  const isCurrentPicker = socket.id === currentPickerId;
  const isStoreReady =
    pendingInteraction.cards.length === pendingInteraction.pickersOrder.length;

  let message: string;
  if (!isStoreReady) {
    message = t("general_store_preparing");
  } else if (isCurrentPicker) {
    message = t("general_store_your_turn");
  } else {
    message = t("general_store_picking", { player: playerName });
  }

  return (
    <DecoratedFrame
      variant={"topArch"}
      className="left-[50%] -translate-x-[50%]"
    >
      <div className="flex-col h-auto">
        <div className="flex h-auto items-center">
          {getImageComponent("decoration_a", {
            className: "h-fit -scale-x-100",
            style: {
              width: sizeAdaptive(11),
              marginLeft: sizeAdaptive(40),
            },
          })}

          <div
            className="text-center h-[50%] select-none"
            style={{
              width: "auto",
              margin: `${sizeAdaptive(80)} ${sizeAdaptive(20)}`,
              fontSize: sizeAdaptive(22),
            }}
          >
            {t("general_store_title")}
          </div>

          {getImageComponent("decoration_a", {
            className: "h-fit",
            style: {
              width: sizeAdaptive(11),

              marginRight: sizeAdaptive(40),
            },
          })}
        </div>

        <div
          className="h-auto flex justify-center items-center"
          style={{ borderTopWidth: sizeAdaptive(420) }}
        >
          {getImageComponent("decoration_b", {
            style: { height: sizeAdaptive(35) },
          })}

          <div
            className="text-center h-[50%] select-none"
            style={{
              width: "auto",
              margin: `${sizeAdaptive(180)} ${sizeAdaptive(20)}`,
              fontSize: sizeAdaptive(30),
            }}
          >
            {message}
          </div>

          {getImageComponent("decoration_b", {
            className: "rotate-180",
            style: { height: sizeAdaptive(35) },
          })}
        </div>
      </div>
    </DecoratedFrame>
  );
}
