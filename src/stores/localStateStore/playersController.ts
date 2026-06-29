import type { StateCreator } from "zustand";
import { getPlayerIndex } from "./helpers";
import type { LocalState } from "../localStateStore";
import type { ClientPlayer } from "./types";
import type { EventType } from "../../types";

export type PlayersController = {
  addPlayer: (
    playerData: Pick<ClientPlayer, "id" | "nickname" | "color" | "isAI">,
  ) => void;
  addToHand: (playerId: string, cardId: string | null) => void;
  removeFromHand: (playerId: string, cardId: string | null) => void;
  addToEquipment: (playerId: string, cardId: string) => void;
  reorderPlayers: (newOrder: string[]) => void;
  assignRole: (playerId: string, role: string) => void;
  assignChar: (
    playerId: string,
    char: string,
    health: EventType["PLAYER_ASSIGNED_CHAR"]["health"],
  ) => void;
  removeFromEquipment: (playerId: string, cardId: string) => void;
  updateHealth: (
    playerId: string,
    health: { current: number; max: number },
  ) => void;
  setEliminated: (playerId: string) => void;
  setUnderSight: (playerId: string, value: boolean) => void;
  getRotatedPlayerIds: (clientId: string) => string[];
  getPlayerById: (playerId: string) => ClientPlayer | undefined;
  getPlayerHandLength: (playerId: string) => number;
  getPlayerHealth: (
    playerId: string,
  ) => ClientPlayer["stats"]["health"] | { current: number; max: 0 };
  getPlayerWeaponRange: (playerId: string) => number;
  getPlayerWeapon: (playerId: string) => string;
};

export const createPlayersController: StateCreator<
  LocalState,
  [],
  [],
  PlayersController
> = (set, get) => ({
  //
  // ----- Initial Setup -----
  //
  addPlayer: (playerData) =>
    set((state) => {
      const newPlayer: ClientPlayer = {
        id: playerData.id,
        isAI: playerData.isAI,
        nickname: playerData.nickname,
        color: playerData.color,
        role: "",
        char: "",
        hand: [],
        weapon: {
          card: "colt45",
          range: 1,
        },
        equipment: [],
        flags: {
          isEliminated: false,
          isUnderSight: false,
        },
        stats: {
          health: { current: 0, max: 0 },
        },
      };

      return { players: [...state.players, newPlayer] };
    }),

  reorderPlayers: (newOrder) =>
    set((state) => {
      const reordered = newOrder.map((id) => {
        const player = state.players.find((p) => p.id === id);

        if (!player) throw new Error(`Player ${id} not found in reorder`);
        return player;
      });
      return { players: reordered };
    }),

  assignRole: (playerId, role) =>
    set((state) => {
      const index = getPlayerIndex(state.players, playerId);
      const updated = [...state.players];
      updated[index] = { ...updated[index], role };
      return { players: updated };
    }),

  assignChar: (playerId, char, health) =>
    set((state) => {
      const index = getPlayerIndex(state.players, playerId);
      const updated = [...state.players];
      updated[index] = {
        ...updated[index],
        char,
        stats: { ...updated[index].stats, health },
      };
      return { players: updated };
    }),

  //
  // ----- Hand -----
  //
  addToHand: (playerId, cardId) =>
    set((state) => {
      const index = getPlayerIndex(state.players, playerId);
      const updated = [...state.players];
      updated[index] = {
        ...updated[index],
        hand: [...updated[index].hand, cardId ?? "?"],
      };
      return { players: updated };
    }),

  removeFromHand: (playerId, cardId) =>
    set((state) => {
      const index = getPlayerIndex(state.players, playerId);
      const player = state.players[index];
      const handIndex = player.hand.findIndex((c) => c === (cardId ?? "?"));
      if (handIndex === -1) return {};
      const newHand = [...player.hand];
      newHand.splice(handIndex, 1);
      const updated = [...state.players];
      updated[index] = { ...player, hand: newHand };
      return { players: updated };
    }),

  //
  // ----- Equipment -----
  //
  addToEquipment: (playerId, cardId) =>
    set((state) => {
      const index = getPlayerIndex(state.players, playerId);
      const updated = [...state.players];
      updated[index] = {
        ...updated[index],
        equipment: [...updated[index].equipment, cardId],
      };
      return { players: updated };
    }),

  removeFromEquipment: (playerId, cardId) =>
    set((state) => {
      const index = getPlayerIndex(state.players, playerId);
      const player = state.players[index];
      const updated = [...state.players];
      updated[index] = {
        ...player,
        equipment: player.equipment.filter((c) => c !== cardId),
      };
      return { players: updated };
    }),

  //
  // ----- Stats -----
  //
  updateHealth: (playerId, health) =>
    set((state) => {
      const index = getPlayerIndex(state.players, playerId);
      const updated = [...state.players];
      updated[index] = {
        ...updated[index],
        stats: { ...updated[index].stats, health },
      };
      return { players: updated };
    }),

  //
  // ----- Flags -----
  //
  setEliminated: (playerId) =>
    set((state) => {
      const index = getPlayerIndex(state.players, playerId);
      const updated = [...state.players];
      updated[index] = {
        ...updated[index],
        flags: { ...updated[index].flags, isEliminated: true },
      };
      return { players: updated };
    }),

  setUnderSight: (playerId, value) =>
    set((state) => {
      const index = getPlayerIndex(state.players, playerId);
      const updated = [...state.players];
      updated[index] = {
        ...updated[index],
        flags: { ...updated[index].flags, isUnderSight: value },
      };
      return { players: updated };
    }),

  //
  // ----- Utils -----
  //
  getRotatedPlayerIds: (clientId) => {
    const players = get().players;
    const ids = players.map((p) => p.id);
    const clientIndex = ids.indexOf(clientId);

    if (clientIndex === -1) return ids;

    return [...ids.slice(clientIndex), ...ids.slice(0, clientIndex)];
  },

  getPlayerById: (playerId) => {
    return get().players.find((p) => p.id === playerId);
  },

  getPlayerHandLength: (playerId) => {
    const p = get().players.find((p) => p.id === playerId);
    return p?.hand.length ?? 0;
  },

  getPlayerHealth: (playerId) => {
    const p = get().players.find((p) => p.id === playerId);
    return p?.stats.health ?? { current: 0, max: 0 };
  },

  getPlayerWeaponRange: (playerId) => {
    const p = get().players.find((p) => p.id === playerId);
    return p?.weapon.range ?? 1;
  },

  getPlayerWeapon: (playerId) => {
    const p = get().players.find((p) => p.id === playerId);
    return p?.weapon.card ?? "colt45";
  },
});
