import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../lib/images";
import { useMemo } from "react";

const rangeSymbols = ["one", "two", "three", "four", "five"];
const drawRangeSymbols = ["range_hearts", "range_spades_2-9"];

export default function CardSymbolDescription({
  symbol,
  cardIsWeapon,
}: {
  symbol: string;
  cardIsWeapon: boolean;
}) {
  const locale = useSystemLocalization() as Record<string, string>;

  const symbolIsRange = rangeSymbols.some((value) => value === symbol);
  const symbolIsDrawRange = drawRangeSymbols.some((value) => value === symbol);
  const symbolImageElement = useMemo(() => {
    return getImageComponent(symbol, {
      className: "pointer-events-none",
      style: { height: sizeAdaptive(13) },
    });
  }, [symbol]);

  return (
    <div
      className="w-full pointer-events-none flex items-center"
      style={{ gap: sizeAdaptive(50) }}
    >
      <div
        className="w-[20%] aspect-square flex justify-center"
        style={{ height: sizeAdaptive(10) }}
      >
        <div
          className="h-full aspect-square pointer-events-none bg-white outline flex justify-center items-center overflow-hidden"
          style={{
            borderRadius: "50%",
            borderColor: "var(--BLACK)",
            outlineColor: "var(--WHITE)",
            outlineWidth: sizeAdaptive(400),
            borderWidth: sizeAdaptive(200),
            padding: sizeAdaptive(150),
          }}
        >
          {symbolImageElement}
        </div>
      </div>

      <div
        className="w-[80%] pointer-events-none font-palatino bolder"
        style={{
          color: "var(--WHITE)",
          fontSize: sizeAdaptive(40),
          lineHeight: sizeAdaptive(32),
        }}
      >
        {symbolIsRange
          ? cardIsWeapon
            ? locale["cardSymbol_weaponRange"]
            : locale["cardSymbol_range"]
          : symbolIsDrawRange
            ? locale["cardSymbol_drawRange"]
            : locale[`cardSymbol_${symbol}`]}
      </div>
    </div>
  );
}
