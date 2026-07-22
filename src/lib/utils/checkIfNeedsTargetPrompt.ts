import { useCardsMetaStore } from "../../stores/cardsMetaStore";
import { useLocalStateStore } from "../../stores/localStateStore";
import { socket } from "../socket";
import { assertNever } from "./assertNever";

export default function checkIfNeedsTargetPrompt(cardIndex: number) {
  const cardsMeta = useCardsMetaStore.getState();
  const clientId = socket.id ?? "";
  const client = useLocalStateStore
    .getState()
    .playersController.getPlayerById(clientId);

  if (!client) throw new Error(`Failed to find player`);

  const card = client.hand[cardIndex];
  if (!card) throw new Error(`Failed to find the card in hand`);

  const meta = cardsMeta.data?.deckMeta[card];
  if (!meta) throw new Error(`Failed to find metadata for the card ${card}`);

  switch (meta.effect.target) {
    case "self":
    case "many":
    case "all":
      return false;
    case "one":
      return true;
    default:
      return assertNever(meta.effect.target);
  }
}
