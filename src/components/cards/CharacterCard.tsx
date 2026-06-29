import React from "react";
import CardFace from "./shared/CardFace";
import CardScaler from "./shared/CardScaler";

const CharacterCard = React.memo(({ cardId }: { cardId: string }) => {
  return (
    <CardScaler>
      <CardFace cardId={cardId} cardType={"character"} />
    </CardScaler>
  );
});

export default CharacterCard;
