import CardFace from "./shared/CardFace";
import CardScaler from "./shared/CardScaler";

export default function CharacterCard({ cardId }: { cardId: string }) {
  return (
    <CardScaler>
      <CardFace cardId={cardId} cardType={"character"} />
    </CardScaler>
  );
}
