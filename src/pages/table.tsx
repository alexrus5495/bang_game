import { useCurrentLobbyState } from "../stores/hooks/useCurrentLobbyState";
import OtherPlayersDisplay from "../components/table/OtherPlayersDisplay";
import CentralPanel from "../components/table/CentralPanel";
import { useCardsMetaDataState } from "../stores/hooks/useCardsMetaDataState";
import PlayerArea from "../components/table/PlayerArea";
import { AnchorsProvider } from "../contexts/AnchorsContext";
import { useTableSocketHandlers } from "../hooks/useTableSocketHandlers";
import { EventProcessor } from "../components/table/EventProcessor";
import DEV_CONTROLLER from "../DEV_CONTROLLER/DEV_CONTROLLER";
import MainDisplay from "../components/table/MainDisplay";
import { socket } from "../lib/socket";
import type { ReactNode } from "react";
import Prompts from "../components/table/Prompts";
import { useGameEventsStore } from "../stores/gameEventsStore";

function TableContent() {
  const lobbyId = useCurrentLobbyState()[0];
  const setCardsMeta = useCardsMetaDataState()[1];
  const setGameEvents = useGameEventsStore((s) => s.setEvents);

  //Setup Socket Events
  useTableSocketHandlers({
    socket,
    lobbyId,
    setCardsMeta,
    setGameEvents,
  });

  if (!socket.id) return null;

  return (
    <div className="absolute h-[100vh] w-[100vw] flex flex-row justify-center items-center ">
      <DEV_CONTROLLER />
      <Prompts />

      <Letterbox>
        <MainDisplay
          className={"w-[18%] h-auto absolute top-0 flex flex-col items-center"}
        />
        <OtherPlayersDisplay className={"w-full h-[60%]"} />
        <CentralPanel className={"h-[35%] w-[43%] absolute top-[26%]"} />
        <PlayerArea className={"w-full h-[40%] z-[10]"} />
      </Letterbox>
    </div>
  );
}

function Letterbox({ children }: { children: ReactNode }) {
  return (
    <div
      className="w-full absolute select-none flex flex-col justify-center items-center"
      style={{ height: "min(51vw, 100vh)", width: "min(100vw, 196vh)" }}
    >
      {children}
    </div>
  );
}

export default function Table() {
  return (
    <AnchorsProvider>
      <EventProcessor>
        <TableContent />
      </EventProcessor>
    </AnchorsProvider>
  );
}
