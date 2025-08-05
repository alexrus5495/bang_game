import { useState } from "react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { motion } from "motion/react";
import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import Button from "../../shared/Button";
import { useSocket } from "../../../hooks/useSocket";
import { SocketEvents } from "../../../lib/socketEvents";
import { useAppDispatch } from "../../../hooks/useAppSelector";
import { setCurrentLobby } from "../../../store/slices/currentLobbySlice";
import { setCurrentPage } from "../../../store/slices/currentPageSlice";

export default function Join_passwordForm({
  lobbyId,
  playerName,
}: {
  lobbyId: string;
  playerName: string;
}) {
  const [password, setPassword] = useState<string>("");
  const [showWrongPasswordMsg, setShowWrongPasswordMsg] =
    useState<boolean>(false);

  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const locale = useSystemLocalization() as Record<string, string>;
  const isFormReady = password.length > 0 && password.length <= 15;

  const updatePassword = (newPassword: string) => {
    if (showWrongPasswordMsg) setShowWrongPasswordMsg(false);
    setPassword(newPassword);
  };

  const tryToJoin = async () => {
    if (!socket.id) return;

    socket.emit(
      SocketEvents.JOIN_LOBBY,
      lobbyId,
      { playerName: playerName, playerId: socket.id },
      password,
    );

    const result: boolean = await new Promise((resolve) => {
      socket.once(SocketEvents.ANSWER_TEST_PASSWORD, resolve);
    });

    if (result) {
      dispatch(setCurrentLobby(lobbyId));
      dispatch(setCurrentPage("lobby"));
    } else {
      setShowWrongPasswordMsg(true);
      setPassword("");
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center h-[55%]"
      style={{ gap: sizeAdaptive(20) }}
    >
      <motion.input
        type="text"
        value={password}
        onChange={(e) => updatePassword(e.target.value)}
        className="w-[80%] outline [color:var(--BLACK)] pl-[1vw]"
        style={{
          fontSize: sizeAdaptive(20),
          marginTop: "5%",
          outlineWidth: sizeAdaptive(150),
          outlineColor: "var(--BLACK)",
        }}
        placeholder={`${locale["enter_password"]}...`}
        whileFocus={{ scale: 1.05 }}
        maxLength={15}
      />

      <Button
        text={showWrongPasswordMsg ? locale["password_wrong"] : locale.join}
        style={{
          fontSize: sizeAdaptive(16),
          marginTop: "-5%",
          color: isFormReady
            ? showWrongPasswordMsg
              ? "var(--RED)"
              : "var(--BLACK)"
            : "var(--BEIGE)",
        }}
        handler={tryToJoin}
        disabled={!isFormReady || showWrongPasswordMsg}
      />
    </form>
  );
}
