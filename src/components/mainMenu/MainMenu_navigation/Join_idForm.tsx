import { motion } from "motion/react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import Button from "../../shared/Button";
import { useSocket } from "../../../hooks/useSocket";
import { SocketEvents } from "../../../lib/socketEvents";
import { useState } from "react";
import { useCurrentPageState } from "../../../stores/hooks/useCurrentPageState";
import { useCurrentLobbyState } from "../../../stores/hooks/useCurrentLobbyState";

export default function Join_idForm({
  lobbyId,
  playerName,
  setLobbyId,
  setPlayerName,
  setCurrentForm,
}: {
  lobbyId: string;
  playerName: string;
  setLobbyId: (id: string) => void;
  setPlayerName: (name: string) => void;
  setCurrentForm: (form: "idForm" | "passwordForm") => void;
}) {
  const locale = useSystemLocalization() as Record<string, string>;
  const [showNoLobbyMsg, setShowNoLobbyMsg] = useState<boolean>(false);
  const { socket } = useSocket();
  const setCurrentPage = useCurrentPageState()[1];
  const setCurrentLobby = useCurrentLobbyState()[1];

  const updateLobbyId = (newId: string) => {
    if (showNoLobbyMsg) setShowNoLobbyMsg(false);
    setLobbyId(newId);
  };

  const isIdSatisfies = () => {
    return lobbyId.length > 0 && lobbyId.length <= 20;
  };

  const isNameSatisfies = () => {
    return playerName.length > 0 && playerName.length <= 15;
  };

  const isFormReady = isIdSatisfies() && isNameSatisfies();

  const tryToJoin = async () => {
    socket.emit(SocketEvents.ASK_FOR_LOBBY, lobbyId);

    const result: string = await new Promise((resolve) => {
      socket.once(SocketEvents.ANSWER_ASK_FOR_LOBBY, resolve);
    });

    switch (result) {
      case "none":
        setShowNoLobbyMsg(true);
        break;
      case "private":
        setCurrentForm("passwordForm");
        break;
      case "public":
        socket.emit(SocketEvents.JOIN_LOBBY, lobbyId, {
          playerName: playerName,
          playerId: socket.id,
        });
        setCurrentLobby(lobbyId);
        setCurrentPage("lobby");

        break;
    }
  };
  return (
    <form
      className="flex flex-col justify-center items-center h-[55%]"
      style={{ gap: sizeAdaptive(20) }}
    >
      <motion.input
        type="text"
        value={lobbyId}
        onChange={(e) => updateLobbyId(e.target.value)}
        className="w-[80%] outline [color:var(--BLACK)] pl-[1vw]"
        style={{
          fontSize: sizeAdaptive(20),
          marginTop: "5%",
          outlineWidth: sizeAdaptive(150),
          outlineColor: "var(--BLACK)",
        }}
        placeholder={`${locale["enter_lobby_id"]}...`}
        whileFocus={{ scale: 1.05 }}
        maxLength={20}
      />

      <motion.input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="w-[80%] outline [color:var(--BLACK)] pl-[1vw]"
        style={{
          fontSize: sizeAdaptive(20),
          outlineWidth: sizeAdaptive(150),
          outlineColor: "var(--BLACK)",
        }}
        placeholder={`${locale["enter_as"]}...`}
        whileFocus={{ scale: 1.05 }}
        maxLength={15}
      />

      <Button
        text={showNoLobbyMsg ? locale["lobby_noLobby"] : locale.join}
        style={{
          fontSize: sizeAdaptive(16),
          marginTop: "-5%",
          color: isFormReady
            ? showNoLobbyMsg
              ? "var(--RED)"
              : "var(--BLACK)"
            : "var(--BEIGE)",
        }}
        handler={tryToJoin}
        disabled={!isFormReady || showNoLobbyMsg}
      />
    </form>
  );
}
