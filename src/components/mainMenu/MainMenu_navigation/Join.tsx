import { useState } from "react";
import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import { motion } from "motion/react";
import { sizeAdaptive } from "../../../cssFunctions";
import Button from "../../shared/Button";

export default function MainMenu_navigation_Join({
  setMenuState,
}: {
  setMenuState: (state: string) => void;
}) {
  const [playerName, setPlayerName] = useState("");
  const [lobbyId, setLobbyId] = useState("");

  const locale = useSystemLocalization() as Record<string, string>;

  function handleSubmit() {}

  const TEXT_SCALE_FACTOR_1 = 13;
  const TEXT_SCALE_FACTOR_2 = 20;
  const TEXT_SCALE_FACTOR_3 = 16;

  return (
    <>
      <h2
        style={{ fontSize: sizeAdaptive(TEXT_SCALE_FACTOR_1) }}
        className={"custom-text-highlighted"}
      >
        {locale["join_lobby"]}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
        style={{ gap: sizeAdaptive(20) }}
      >
        <motion.input
          type="text"
          value={lobbyId}
          onChange={(e) => setLobbyId(e.target.value)}
          className="w-[80%] outline [color:var(--BLACK)] pl-[1vw]"
          style={{
            fontSize: sizeAdaptive(TEXT_SCALE_FACTOR_2),
            marginTop: "5%",
            outlineWidth: sizeAdaptive(150),
            outlineColor: "var(--BLACK)",
          }}
          placeholder={`${locale["enter_lobby_id"]}...`}
          whileFocus={{ scale: 1.05 }}
        />

        <motion.input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-[80%] outline [color:var(--BLACK)] pl-[1vw]"
          style={{
            fontSize: sizeAdaptive(TEXT_SCALE_FACTOR_2),
            outlineWidth: sizeAdaptive(150),
            outlineColor: "var(--BLACK)",
          }}
          placeholder={`${locale["enter_as"]}...`}
          whileFocus={{ scale: 1.05 }}
        />

        <Button
          text={locale.join}
          style={{
            fontSize: sizeAdaptive(TEXT_SCALE_FACTOR_3),
            marginTop: "-5%",
          }}
          handler={() => console.log("PLUG")}
        />
      </form>

      <Button
        text={locale.back}
        style={{
          fontSize: sizeAdaptive(TEXT_SCALE_FACTOR_3),
          marginTop: "10%",
          justifySelf: "left",
          alignSelf: "start",
        }}
        handler={() => setMenuState("home")}
      />
    </>
  );
}
