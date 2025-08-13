import type { PlayersPublicData } from "../../types";

export function processPlayersArray(
  publicPlayersDataArray: PlayersPublicData,
  playerId: string,
) {
  const targetElement = publicPlayersDataArray.find(
    (player) => player.id === playerId,
  );
  if (!targetElement) return;

  const relativeIndex = publicPlayersDataArray.indexOf(targetElement);

  const rotatedArray = [
    ...publicPlayersDataArray.slice(relativeIndex),
    ...publicPlayersDataArray.slice(0, relativeIndex),
  ];

  return rotatedArray;
}
