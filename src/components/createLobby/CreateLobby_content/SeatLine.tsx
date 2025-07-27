import { sizeAdaptive } from "../../../cssFunctions";
import { motion } from "motion/react";
import type { LobbySeat } from "../CreateLobby_content";
import { useSystemLocalization } from "../../../hooks/useSystemLocalization";

export default function SeatLine({
  seat,
  index,
  setSeatType,
}: {
  seat: LobbySeat;
  index: number;
  setSeatType: (seatIndex: number, type: "human" | "ai") => void;
}) {
  const locale = useSystemLocalization() as Record<string, string>;

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
      <motion.div
        key={index}
        className="h-[70%] aspect-square cursor-pointer"
        style={{ background: seat.color, borderWidth: sizeAdaptive(200) }}
        whileTap={{ scale: 0.8 }}
        transition={{ duration: 0.15 }}
      ></motion.div>
      <div
        className="h-full w-fit flex items-center"
        style={{ gap: sizeAdaptive(50) }}
      >
        <motion.button
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
          {locale.human}
        </motion.button>

        <span
          className="h-[60%] bg-[var(--BLACK)]"
          style={{ width: sizeAdaptive(250) }}
        ></span>

        <motion.button
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
          {locale.ai}
        </motion.button>
      </div>
    </div>
  );
}
