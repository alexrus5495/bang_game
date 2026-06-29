import { getImageComponent } from "../../../lib/images";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import React, { useMemo } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { useLocalStateStore } from "../../../stores/localStateStore";

const Bullets = React.memo(({ playerId }: { playerId: string }) => {
  const health = useStore(
    useLocalStateStore,
    useShallow((state) => state.playersController.getPlayerHealth(playerId)),
  );

  const maxHealth = health.max;
  const currentHealth = health.current;

  const imageElementBulletFull = useMemo(() => {
    return getImageComponent("bullet_full_V", {
      draggable: false,
      className: "h-full w-auto",
    });
  }, []);

  const imageElementBulletEmpty = useMemo(() => {
    return getImageComponent("bullet_empty_V", {
      draggable: false,
      className: "h-full w-auto",
    });
  }, []);

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
            ? imageElementBulletFull
            : imageElementBulletEmpty}
        </div>
      ))}
    </>
  );
});

export default Bullets;
