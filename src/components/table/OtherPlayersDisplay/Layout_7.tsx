import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import OtherPlayerPanel from "./OtherPlayerPanel";
import { useRotatedPlayerIds } from "../../../hooks/useRotatedPlayerIds";

export default function Layout_7() {
  const ids = useRotatedPlayerIds();

  return (
    <div
      className="flex flex-col w-full h-full justify-start"
      style={{
        paddingLeft: sizeAdaptive(80),
        paddingRight: sizeAdaptive(80),
        gap: sizeAdaptive(100),
      }}
    >
      <div className="w-full h-[33%] flex justify-between">
        <OtherPlayerPanel playerId={ids[3]} />
        <OtherPlayerPanel playerId={ids[4]} />
      </div>
      <div className="w-full h-[33%] flex justify-between">
        <OtherPlayerPanel playerId={ids[2]} />
        <OtherPlayerPanel playerId={ids[5]} />
      </div>
      <div className="w-full h-[33%] flex justify-between">
        <OtherPlayerPanel playerId={ids[1]} />
        <OtherPlayerPanel playerId={ids[6]} />
      </div>
    </div>
  );
}
