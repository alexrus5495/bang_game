import { useState } from "react";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import { useSystemLocalization } from "../../hooks/useSystemLocalization";
import Button from "../shared/Button";
import SeatController from "./CreateLobby_content/SeatController";
import CreateLobby_form from "./CreateLobby_content/CreateLobby_form";
import CreateLobby_seatDisplay from "./CreateLobby_content/CreateLobby_seatDisplay";
import { useSocket } from "../../hooks/useSocket";
import type { LobbyConfig } from "../../types";
import { setCurrentPage } from "../../store/slices/currentPageSlice";
import { setCurrentLobby } from "../../store/slices/currentLobbySlice";
import { useAppDispatch } from "../../hooks/useAppSelector";
import { blankLobbyConfig } from "../../config/blankLobby.config";
import { SocketEvents } from "../../lib/socketEvents";

export default function CreateLobby_content() {
  const locale = useSystemLocalization() as Record<string, string>;
  const dispatch = useAppDispatch();
  const [lobbyConfig, setLobbyConfig] = useState<LobbyConfig>(blankLobbyConfig);
  const { socket } = useSocket();

  const isFormReady =
    lobbyConfig.lobbyName.length !== 0 &&
    lobbyConfig.playerName.length !== 0 &&
    (!lobbyConfig.isPrivate || lobbyConfig.password.length !== 0);

  const handleSubmit = async () => {
    if (!socket.id) {
      return;
    } else {
      socket.emit(SocketEvents.CREATE_LOBBY, lobbyConfig);

      const lobbyId: string = await new Promise((resolve) => {
        socket.once(SocketEvents.LOBBY_CREATED, resolve);
      });

      dispatch(setCurrentLobby(lobbyId));
      dispatch(setCurrentPage("lobby"));
    }
  };

  return (
    <>
      <div className="w-[60%] h-[80%] relative flex flex-col justify-between">
        <div className="flex justify-center items-center">
          <Button
            text={locale.back}
            className={"absolute"}
            handler={() => dispatch(setCurrentPage("mainMenu"))}
            style={{ fontSize: sizeAdaptive(16), left: sizeAdaptive(18) }}
          />

          <h2
            className="custom-text-highlighted"
            style={{ fontSize: sizeAdaptive(13) }}
          >
            {locale["create_lobby"]}
          </h2>
        </div>

        <form className="w-full h-[85%] flex flex-col items-center">
          <div className="w-full h-[85%] flex justify-between items-center">
            <div className="h-full w-[54.5%] pl-[5%] flex flex-col">
              <CreateLobby_form
                lobbyConfig={lobbyConfig}
                setLobbyConfig={setLobbyConfig}
              />
            </div>

            <span className="h-[100%] w-[0.5%] bg-[var(--BLACK)]"></span>

            <div className="h-full w-[45%]">
              <SeatController
                lobbyConfig={lobbyConfig}
                setLobbyConfig={setLobbyConfig}
              />

              <CreateLobby_seatDisplay
                lobbyConfig={lobbyConfig}
                setLobbyConfig={setLobbyConfig}
              />
            </div>
          </div>

          <div className="full h-[15%]">
            <Button
              text={locale.done}
              className="self-center"
              handler={handleSubmit}
              style={{
                fontSize: sizeAdaptive(16),
                paddingTop: sizeAdaptive(50),
                color: isFormReady ? "var(--BLACK)" : "var(--BEIGE)",
              }}
              disabled={!isFormReady}
            />
          </div>
        </form>
      </div>
    </>
  );
}
