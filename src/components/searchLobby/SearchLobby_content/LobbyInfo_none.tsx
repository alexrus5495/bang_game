import { useTranslation } from "../../../hooks/useTranslation";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";

export default function LobbyInfo_none() {
  const t = useTranslation();
  return (
    <div className="w-full h-[80%] flex justify-center items-center">
      <div style={{ fontSize: sizeAdaptive(25) }}>{t("lobbyInfo_none")}</div>
    </div>
  );
}
