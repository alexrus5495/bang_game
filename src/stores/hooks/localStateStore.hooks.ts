import { useLocalStateStore, type LocalState } from "../localStateStore";

// ==========================================
// 1. GAME DATA HOOKS
// ==========================================

export function useGameId(): LocalState["gameId"] {
  return useLocalStateStore((state) => state.gameId);
}

export function useNumberOfSeats(): LocalState["numberOfSeats"] {
  return useLocalStateStore((state) => state.numberOfSeats);
}

export function usePlayers(): LocalState["players"] {
  return useLocalStateStore((state) => state.players);
}

export function useTotalDeckLength(): LocalState["totalDeckLength"] {
  return useLocalStateStore((state) => state.totalDeckLength);
}

export function useDeckCurrentSize(): LocalState["deckCurrentSize"] {
  return useLocalStateStore((state) => state.deckCurrentSize);
}

export function useDiscardCurrentSize(): LocalState["discardCurrentSize"] {
  return useLocalStateStore((state) => state.discardCurrentSize);
}

export function useCardsOnTheTable(): LocalState["cardsOnTheTable"] {
  return useLocalStateStore((state) => state.cardsOnTheTable);
}

export function useIsCharSelected(socketId: string | null): boolean {
  return useLocalStateStore((state) => {
    if (!socketId) return false;
    const player = state.players.find((p) => p.id === socketId);
    return player ? player.char !== "" : false;
  });
}

// ==========================================
// 2. DOMAIN TURN STATUS HOOKS
// ==========================================

export function useCurrentPlayerId(): LocalState["currentPlayerId"] {
  return useLocalStateStore((state) => state.currentPlayerId);
}

export function usePreviousPlayerId(): LocalState["previousPlayerId"] {
  return useLocalStateStore((state) => state.previousPlayerId);
}

export function useTurnPhase(): LocalState["turnPhase"] {
  return useLocalStateStore((state) => state.turnPhase);
}

/**
 * Check if player is curent.
 * @param playerId — ID of a player to check. If not provided - check for the client player.
 */
export function useIsCurrentPlayer(playerId?: string) {
  return useLocalStateStore((state) => {
    // Case 1: Check for particular player
    if (playerId !== undefined) {
      const currentPlayerId = state.currentPlayerId ?? state.previousPlayerId;
      return playerId === currentPlayerId;
    }

    // Case 2: When called withou arguments, check for the client player.
    return state.gameFlowPhase === "CLIENT_TURN";
  });
}

// ==========================================
// 3. UI DATA HOOKS
// ==========================================

export function useGameFlowPhase(): LocalState["gameFlowPhase"] {
  return useLocalStateStore((state) => state.gameFlowPhase);
}

export function useInteractionPhase(): LocalState["interactionPhase"] {
  return useLocalStateStore((state) => state.interactionPhase);
}

export function usePendingCardIndex(): LocalState["pendingCardIndex"] {
  return useLocalStateStore((state) => state.pendingCardIndex);
}

export function useHighlightedCardIndex(): LocalState["highlightedCardIndex"] {
  return useLocalStateStore((state) => state.highlightedCardIndex);
}

export function useIsOverPlayArea(): LocalState["isOverPlayArea"] {
  return useLocalStateStore((state) => state.isOverPlayArea);
}

export function useIsDragging(): boolean {
  return useLocalStateStore((state) => state.interactionPhase === "DRAGGING");
}

export function useIsPending(index: number): boolean {
  return useLocalStateStore((state) => state.pendingCardIndex === index);
}

export function useIsDragged(index: number): boolean {
  return useLocalStateStore(
    (state) =>
      state.interactionPhase === "DRAGGING" && state.pendingCardIndex === index,
  );
}

export function useIsUiBlocked() {
  return useLocalStateStore((state) => state.isUIblocked);
}

export function useIsPreparing(): boolean {
  return useLocalStateStore((state) => state.gameFlowPhase === "PREPARATION");
}

export function useHighlightedOpponent() {
  return useLocalStateStore((state) => state.highlightedOpponent);
}

// ==========================================
// 4. CONTROLLER HOOKS (для быстрого доступа к действиям)
// ==========================================

export function usePlayersController(): LocalState["playersController"] {
  return useLocalStateStore((state) => state.playersController);
}

export function useCardActionsController(): LocalState["cardActionsController"] {
  return useLocalStateStore((state) => state.cardActionsController);
}

export function useFlowController(): LocalState["flowController"] {
  return useLocalStateStore((state) => state.flowController);
}

export function useDeckController(): LocalState["deckController"] {
  return useLocalStateStore((state) => state.deckController);
}

export function useTableController(): LocalState["tableController"] {
  return useLocalStateStore((state) => state.tableController);
}

export function useInitController(): LocalState["initController"] {
  return useLocalStateStore((state) => state.initController);
}

export function useDevController(): LocalState["devController"] {
  return useLocalStateStore((state) => state.devController);
}

export function useUiController(): LocalState["uiController"] {
  return useLocalStateStore((state) => state.uiController);
}
