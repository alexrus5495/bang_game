import { useState } from "react";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import type { LobbyPublicData } from "../../types";
import { m } from "motion/react";
import { useTranslation } from "../../hooks/useTranslation";

export default function LobbyTitle({
  lobbyData,
}: {
  lobbyData: LobbyPublicData | null;
}) {
  const [idCopied, setIdCopied] = useState<boolean>(false);
  const t = useTranslation();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Error copying to clipboard: ", err);
    }
  };

  const handleClickCopy = async (text: string) => {
    await copyToClipboard(text);
    setIdCopied(true);

    setTimeout(() => setIdCopied(false), 4000);
  };

  return (
    <div className="flex flex-col justify-center w-[70%]">
      <h2
        className="custom-text-highlighted text-center"
        style={{ fontSize: sizeAdaptive(13) }}
      >
        {lobbyData ? `${lobbyData.name}` : t("lobby_noLobby")}
      </h2>
      <div
        className="flex justify-center"
        style={{ fontSize: sizeAdaptive(33), gap: sizeAdaptive(30) }}
      >
        <h3>{lobbyData ? `ID: ${lobbyData.id}` : t("lobby_noLobby")}</h3>
        <m.button
          type="button"
          className={`${idCopied ? "" : "cursor-pointer"} w-[8%]`}
          onClick={
            lobbyData && !idCopied
              ? () => handleClickCopy(lobbyData.id)
              : undefined
          }
          whileHover={{ scale: idCopied ? 1 : 1.3 }}
        >
          {idCopied ? t("lobby_copied") : t("lobby_copy")}
        </m.button>
      </div>
    </div>
  );
}
