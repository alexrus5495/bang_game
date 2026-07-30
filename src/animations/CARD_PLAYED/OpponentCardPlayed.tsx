import { m } from "motion/react";
import type { EventType } from "../../types";

export default function OpponentCardPlayed({
  data,
  onComplete,
}: {
  data: EventType["CARD_PLAYED"];
  onComplete: () => void;
}) {
  return <m.div></m.div>;
}
