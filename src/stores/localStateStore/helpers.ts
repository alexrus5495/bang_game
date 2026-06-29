import type { ClientPlayer } from "./types";

export const getPlayerIndex = (
  players: ClientPlayer[],
  playerId: string,
): number => {
  const index = players.findIndex((p) => p.id === playerId);
  if (index === -1) throw new Error(`Player ${playerId} not found`);
  return index;
};
