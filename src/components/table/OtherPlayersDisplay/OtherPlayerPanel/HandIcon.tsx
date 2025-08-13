import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { Player_PublicData } from "../../../../types";

export default function HandIcon({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  return (
    <div className="h-full aspect-square">
      <div
        className="h-full aspect-square border rounded-[50%] bg-[var(--BEIGE)] relative z-1"
        style={{
          borderWidth: sizeAdaptive(300),
        }}
      >
        <div
          className="h-full w-full text-center"
          style={{
            fontSize: sizeAdaptive(25),
            lineHeight: sizeAdaptive(25),
          }}
        >
          {playerData.handLength}
        </div>
      </div>
      <img
        src="./cards.png"
        alt=""
        className="absolute h-[90%] border border-white object-contain z-0"
        style={{ top: "-60%", right: "-1.5%" }}
        draggable={false}
      />
    </div>
  );
}
