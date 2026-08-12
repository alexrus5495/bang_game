import type { RankAndSuit } from "../../../types";
import { getImageComponent } from "../../../lib/images";

export default function RankAndSuit({
  rankAndSuit,
}: {
  rankAndSuit: RankAndSuit;
}) {
  const { rank, suit } = rankAndSuit;
  const containerClasses = `
    h-auto
    w-auto
    absolute
    flex
    -bottom-[20px]
    -left-[13px]`;
  const rankClasses =
    "font-gabriela text-[50px] leading-none text-stroke-white font-bold select-none";
  const suitClasses = "h-[46px] m-auto";

  return (
    <div className={containerClasses}>
      <p className={rankClasses}>{rank}</p>
      {getImageComponent(suit, { className: suitClasses })}
    </div>
  );
}
