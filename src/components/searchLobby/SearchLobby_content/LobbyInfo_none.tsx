import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";

export default function LobbyInfo_none() {
  const locale = useSystemLocalization();
  return (
    <div className="w-full h-[80%] flex justify-center items-center">
      <div style={{ fontSize: sizeAdaptive(25) }}>
        {locale["lobbyInfo_none"]}
      </div>
    </div>
  );
}
