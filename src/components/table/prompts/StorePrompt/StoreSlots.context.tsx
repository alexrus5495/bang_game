import { createContext, useContext, useState } from "react";
import { usePendingInteraction } from "../../../../stores/hooks/localStateStore.hooks";
import { socket } from "../../../../lib/socket";

interface StoreSlotsContextValue {
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  checkIfHighlighted: (index: number) => boolean;
  getStoreCardId: (index: number) => string | null;
  isClientPicking: boolean;
  checkIfVisible: (index: number) => boolean;
}

const StoreSlotsContext = createContext<StoreSlotsContextValue | null>(null);

export const useStoreSlotsContext = () => {
  const context = useContext(StoreSlotsContext);
  if (!context) {
    throw new Error(
      "useStoreCardsContext must be used within StoreCardsProvider",
    );
  }
  return context;
};

export const StoreSlotsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [highlightedCardIndex, setHighlightedCardIndex] = useState<
    null | number
  >(null);
  const pendingInteraction = usePendingInteraction();

  if (!pendingInteraction || pendingInteraction.type !== "GENERAL_STORE")
    return null;

  const storeCards = pendingInteraction.cards;

  const getStoreCardId = (index: number) => storeCards[index];
  const checkIfVisible = (index: number) => getStoreCardId(index) !== null;

  const currentPickerId = pendingInteraction.currentPickerId;
  const isClientPicking = socket.id === currentPickerId;
  const shouldHighlight = socket.id === currentPickerId;
  const checkIfHighlighted = (index: number) => highlightedCardIndex === index;

  const onMouseEnter = (index: number) => {
    if (!shouldHighlight) return;
    setHighlightedCardIndex(index);
  };

  const onMouseLeave = () => {
    setHighlightedCardIndex(null);
  };

  const value = {
    onMouseEnter,
    isClientPicking,
    onMouseLeave,
    checkIfHighlighted,
    getStoreCardId,
    checkIfVisible,
  };

  return (
    <StoreSlotsContext.Provider value={value}>
      {children}
    </StoreSlotsContext.Provider>
  );
};
