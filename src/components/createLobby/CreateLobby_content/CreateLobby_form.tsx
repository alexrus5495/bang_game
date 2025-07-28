import type React from "react";
import { sizeAdaptive } from "../../../cssFunctions";
import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import type { LobbyConfig } from "../CreateLobby_content";
import FormCheckboxInput from "./FormCheckboxInput";
import FormTextInput from "./FormTextInput";

export default function CreateLobby_form({
  lobbyConfig,
  setLobbyConfig,
}: {
  lobbyConfig: LobbyConfig;
  setLobbyConfig: React.Dispatch<React.SetStateAction<LobbyConfig>>;
}) {
  const locale = useSystemLocalization() as Record<string, string>;

  const updateLobbyName = (newName: string) => {
    const updatedPlayerConfig = { ...lobbyConfig, lobbyName: newName };
    setLobbyConfig(updatedPlayerConfig);
  };

  const updatePlayerName = (newName: string) => {
    const updatedPlayerConfig = { ...lobbyConfig, playerName: newName };
    setLobbyConfig(updatedPlayerConfig);
  };

  const updatePassword = (newPassword: string) => {
    const updatedPlayerConfig = { ...lobbyConfig, password: newPassword };
    setLobbyConfig(updatedPlayerConfig);
  };

  const toggleIsPrivate = () => {
    const newValue = !lobbyConfig.isPrivate;
    const updatedPlayerConfig = { ...lobbyConfig, isPrivate: newValue };
    setLobbyConfig(updatedPlayerConfig);
  };

  return (
    <div className="flex flex-col" style={{ gap: sizeAdaptive(35) }}>
      <FormTextInput
        inputName={"lobbyName"}
        text={locale.name}
        state={lobbyConfig.lobbyName}
        handler={updateLobbyName}
      />

      <FormCheckboxInput
        inputName={"isPrivate"}
        text={locale.private}
        state={lobbyConfig.isPrivate}
        handler={toggleIsPrivate}
      />

      <FormTextInput
        inputName={"password"}
        text={locale.password}
        state={lobbyConfig.password}
        handler={updatePassword}
        isDisabled={!lobbyConfig.isPrivate}
      />

      <FormTextInput
        inputName={"playerName"}
        text={locale["your_name"]}
        state={lobbyConfig.playerName}
        handler={updatePlayerName}
      />
    </div>
  );
}
