import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { m } from "motion/react";
import type { LobbySeat } from "../../../types";

export default function SeatLine_self({
  name,
  seat,
}: {
  name: string;
  seat: LobbySeat;
}) {
  return (
    <div
      className="flex items-center h-full justify-center"
      style={{ gap: sizeAdaptive(50) }}
    >
      <h3
        className="h-full"
        style={{
          fontSize: sizeAdaptive(20),
          paddingLeft: sizeAdaptive(50),
          lineHeight: sizeAdaptive(13),
        }}
      >
        1.
      </h3>
      <m.div
        key={0}
        className="h-[70%] aspect-square cursor-pointer"
        style={{ background: seat.color, borderWidth: sizeAdaptive(200) }}
        whileTap={{ scale: 0.8 }}
        transition={{ duration: 0.15 }}
      ></m.div>
      <div
        className="h-full flex items-center justify-center "
        style={{
          gap: sizeAdaptive(50),
          width: sizeAdaptive(3),
          fontSize: sizeAdaptive(20),
          lineHeight: sizeAdaptive(13),
        }}
      >
        {name}
      </div>
    </div>
  );
}
