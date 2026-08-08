import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import Button from "../../shared/Button";
import { useState } from "react";
import FormTextInput from "../../createLobby/CreateLobby_content/FormTextInput";
import type { LobbyPublicData } from "../../../types";
import { SocketEvents } from "../../../lib/socketEvents";
import { useCurrentLobbyState } from "../../../stores/hooks/useCurrentLobbyState";
import { useCurrentPageState } from "../../../stores/hooks/useCurrentPageState";
import { socket } from "../../../lib/socket";

export default function LobbyInfo_private({
  selectedLobbyData,
}: {
  selectedLobbyData: LobbyPublicData;
}) {
  const locale = useSystemLocalization();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [showWrongPasswordMsg, setShowWrongPasswordMsg] =
    useState<boolean>(false);

  const setCurrentLobby = useCurrentLobbyState()[1];
  const setCurrentPage = useCurrentPageState()[1];

  const isNameSatisfies = () => {
    return playerName.length > 0 && playerName.length <= 15;
  };

  const isPasswordSatisfies = () => {
    return password.length > 0 && password.length <= 15;
  };

  const isFormSatisfies = () => {
    return isNameSatisfies() && isPasswordSatisfies();
  };

  const updatePassword = (newPassword: string) => {
    if (showWrongPasswordMsg) setShowWrongPasswordMsg(false);
    setPassword(newPassword);
  };

  const tryToJoin = async () => {
    if (!socket.id) return;

    socket.emit(
      SocketEvents.JOIN_LOBBY,
      selectedLobbyData.id,
      { playerName: playerName, playerId: socket.id },
      password,
    );

    const result: boolean = await new Promise((resolve) => {
      socket.once(SocketEvents.ANSWER_TEST_PASSWORD, resolve);
    });

    if (result) {
      setCurrentLobby(selectedLobbyData.id);
      setCurrentPage("lobby");
    } else {
      setShowWrongPasswordMsg(true);
      setPassword("");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[80%] flex justify-center items-center">
        {!showForm ? (
          <div style={{ fontSize: sizeAdaptive(25) }}>
            {locale["lobbyInfo_private"]}
          </div>
        ) : (
          <div
            className="w-full h-full flex flex-col justify-center items-center"
            style={{ gap: sizeAdaptive(50) }}
          >
            <FormTextInput
              inputName={"playerName"}
              text={locale["enter_as"]}
              state={playerName}
              handler={setPlayerName}
              className="justify-center items-center"
              style={{ fontSize: sizeAdaptive(150) }}
            />
            <FormTextInput
              inputName={"password"}
              text={locale.password}
              state={password}
              handler={updatePassword}
              className="justify-center items-center"
              style={{ fontSize: sizeAdaptive(150) }}
            />

            <Button
              text={
                showWrongPasswordMsg ? locale["password_wrong"] : locale.join
              }
              style={{
                fontSize: sizeAdaptive(20),
                color: showWrongPasswordMsg
                  ? "var(--RED)"
                  : password.length === 0
                    ? "var(--BEIGE)"
                    : "var(--BLACK)",
              }}
              disabled={!isFormSatisfies()}
              handler={tryToJoin}
            />
          </div>
        )}
      </div>
      <div className="h-[20%] w-full flex flex-col justify-center items-center">
        {!showForm ? (
          <Button
            text={locale.join}
            style={{ fontSize: sizeAdaptive(20) }}
            handler={() => setShowForm(true)}
          />
        ) : (
          <Button
            text={locale.back}
            style={{ fontSize: sizeAdaptive(20) }}
            handler={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}
