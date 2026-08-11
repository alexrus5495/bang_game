import { useState } from "react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { m } from "motion/react";
import Button from "../../shared/Button";
import Join_idForm from "./Join_idForm";
import Join_passwordForm from "./Join_passwordForm";
import { useTranslation } from "../../../hooks/useTranslation";

export default function MainMenu_navigation_Join({
  setMenuState,
}: {
  setMenuState: (state: string) => void;
}) {
  const t = useTranslation();
  const [playerName, setPlayerName] = useState("");
  const [lobbyId, setLobbyId] = useState("");
  const [currentForm, setCurrentForm] = useState<"idForm" | "passwordForm">(
    "idForm",
  );

  return (
    <div className="h-full w-full">
      <h2
        style={{ fontSize: sizeAdaptive(13) }}
        className={"custom-text-highlighted h-[15%]"}
      >
        {t("join_lobby")}
      </h2>

      {currentForm === "idForm" && (
        <m.div
          key={"idForm"}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
        >
          <Join_idForm
            lobbyId={lobbyId}
            playerName={playerName}
            setLobbyId={setLobbyId}
            setPlayerName={setPlayerName}
            setCurrentForm={setCurrentForm}
          />
        </m.div>
      )}

      {currentForm === "passwordForm" && (
        <m.div
          key={"passwordForm"}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
        >
          <Join_passwordForm lobbyId={lobbyId} playerName={playerName} />
        </m.div>
      )}

      <Button
        className="h-[15%]"
        text={t("back")}
        style={{
          fontSize: sizeAdaptive(16),
          marginTop: "10%",
          justifySelf: "left",
          alignSelf: "start",
        }}
        handler={
          currentForm === "passwordForm"
            ? () => setCurrentForm("idForm")
            : () => setMenuState("home")
        }
      />
    </div>
  );
}
