import type { LocalState } from "../../stores/localStateStore";

export function processPlayersArray(
  players: LocalState["players"],
  playerId: string,
) {
  const targetElement = players.find((player) => player.id === playerId);
  if (!targetElement) return;

  const relativeIndex = players.indexOf(targetElement);

  const rotatedData = [
    ...players.slice(relativeIndex),
    ...players.slice(0, relativeIndex),
  ];

  return rotatedData;
}
