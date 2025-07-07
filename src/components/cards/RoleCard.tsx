import CardFace from "./shared/CardFace";
import CardScaler from "./shared/CardScaler";

export default function RoleCard({ cardId }: { cardId: string }) {
  return (
    <CardScaler>
      <CardFace cardId={cardId} cardType={"role"} />
    </CardScaler>
  );
}
