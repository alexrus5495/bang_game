import { useCardLocalization } from "../../../stores/hooks/useCardLocalization";
import { getImageComponent } from "../../../lib/images";

export function TextBlock({
  textKey,
  packKey,
}: {
  textKey: string;
  packKey: string;
}) {
  const localizationData = useCardLocalization(packKey, textKey);
  const text = localizationData.desc;
  return (
    <p
      className="
        font-palatino
        text-[29px]
        leading-[35px]
        text-center
      "
    >
      {text}
    </p>
  );
}

export function SymbolBlock({
  symbolKey,
  totalLinesNumber,
}: {
  symbolKey: string;
  totalLinesNumber: number;
}) {
  let dynamicClasses = "";

  //Basic tweaks
  if (totalLinesNumber === 1) {
    dynamicClasses = "pt-[25px] pb-[25px]";
  }

  //Card specific tweaks
  if (totalLinesNumber !== 1 && symbolKey === "heal") {
    dynamicClasses = `${dynamicClasses} scale-[1.2]`;
  } else if (totalLinesNumber === 1 && symbolKey === "all") {
    dynamicClasses = `${dynamicClasses} scale-[0.8]`;
  }

  const symbolClasses = `h-full ${dynamicClasses}`;

  return (
    <>
      {getImageComponent(symbolKey, {
        className: `${symbolClasses}`,
      })}
    </>
  );
}
