import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../lib/images";
import type { Player_PublicData } from "../../../types";

export default function CharPortrait({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  const isEliminated = playerData.isEliminated;

  return (
    <>
      <div
        className="h-full aspect-square rounded-[25%] bg-[var(--WHITE)] relative overflow-hidden outline"
        style={{
          borderColor: playerData.color,
          borderWidth: sizeAdaptive(180),
          outlineColor: "var(--BLACK)",
          outlineWidth: sizeAdaptive(400),
        }}
      >
        {playerData.char &&
          getImageComponent(playerData.char, {
            className: "h-full w-full",
            draggable: false,
          })}

        {isEliminated && (
          <div className="absolute inset-0 bg-[var(--RED)]/60" />
        )}
      </div>
    </>
  );
}
