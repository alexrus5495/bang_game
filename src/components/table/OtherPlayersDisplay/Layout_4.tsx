import { useRotatedPlayerIds } from "../../../hooks/useRotatedPlayerIds";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import OtherPlayerPanel from "./OtherPlayerPanel";

export default function Layout_4() {
  const ids = useRotatedPlayerIds();
  return (
    <div
      className="flex flex-col w-full h-full justify-start"
      style={{ paddingLeft: sizeAdaptive(80), paddingRight: sizeAdaptive(80) }}
    >
      <div className="w-full h-[33%] flex justify-center">
        <OtherPlayerPanel playerId={ids[2]} />
      </div>
      <div className="w-full h-[33%]  flex justify-between">
        <OtherPlayerPanel playerId={ids[1]} />
        <OtherPlayerPanel playerId={ids[3]} />
      </div>
    </div>
  );
}
