import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

export type AnchorId =
  | { type: "deck" }
  | { type: "discard" }
  | { type: "opponent-hand"; playerId: string }
  | { type: "opponent-equipment"; playerId: string }
  | { type: "player-hand-zero" }
  | { type: "player-hand-card"; index: number }
  | { type: "player-hand-slot"; index: number }
  | { type: "equipment-slot"; playerId: string; index: number }
  | { type: "equipment-card"; playerId: string; index: number }
  | { type: "equipment-zero"; playerId: string }
  | { type: "play-area" }
  | { type: "play-area-card"; index: number }
  | { type: "player-portrait"; playerId: string };

type AnchorRegistry = Map<string, () => DOMRect | null>;

type AnchorContextType = {
  register: (id: AnchorId, getRect: () => DOMRect | null) => void;
  unregister: (id: AnchorId) => void;
  getRect: (id: AnchorId) => DOMRect | null;
  getAll: () => React.RefObject<AnchorRegistry>;
};

function assertNever(x: never): never {
  throw new Error(`Unhandled AnchorId: ${JSON.stringify(x)}`);
}

function serializeAnchor(id: AnchorId): string {
  switch (id.type) {
    case "deck":
      return "deck";
    case "discard":
      return "discard";
    case "opponent-hand":
      return `opponent:${id.playerId}:hand`;
    case "opponent-equipment":
      return `opponent:${id.playerId}:equipment`;
    case "player-hand-zero":
      return `player:hand:zero`;
    case "player-hand-card":
      return `player:hand:card:${id.index}`;
    case "equipment-zero":
      return `equipment:zero:${id.playerId}`;
    case "equipment-slot":
      return `equipment:slot:${id.playerId}:${id.index}`;
    case "equipment-card":
      return `equipment:card:${id.playerId}:${id.index}`;
    case "player-hand-slot":
      return `player:hand:slot:${id.index}`;
    case "play-area":
      return "play:area";
    case "play-area-card":
      return `play:area:card:${id.index}`;
    case "player-portrait":
      return `player:portrait:${id.playerId}`;
    default:
      return assertNever(id);
  }
}

const AnchorsContext = createContext<AnchorContextType | null>(null);

export function AnchorsProvider({ children }: { children: ReactNode }) {
  const registryRef = useRef<AnchorRegistry | null>(null);

  if (registryRef.current === null) {
    registryRef.current = new Map();
  }

  const safeRef = registryRef as React.RefObject<AnchorRegistry>;

  const register = useCallback(
    (id: AnchorId, getRect: () => DOMRect | null) => {
      const key = serializeAnchor(id);
      safeRef.current.set(key, getRect);
    },
    [safeRef],
  );

  const unregister = useCallback(
    (id: AnchorId) => {
      const key = serializeAnchor(id);
      safeRef.current.delete(key);
    },
    [safeRef],
  );

  const getRect = useCallback(
    (id: AnchorId) => {
      const key = serializeAnchor(id);
      const fn = safeRef.current.get(key);
      return fn ? fn() : null;
    },
    [safeRef],
  );

  const getAll = useCallback(() => {
    return safeRef;
  }, [safeRef]);

  const value = useMemo(
    () => ({
      register,
      unregister,
      getRect,
      getAll,
    }),
    [register, unregister, getRect, getAll],
  );

  return (
    <AnchorsContext.Provider value={value}>{children}</AnchorsContext.Provider>
  );
}

// Hook to register the element as an anchor
export function useAnchorRef<T extends HTMLElement>(id: AnchorId) {
  const ref = useRef<T>(null);
  const context = use(AnchorsContext);

  useEffect(() => {
    if (!context) return;

    const getRect = () => ref.current?.getBoundingClientRect() ?? null;

    context.register(id, getRect);

    return () => {
      context.unregister(id);
    };
  }, [id, context]);

  return ref;
}

// Hook to get the registry
export function useAnchors() {
  const context = use(AnchorsContext);

  if (!context) {
    throw new Error("useAnchors must be used within AnchorsProvider");
  }

  return context;
}
