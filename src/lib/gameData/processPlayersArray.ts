import type { PlayersPublicData, ProcessedPlayerData } from "../../types";

export function processPlayersArray(
  publicPlayersDataArray: PlayersPublicData,
  playerId: string,
) {
  const targetElement = publicPlayersDataArray.find(
    (player) => player.id === playerId,
  );
  if (!targetElement) return;

  const relativeIndex = publicPlayersDataArray.indexOf(targetElement);

  const processedData: ProcessedPlayerData[] = [];

  publicPlayersDataArray.map((player, index) => {
    processedData.push({ absoluteIndex: index, playerData: player });
  });

  const rotatedData = [
    ...processedData.slice(relativeIndex),
    ...processedData.slice(0, relativeIndex),
  ];

  return rotatedData;
}
