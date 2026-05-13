import { useLayoutEffect, useMemo, useState } from "react";
import { CARD_CONTAINER_WIDTH } from "../components/cards/shared/constants";

export function useDinamicSpacing(
  cardIds: string[],
  containerWidth: number,
  pendingCardId: string | null,
  scale: number,
) {
  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    const firstCardId = cardIds[0];

    if (!firstCardId) return;

    const width = CARD_CONTAINER_WIDTH * scale;

    setCardWidth(width);
  }, [cardIds, containerWidth, scale, pendingCardId]);

  const spacing = useMemo(() => {
    const cardsTotal = cardIds.length;

    if (cardsTotal <= 1) {
      return 0;
    }

    if (cardWidth <= 0 || containerWidth <= 0) {
      return 0;
    }

    const initialTotalCardsWidth = cardWidth * cardsTotal;

    const deltaTotalCardsWidth = initialTotalCardsWidth - containerWidth;

    const offsetFactor =
      deltaTotalCardsWidth > 0 ? deltaTotalCardsWidth / (cardsTotal - 1) : 0;

    return cardWidth - offsetFactor;
  }, [cardWidth, cardIds.length, containerWidth]);

  return spacing;
}
