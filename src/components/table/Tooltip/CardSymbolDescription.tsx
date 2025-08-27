import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../lib/images";

export default function CardSymbolDescription({
  symbol,
  cardIsWeapon,
}: {
  symbol: string;
  cardIsWeapon: boolean;
}) {
  const locale = useSystemLocalization() as Record<string, string>;
  const rangeSymbols = ["one", "two", "three", "four", "five"];
  const drawRangeSymbols = ["range_hearts", "range_spades_2-9"];

  const symbolIsRange = rangeSymbols.some((value) => value === symbol);
  const symbolIsDrawRange = drawRangeSymbols.some((value) => value === symbol);

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
          {getImageComponent(symbol, {
            className: "pointer-events-none",
            style: { height: sizeAdaptive(13) },
          })}
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
