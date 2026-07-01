import { m } from "motion/react";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { EventType, PlayingCardMeta } from "../../../../types";
import PlayingCard from "../../../cards/PlayingCard";
import InspectIcon from "../InspectIcon";
import AnimationAnchor from "../../shared/AnimationAnchor";
import { useCardsMetaDataState } from "../../../../stores/hooks/useCardsMetaDataState";
import { useMemo, useRef } from "react";
import type { AnchorId } from "../../../../contexts/AnchorsContext";
import { useDragDropStore } from "../../../../stores/dragDropStore";
import { useShallow } from "zustand/shallow";
import { useAnimationLayer } from "../../../../hooks/useAnimationLayer";
import { useLocalStateStore } from "../../../../stores/localStateStore";
import CardScaler from "../../../cards/shared/CardScaler";
import {
  CARD_CONTAINER_BORDER_RADIUS,
  CARD_CONTAINER_HEIGHT,
  CARD_CONTAINER_WIDTH,
} from "../../../cards/shared/constants";

type CardInHandProps = {
  cardId: string;
  clientId: string;
  spacing: number;
  index: number;
};

export default function CardInHand({
  cardId,
  spacing,
  clientId,
  index,
}: CardInHandProps) {
  const {
    startDragging,
    isDragging,
    lastDraggedIndex,
    clearLastDraggedIndex,
    highlightedCardIndex,
    setHighlightedCardIndex,
  } = useDragDropStore(
    useShallow((state) => ({
      startDragging: state.startDragging,
      isDragging: state.isDragging,
      lastDraggedIndex: state.lastDraggedIndex,
      clearLastDraggedIndex: state.clearLastDraggedIndex,
      highlightedCardIndex: state.highlightedCardIndex,
      setHighlightedCardIndex: state.setHighlightedCardIndex,
    })),
  );

  const { currentAnimation } = useAnimationLayer();
  const cardsMeta = useCardsMetaDataState()[0];
  const cardRef = useRef<HTMLDivElement>(null);
  const canPlay = useLocalStateStore((state) => {
    const validationData =
      state.playersController.getPlayerById(clientId)?.handValidationData;
    if (!validationData) {
      return false;
    } else {
      return validationData[index].canPlay ?? false;
    }
  });

  // Evaluate the highlight state based on the global store
  const isHighlighted = highlightedCardIndex === index;

  // Clear the active drag index once all deferred procedures conclude
  if (
    !isDragging &&
    lastDraggedIndex === index &&
    currentAnimation?.Component?.name !== "CARD_SNAPBACK"
  ) {
    clearLastDraggedIndex();
  }

  const isThisCardAnimatingBack =
    currentAnimation?.Component?.name === "CARD_SNAPBACK" &&
    (currentAnimation.props.data as EventType["CARD_SNAPBACK"])?.lastIndex ===
      index;

  const isThisCardActiveInProxy = isDragging
    ? lastDraggedIndex === index
    : isThisCardAnimatingBack;

  const handleStartDrag = (
    event: React.PointerEvent<HTMLDivElement>,
    cardIndex: number,
  ) => {
    const cardElement = event.currentTarget;
    const cardRect = cardElement.getBoundingClientRect();
    const offsetX = event.clientX - cardRect.left;
    const offsetY = event.clientY - cardRect.top;

    startDragging(event, cardIndex, { x: offsetX, y: offsetY });
  };

  // Hover handlers interact directly with the centralized store
  const handleMouseEnter = () => {
    if (isDragging) return;
    setHighlightedCardIndex(index);
  };

  const handleMouseLeave = () => {
    if (isDragging) return;
    setHighlightedCardIndex(null);
  };

  const anchorId = useMemo<AnchorId>(
    () => ({ type: "player-hand", index }),
    [index],
  );

  return (
    <m.div
      key={cardId}
      ref={cardRef}
      className="absolute h-full"
      style={{
        zIndex: isHighlighted ? 100 : 20 + index,
        visibility: isThisCardActiveInProxy ? "hidden" : "visible",
      }}
      initial={false}
      animate={{
        left: `${spacing * index}px`,
        // If the card is currently animating back via snapback, reset its state to 0.
        // This ensures the structural anchor immediately assumes its default, un-highlighted position.
        bottom: isHighlighted && !isThisCardAnimatingBack ? "15%" : 0,
        scale: isHighlighted && !isThisCardAnimatingBack ? 1.2 : 1,
      }}
      transition={{
        scale: { duration: 0.1, ease: "easeInOut" },
        bottom: { duration: 0.15, ease: "easeInOut" },
      }}
      onPointerDown={(e) => handleStartDrag(e, index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimationAnchor id={anchorId} className="w-full h-full absolute" />
      <AuraEffect />
      <PlayingCard cardId={cardId} initialIsFaceDown={false} />

      {isHighlighted && (
        <InspectIcon
          cardMeta={cardsMeta?.deckMeta[cardId] as PlayingCardMeta}
        />
      )}
      {isHighlighted && (
        <div
          className="bg-black h-full w-full relative"
          style={{
            zIndex: -1,
            top: "-96%",
            right: "-5%",
            opacity: 0.6,
            borderRadius: sizeAdaptive(55),
          }}
        ></div>
      )}
    </m.div>
  );
}

// const AuraEffect = () => {
//   return (
//     <div className="absolute h-full w-auto">
//       <CardScaler>
//         <m.div
//           className="relative overflow-hidden z-[-1] border "
//           style={{
//             bottom: "1.5%",
//             height: `${CARD_CONTAINER_HEIGHT * 0.98}px`,
//             width: `${CARD_CONTAINER_WIDTH}px`,
//             borderRadius: `${CARD_CONTAINER_BORDER_RADIUS}px`,
//             backgroundColor: "#f3fec8",
//             transform: "scale(1.03)",
//             boxShadow: "0px -15px 30px 10px #41e831",
//           }}
//         />
//       </CardScaler>
//     </div>
//   );
// };

export function SVGShaderFilters() {
  return (
    <svg
      // Вместо hidden делаем его нулевого размера и прозрачным
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        pointerEvents: "none",
        opacity: 0,
      }}
    >
      <defs>
        <filter
          id="hearthstone-flame"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.09"
            numOctaves="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.05 0.09; 0.05 0.15; 0.05 0.09"
              dur="4s"
              repeatCount="indefinite"
            />
          </feTurbulence>

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="25"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
const AuraEffect = () => {
  return (
    <div
      className="absolute inset-[-10px] z-[-1]"
      style={{
        background:
          "radial-gradient(ellipse at center, #f3fec8 60%, #41e831 35%, #10b981 5%, transparent 85%)",
        borderRadius: "20px",
        filter: "url(#hearthstone-flame) blur(8px)", // Связываем CSS с SVG-шейдером
        mixBlendMode: "screen",
      }}
    />
  );
};
