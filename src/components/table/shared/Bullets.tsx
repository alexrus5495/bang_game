import type { Player_PublicData } from "../../../types";
import { getImageComponent } from "../../../lib/images";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";

export default function Bullets({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  const maxHealth = playerData.stats.health.max;
  const currentHealth = playerData.stats.health.current;
  if (!maxHealth) return null;

  return (
    <>
      {Array.from({ length: maxHealth }, (_, index) => (
        <div
          className="h-full w-[8%]"
          key={index}
          style={{ marginBottom: sizeAdaptive(35) }}
        >
          {index <= currentHealth - 1
            ? getImageComponent("bullet_full_V", {
                draggable: false,
                className: "h-full w-auto",
              })
            : getImageComponent("bullet_empty_V", { draggable: false })}
        </div>
      ))}
    </>
  );
}
