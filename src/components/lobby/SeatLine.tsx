import { useSystemLocalization } from "../../stores/hooks/useSystemLocalization";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import type { LobbyPublicData, LobbySeat } from "../../types";
import KickOutButton from "./KickOutButton";
import ReadySwitch from "./ReadySwitch";
import SeatTypeSwitch from "./SeatTypeSwitch";
import { socket } from "../../lib/socket";

export default function SeatLine({
  index,
  seat,
  lobbyData,
  editMode,
}: {
  index: number;
  seat: LobbySeat;
  lobbyData: LobbyPublicData;
  editMode: boolean;
}) {
  const locale = useSystemLocalization() as Record<string, string>;
  const isLobbyOwner = () => {
    return lobbyData.ownerId === seat.playerId;
  };

  return (
    <>
      <div className="w-[3%]">{index + 1}.</div>
      <div
        className="h-[40%] aspect-square border"
        style={{
          backgroundColor: `${seat.color}`,
          borderWidth: sizeAdaptive(250),
        }}
      ></div>
      <div
        className="w-[50%] flex h-full items-center"
        style={{ gap: sizeAdaptive(100) }}
      >
        <div className="h-[60%] aspect-square border">
          {seat.type === "ai" ? (
            <img alt="robot icon" src="./icon-bot.png" />
          ) : (
            <img alt="person-icon" src="./icon-person.png" />
          )}
        </div>
        <div style={{ fontSize: sizeAdaptive(40) }}>
          {seat.status !== "open"
            ? seat.type === "human"
              ? `${seat.playerName}`
              : `${locale[seat.playerName as string]}`
            : `-${locale["empty"]}-`}
        </div>
        {isLobbyOwner() && (
          <img
            alt="sheriff icon"
            className="h-[40%] aspect-square"
            style={{ marginLeft: sizeAdaptive(90) }}
            src="./sheriff_icon.png"
          />
        )}
      </div>
      {!editMode &&
        seat.type === "human" &&
        seat.status === "occupied" &&
        (seat.playerId === socket.id ? (
          <ReadySwitch lobbyData={lobbyData} seat={seat} />
        ) : (
          <div
            className="text-center w-[35%] m-auto text-stroke-black"
            style={{
              color: seat.isReady ? "var(--GREEN)" : "var(--RED)",
            }}
          >
            {seat.isReady ? locale["lobby_ready"] : locale["lobby_notReady"]}
          </div>
        ))}

      {editMode && (
        <div className="flex items-center justify-center w-[35%] h-full">
          {seat.status === "open" || seat.type === "ai" ? (
            <SeatTypeSwitch seat={seat} lobbyId={lobbyData.id} />
          ) : (
            <KickOutButton
              lobbyData={lobbyData}
              seatId={seat.id}
              isLobbyOwner={isLobbyOwner()}
            />
          )}
        </div>
      )}
    </>
  );
}
