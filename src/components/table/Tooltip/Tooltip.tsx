import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { m } from "motion/react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type { TooltipMessage } from "../../../types";
import TooltipMessageLine from "../Tooltip/TooltipMessage";
import { checkBounds } from "../../../lib/utils/checkBounds";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import RootPortal from "../../shared/RootPortal";
import { useDragDropStore } from "../../../stores/dragDropStore";

const Tooltip = React.memo(
  ({
    title,
    content,
    position,
    hasCardRef,
    isPinned = false,
  }: {
    title: string;
    content: TooltipMessage[] | undefined;
    position: Record<string, number>;
    hasCardRef: boolean;
    isPinned?: boolean;
  }) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const isDragging = useDragDropStore((state) => state.isDragging);

    const [coordinates, setCoordinates] = useState<
      Record<string, number | undefined>
    >({});

    const updateCoordinates = useCallback(() => {
      const node = tooltipRef.current;
      if (!node) return;

      const { width, height } = node.getBoundingClientRect();

      const bounds = checkBounds(position.x, position.y, width, height);

      setCoordinates({
        left: bounds.left ?? undefined,
        top: bounds.top ?? undefined,
        right: bounds.right ?? undefined,
        bottom: bounds.bottom ?? undefined,
      });
    }, [position.x, position.y]);

    useLayoutEffect(() => {
      updateCoordinates();
    }, [updateCoordinates]);

    if (isDragging) return null;

    return (
      <RootPortal portalId="inspect_card_tooltip">
        <m.div
          ref={tooltipRef}
          className="w-fit z-[999] flex flex-col border border-[var(--BLACK)] bg-paperTexture-yellow"
          style={{
            position: "fixed",
            left: coordinates.left,
            top: coordinates.top,
            right: coordinates.right,
            bottom: coordinates.bottom,
            gap: sizeAdaptive(180),
            padding: sizeAdaptive(80),
            borderWidth: sizeAdaptive(200),
            visibility:
              coordinates.top !== undefined || coordinates.bottom !== undefined
                ? "visible"
                : "hidden",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          {hasCardRef && isPinned && (
            <div className="absolute top-0 right-0">
              <img
                src="./icon-pin.png"
                alt=""
                style={{
                  height: sizeAdaptive(40),
                  margin: sizeAdaptive(120),
                }}
              />
            </div>
          )}

          <TooltipInnerContent
            title={title}
            content={content}
            hasCardRef={hasCardRef}
          />
        </m.div>
      </RootPortal>
    );
  },
);

const TooltipInnerContent = React.memo(
  ({
    title,
    content,
    hasCardRef,
  }: {
    title: string;
    content: TooltipMessage[] | undefined;
    hasCardRef: boolean;
  }) => {
    return (
      <>
        <div
          className="font-palatino"
          style={{
            fontSize: sizeAdaptive(35),
            color: "var(--BLACK)",
            fontWeight: "bolder",
          }}
        >
          {title}
        </div>

        <div
          className="flex flex-col font-palatino z-[999]"
          style={{ fontWeight: "bolder" }}
        >
          {content?.map((message, index) => (
            <div key={index} style={{ fontSize: sizeAdaptive(40) }}>
              <TooltipMessageLine message={message} />
            </div>
          ))}
        </div>

        {hasCardRef && <HoldToInspectMessage />}
      </>
    );
  },
);

const HoldToInspectMessage = React.memo(() => {
  const locale = useSystemLocalization() as Record<string, string>;
  const localeText = locale["tooltip_holdToInspect"];

  const parts = localeText.split("{icon}");

  return (
    <div
      className="text-center italic font-palatino z-[990] flex items-center"
      style={{
        fontSize: sizeAdaptive(45),
        paddingTop: sizeAdaptive(50),
      }}
    >
      {parts[0]}

      <div>
        <img
          src="./lmb.png"
          alt=""
          style={{
            height: sizeAdaptive(35),
            margin: sizeAdaptive(120),
          }}
        />
      </div>

      {parts[1]}
    </div>
  );
});

export default Tooltip;
