export function getCardTableTransform(cardId: string, eventIndex: number) {
  const seed = `${cardId}_${eventIndex}`;

  const hash = seed.split("").reduce((acc, char, i) => {
    return (acc << 5) - acc + char.charCodeAt(0) * (i + 1);
  }, 0);

  const absHash = Math.abs(hash);

  const rawXFactor = (absHash % 51) - 25;
  const rawYFactor = ((absHash >> 3) % 51) - 25;

  const offsetXFactor = rawXFactor / 1000;
  const offsetYFactor = rawYFactor / 1000;

  const rotation = ((absHash >> 5) % 7) - 3;
  return { id: cardId, offsetXFactor, offsetYFactor, rotation };
}
