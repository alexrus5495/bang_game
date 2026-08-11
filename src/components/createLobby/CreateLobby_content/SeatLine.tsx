import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { m } from "motion/react";
import type { LobbySeat } from "../../../types";
import { useTranslation } from "../../../hooks/useTranslation";

export default function SeatLine({
  seat,
  index,
  setSeatType,
}: {
  seat: LobbySeat;
  index: number;
  setSeatType: (seatIndex: number, type: "human" | "ai") => void;
}) {
  const t = useTranslation();

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
        {`${index + 1}.`}
      </h3>
      <m.div
        key={seat.id}
        className="h-[70%] aspect-square cursor-pointer"
        style={{ background: seat.color, borderWidth: sizeAdaptive(200) }}
        whileTap={{ scale: 0.8 }}
        transition={{ duration: 0.15 }}
      ></m.div>
      <div
        className="h-full flex items-center justify-center"
        style={{ gap: sizeAdaptive(50), width: sizeAdaptive(3) }}
      >
        <m.button
          type="button"
          className="h-full cursor-pointer"
          style={{
            fontSize: sizeAdaptive(20),
            lineHeight: sizeAdaptive(13),
            color: seat.type === "human" ? "var(--BlACK)" : "var(--BEIGE)",
          }}
          onClick={() => setSeatType(index, "human")}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          {t("human")}
        </m.button>

        <span
          className="h-[60%] bg-[var(--BLACK)]"
          style={{ width: sizeAdaptive(250) }}
        ></span>

        <m.button
          type="button"
          className="h-full cursor-pointer"
          style={{
            fontSize: sizeAdaptive(20),
            lineHeight: sizeAdaptive(13),
            color: seat.type === "ai" ? "var(--BlACK)" : "var(--BEIGE)",
          }}
          onClick={() => setSeatType(index, "ai")}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          {t("ai")}
        </m.button>
      </div>
    </div>
  );
}
