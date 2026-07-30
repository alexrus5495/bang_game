import { AnimatePresence, m } from "motion/react";
import PlayingCard from "../../../cards/PlayingCard";
import InspectIcon from "../InspectIcon";
import AnimationAnchor from "../../shared/AnimationAnchor";
import React, { type ReactNode } from "react";
import CardAuraEffect from "../../../../shaders/cardAuraEffect";
import { CardInHandProvider, useCardInHandContext } from "./CardInHand.context";
import { useCardPosition } from "./CardInHand.hooks";
import {
  useInteractionPhase,
  useIsPending,
} from "../../../../stores/hooks/localStateStore.hooks";
import TargetSelectPrompt from "../../prompts/TargetSelectPrompt";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../../lib/images";

type CardInHandProps = {
  cardId: string;
  spacing: number;
  index: number;
};

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
  const interactionPhase = useInteractionPhase();
  const { card, aura, drag, misc, highlight, handlers, position } =
    useCardInHandContext();
  const isPending = useIsPending(card.index);

  const showTargetSelector =
    isPending && interactionPhase === "AWAITING_TARGET";

  return (
    <m.div
      className="w-full h-full active:cursor-grabbing relative"
      drag={drag.shouldDrag}
      dragConstraints={false}
      dragElastic={1}
      dragMomentum={drag.shouldSnapToOrigin}
      dragSnapToOrigin={drag.shouldSnapToOrigin}
      dragTransition={{
        bounceStiffness: drag.stiffness,
        bounceDamping: drag.damping,
      }}
      style={{
        x: drag.x,
        y: drag.y,
        transformOrigin: "top right",
        rotateX: position.rotateX,
        rotateY: position.rotateY,
        transformStyle: "preserve-3d",
        pointerEvents: drag.isDragged ? "none" : "auto",
        cursor:
          interactionPhase === "AWAITING_ACTION" ||
          interactionPhase === "DRAGGING"
            ? "grab"
            : "auto",
      }}
      onDragStart={() => handlers.onDragStart(card.index)}
      onDragEnd={() => handlers.onDragEnd()}
    >
      <AnimationAnchor id={misc.anchorId} className="w-full h-full absolute" />

      <m.div
        style={{ transform: "translateZ(0px)", backfaceVisibility: "hidden" }}
        className="w-full h-full"
        animate={{
          scale: isPending ? 1.2 : position.scale,
        }}
      >
        <PlayingCard cardId={card.id} initialIsFaceDown={false} />

        <CardAuraEffect color={aura.color} isVisible={aura.isVisible} />

        <AnimatePresence>
          {showTargetSelector && (
            <m.div
              key={`targetSelector-arrowIndicator`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute z-999 top-1/2 -translate-y-1/2 left-[80%]"
              style={{
                marginLeft: sizeAdaptive(20),
                height: sizeAdaptive(15),
                width: sizeAdaptive(15),
              }}
            >
              {getImageComponent("arrow-right-red", {
                className: "h-auto w-auto",
              })}
            </m.div>
          )}

          <div
            style={{ opacity: showTargetSelector ? 1 : 0 }}
            key={`targetSelector-prompt`}
          >
            <TargetSelectPrompt cardIndex={card.index} />
          </div>
        </AnimatePresence>
      </m.div>

      {highlight.isHighlighted && !drag.isDragging && (
        <InspectIcon cardId={card.id} />
      )}
    </m.div>
  );
});
