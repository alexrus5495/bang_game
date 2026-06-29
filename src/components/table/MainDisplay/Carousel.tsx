import { useEffect, useMemo, useRef, useState } from "react";
import { m } from "framer-motion";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../lib/images";
import { useLocalStateStore } from "../../../stores/localStateStore";

interface CarouselItem {
  id: string; // Unique and stable id for layout animations
  char: string;
}

export default function Carousel() {
  const carousel = useCarousel();

  return (
    <div className="h-full w-full flex justify-center overflow-hidden">
      {carousel.map((item, index) => (
        <Frame char={item.char} key={item.id} index={index} />
      ))}
    </div>
  );
}

function Frame({ char, index }: { char: string; index: number }) {
  const isCurrent = useMemo(() => index === 4, [index]);
  const imageElement = useMemo(() => {
    return getImageComponent(char, {
      className: "h-full w-full transition-all duration-500 ease-in-out",
      style: {
        padding: sizeAdaptive(190),
        filter: isCurrent ? "grayscale(0%)" : "grayscale(60%)",
      },
      draggable: false,
    });
  }, [char, isCurrent]);

  return (
    <m.div
      layout="position"
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 50,
      }}
      className="h-full aspect-square relative outline will-change-transform"
    >
      <img
        src="./frame.png"
        alt=""
        className="absolute pointer-none"
        draggable={false}
      />

      {char !== "" && imageElement}
    </m.div>
  );
}

function useCarousel() {
  const turn = useLocalStateStore((state) => state.turn);
  const players = useLocalStateStore((state) => state.players);
  const prevPlayerId = useRef<string | null>(null);
  const keyCounter = useRef(0);

  // The carousel is filled with blanks at the beginning of the match
  const [items, setItems] = useState<CarouselItem[]>(() =>
    Array(9)
      .fill(null)
      .map((_, i) => ({ id: `empty-${i}`, char: "" })),
  );

  const currentPlayerId = useMemo(
    () => turn.playerId ?? turn.previousPlayerId,
    [turn.playerId, turn.previousPlayerId],
  );

  const alivePlayers = useMemo(
    () => players.filter((player) => !player.flags.isEliminated),
    [players],
  );

  useEffect(() => {
    const currentPlayerIndex = alivePlayers.findIndex(
      (player) => player.id === currentPlayerId,
    );

    if (currentPlayerIndex === -1) return;

    //Tries to find the player in the previous version of the carousel, to keep it's id
    const fillFromPool = (
      newItems: CarouselItem[],
      startSlot: number,
      startPlayerIdx: number,
      prevItems: CarouselItem[],
    ) => {
      const usedPrevIndices = new Set<number>();
      let currentIndex = startPlayerIdx;

      for (let i = startSlot; i <= 8; i++) {
        const targetPlayer = alivePlayers[currentIndex];

        //Search only forward
        let foundItem = null;
        for (let j = i; j < prevItems.length; j++) {
          if (
            !usedPrevIndices.has(j) &&
            prevItems[j].id.startsWith(`player-${targetPlayer.id}-`)
          ) {
            foundItem = prevItems[j];
            usedPrevIndices.add(j);
            break;
          }
        }

        //Keep the found player or generate the new item
        if (foundItem) {
          newItems[i] = foundItem;
        } else {
          keyCounter.current += 1;
          newItems[i] = {
            id: `player-${targetPlayer.id}-${keyCounter.current}`,
            char: targetPlayer.char,
          };
        }

        currentIndex = (currentIndex + 1) % alivePlayers.length;
      }
    };

    //Case 1: Turn 1 initialization
    const initializeCarousel = () => {
      setItems((prev) => {
        const newItems = [...prev];
        fillFromPool(newItems, 4, currentPlayerIndex, prev);
        return newItems;
      });
    };

    //Case 2: The usual turn changing
    const handleTurnChange = () => {
      setItems((prev) => {
        const newItems = [...prev];

        //Keep the history - move it 1 slot to the left
        for (let i = 0; i <= 3; i++) {
          newItems[i] = prev[i + 1];
        }

        // Current turn and the future - recalculate
        fillFromPool(newItems, 4, currentPlayerIndex, prev);

        return newItems;
      });
    };

    //Case 3: Someone died (alivePlayers has changed, but turn.playerId - hasn't)
    const handleMidTurnDeath = () => {
      setItems((prev) => {
        const newItems = [...prev];

        // Keep the current player and the past, but recalculate the future
        const nextPlayerIndex = (currentPlayerIndex + 1) % alivePlayers.length;
        fillFromPool(newItems, 5, nextPlayerIndex, prev);

        return newItems;
      });
    };

    // react-doctor-disable-next-line no-cascading-set-state
    if (!turn.playerId) return;

    if (prevPlayerId.current === null) {
      initializeCarousel();
    } else if (prevPlayerId.current !== turn.playerId) {
      handleTurnChange();
    } else {
      handleMidTurnDeath();
    }

    prevPlayerId.current = turn.playerId;
  }, [currentPlayerId, alivePlayers, turn.playerId]);

  return items;
}
