import { useState } from "react";
import { sizeAdaptive } from "../../cssFunctions";
import { useSystemLocalization } from "../../hooks/useSystemLocalization";
import Button from "../shared/Button";
import SeatController from "./CreateLobby_content/SeatController";
import CreateLobby_form from "./CreateLobby_content/CreateLobby_form";
import CreateLobby_seatDisplay from "./CreateLobby_content/CreateLobby_seatDisplay";
import { PLAYER_COLORS } from "../../config/player.colors";

export type LobbyConfig = {
  lobbyName: string;
  playerName: string;
  isPrivate: boolean;
  password: string;
  numberOfSeats: number;
  seats: LobbySeat[];
};

export type LobbySeat = {
  color: string;
  type: "human" | "ai";
};

export default function CreateLobby_content({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) {
  const locale = useSystemLocalization() as Record<string, string>;

  const blankLobbyConfig: LobbyConfig = {
    lobbyName: "",
    playerName: "",
    isPrivate: true,
    password: "",
    numberOfSeats: 4,
    seats: [
      { color: PLAYER_COLORS[0], type: "human" },
      { color: PLAYER_COLORS[1], type: "human" },
      { color: PLAYER_COLORS[2], type: "human" },
      { color: PLAYER_COLORS[3], type: "human" },
    ],
  } as const;

  const [lobbyConfig, setLobbyConfig] = useState<LobbyConfig>(blankLobbyConfig);

  return (
    <>
      <div className="w-[60%] h-[80%] relative flex flex-col justify-between">
        <div className="flex justify-center items-center">
          <Button
            text={locale.back}
            className={"absolute"}
            handler={() => setCurrentPage("mainMenu")}
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
              handler={() => console.log("BLANK")}
              style={{
                fontSize: sizeAdaptive(16),
                paddingTop: sizeAdaptive(50),
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
}
