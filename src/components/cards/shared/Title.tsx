import type { CSSProperties } from "react";
import { useCardLocalization } from "../../../hooks/useCardLocalization";

export default function CardTitleComponent({
  pack,
  cardTypeId,
  cardType,
}: {
  pack: string;
  cardTypeId: string;
  cardType: string;
}) {
  const title = useCardLocalization(pack, cardTypeId).title;

  let dynamicClasses = {
    height: cardType === "character" ? "70px" : "120px",
    lineHeight: cardType === "character" ? "80px" : "125px",
    fontSize: cardType === "character" ? "85px" : "130px",
    transform: cardType === "character" ? "scaleX(0.95) scaleY(1.05)" : "",
  } as CSSProperties;

  //Special rules for certain cards (e.x. when the line doesn't fit with
  //the standard font size)
  dynamicClasses = applySpecialRules(dynamicClasses, cardTypeId);

  return (
    <p
      className="
        mt-[2px]
        mb-[10px]
        font-oldtown
        text-center
        tracking-normal
        origin-center
        mask-weathered
        pointer-none
        select-none
        "
      style={dynamicClasses}
    >
      {title}
    </p>
  );
}

function applySpecialRules(dynamicClasses: CSSProperties, cardTypeId: string) {
  if (cardTypeId === "carabine" || cardTypeId === "stagecoach") {
    dynamicClasses.fontSize = "100px";
    dynamicClasses.transform = "scaleY(1.3)";
  } else if (
    cardTypeId === "remington" ||
    cardTypeId === "winchester" ||
    cardTypeId === "general_store"
  ) {
    dynamicClasses.fontSize = "110px";
    dynamicClasses.transform = "scaleY(1.2)";
  } else if (cardTypeId === "slab_the_killer") {
    dynamicClasses.fontSize = "80px";
    dynamicClasses.transform = "scaleY(1.1)";
  }

  return dynamicClasses;
}
