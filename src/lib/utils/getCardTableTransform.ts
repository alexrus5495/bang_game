export function getCardTableTransform(cardId: string, eventIndex: number) {
  const seed = `${cardId}_${eventIndex}`;

  const hash = seed.split("").reduce((acc, char, i) => {
    return (acc << 5) - acc + char.charCodeAt(0) * (i + 1);
  }, 0);

  const absHash = Math.abs(hash);

  const offsetX = (absHash % 17) - 8; // from -8px to +8px
  const offsetY = ((absHash >> 3) % 17) - 8; // from -8px to +8px
  const rotation = ((absHash >> 5) % 17) - 8; // from -8deg to +8deg

  return { id: cardId, offsetX, offsetY, rotation };
}
