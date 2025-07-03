import CardFace from "./PlayingCard/CardFace";
import CardScaler from "./shared/CardScaler";
import type { CardProps } from "./types";

export default function PlayingCard({ cardId }: CardProps) {
  return (
    <CardScaler>
      <CardFace cardId={cardId} />
    </CardScaler>
  );
}
