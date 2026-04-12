import { createContext, useContext, useState } from "react";

type PendingCardId = string | null;

interface PendingContextType {
  pendingCardId: PendingCardId;
  setPendingCardId: React.Dispatch<React.SetStateAction<string | null>>;
}

const PendingContext = createContext<PendingContextType | undefined>(undefined);

export function PendingProvider({ children }: { children: React.ReactNode }) {
  const [pendingCardId, setPendingCardId] = useState<string | null>(null);

  const contextValue = { pendingCardId, setPendingCardId };

  return (
    <PendingContext.Provider value={contextValue}>
      {children}
    </PendingContext.Provider>
  );
}
export function usePendingContext() {
  const context = useContext(PendingContext);
  if (context === undefined) {
    throw new Error("must be used within CardsOnTheTableProvider");
  }
  return context;
}
