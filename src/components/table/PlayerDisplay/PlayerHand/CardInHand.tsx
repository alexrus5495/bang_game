import { m } from "motion/react";
import PlayingCard from "../../../cards/PlayingCard";
import InspectIcon from "../InspectIcon";
import AnimationAnchor from "../../shared/AnimationAnchor";
import React, { type ReactNode } from "react";
import CardAuraEffect from "../../../../shaders/cardAuraEffect";
import { CardInHandProvider, useCardInHandContext } from "./CardInHand.context";
import { useCardPosition } from "./CardInHand.hooks";

type CardInHandProps = {
  cardId: string;
  spacing: number;
  index: number;
};

// Colors for card's aura effect
const AURA_AVAILABLE = "#09e510";
const AURA_ACTIVE = "#a9b0fc";

//
// MAIN COMPONENT
const CardInHand = React.memo(({ cardId, spacing, index }: CardInHandProps) => {
  const position = useCardPosition({
    spacing,
    index,
  });

  if (!position) return null;

  return (
    <CardInHandProvider
      cardId={cardId}
      index={index}
      spacing={spacing}
      position={position}
    >
      <CardInHandOuter>
        <CardInHandInner />
      </CardInHandOuter>
    </CardInHandProvider>
  );
});

export default CardInHand;

//
// OUTER COMPONENT
const CardInHandOuter = React.memo(({ children }: { children: ReactNode }) => {
  const { position, drag, handlers } = useCardInHandContext();

  return (
    <m.div
      className="absolute will-change-transform pointer-events-auto"
      style={{
        zIndex: drag.isDragged ? 999 : position.zIndex,
        transformOrigin: "top right",
        perspective: 600,
      }}
      initial={false}
      animate={{
        left: `${position.left}px`,
        height: `${position.height}px`,
        top: position.top,
        translateX: position.translateX,
      }}
      transition={{
        scale: { duration: 0.1, ease: "easeInOut" },
        top: { duration: 0.15, ease: "easeInOut" },
      }}
      onMouseEnter={drag.isDragging ? undefined : handlers.onMouseEnter}
      onMouseLeave={drag.isDragging ? undefined : handlers.onMouseLeave}
    >
      {children}
    </m.div>
  );
});

//
//  INNER COMPONENT
const CardInHandInner = React.memo(() => {
  const { card, drag, misc, highlight, handlers, position } =
    useCardInHandContext();

  return (
    <m.div
      className="w-full h-full cursor-grab active:cursor-grabbing relative"
      drag={misc.isCurrent && card.isPlayable}
      dragConstraints={false}
      dragElastic={1}
      dragSnapToOrigin={true}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
      style={{
        x: drag.x,
        y: drag.y,
        transformOrigin: "top right",
        rotateX: position.rotateX,
        rotateY: position.rotateY,
        transformStyle: "preserve-3d",
        pointerEvents: drag.isDragged ? "none" : "auto",
      }}
      onDragStart={() => handlers.onDragStart(card.index)}
      onDragEnd={() => handlers.onDragEnd()}
    >
      <AnimationAnchor id={misc.anchorId} className="w-full h-full absolute" />

      <m.div
        style={{ transform: "translateZ(0px)", backfaceVisibility: "hidden" }}
        className="w-full h-full"
        animate={{
          scale: drag.isDragged ? 1.2 : position.scale,
        }}
      >
        <PlayingCard cardId={card.id} initialIsFaceDown={false} />

        {card.isPlayable && (
          <CardAuraEffect
            color={drag.isDragged ? AURA_ACTIVE : AURA_AVAILABLE}
          />
        )}
      </m.div>

      {highlight.isHighlighted && !drag.isDragging && (
        <InspectIcon cardId={card.id} />
      )}
    </m.div>
  );
});
