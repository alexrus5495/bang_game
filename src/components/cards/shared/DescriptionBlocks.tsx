import { useCardLocalization } from "../../../hooks/useCardLocalization";
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
        text-[21px]
        leading-none
        text-center
        italic
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
  let mt, mb;
  if (totalLinesNumber === 1) {
    mt = "pt-[35px]";
    mb = "pb-[35px]";
  } else {
    mt = "pt-[10px]";
    mb = "pb-[10px]";
  }

  const symbolClasses = `h-full ${mt} ${mb}`;

  return (
    <>
      {getImageComponent(symbolKey, {
        className: `${symbolClasses}`,
      })}
    </>
  );
}
