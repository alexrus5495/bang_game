import type { EventType } from "../../../types";

export default function OpponentCardEquipped({
  id,
  data,
  onComplete,
}: {
  id: number;
  data: EventType["CARD_EQUIPPED"];
  onComplete: () => void;
}) {
  return <div></div>;
}
