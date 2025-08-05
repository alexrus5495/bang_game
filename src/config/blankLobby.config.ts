import type { LobbyConfig } from "../types";
import { PLAYER_COLORS } from "./player.colors";

export const blankLobbyConfig: LobbyConfig = {
  lobbyName: "",
  playerName: "",
  isPrivate: false,
  password: "",
  numberOfSeats: 4,
  seats: [
    {
      id: 0,
      type: "human",
      color: PLAYER_COLORS[0],
      status: "open",
      playerId: "",
      playerName: "",
    },
    {
      id: 1,
      type: "human",
      color: PLAYER_COLORS[1],
      status: "open",
      playerId: "",
      playerName: "",
    },
    {
      id: 2,
      type: "human",
      color: PLAYER_COLORS[2],
      status: "open",
      playerId: "",
      playerName: "",
    },
    {
      id: 3,
      type: "human",
      color: PLAYER_COLORS[3],
      status: "open",
      playerId: "",
      playerName: "",
    },
  ],
} as const;
