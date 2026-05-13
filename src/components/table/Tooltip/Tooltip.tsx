import { useEffect, useRef, useState } from "react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { motion } from "motion/react";
import type { TooltipMessage } from "../../../types";
import TooltipMessageLine from "../Tooltip/TooltipMessage";
import { checkBounds } from "../../../lib/utils/checkBounds";
import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import RootPortal from "../../shared/RootPortal";

export default function Tooltip({
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
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<
    Record<string, number | undefined>
  >({ left: 0, top: 0 });
  //Update the coordinates
  useEffect(() => {
    if (tooltipRef.current) {
      const { width, height } = tooltipRef.current.getBoundingClientRect();

      const bounds = checkBounds(position.x, position.y, width, height);

      setCoordinates({
        left: bounds.left ?? undefined,
        top: bounds.top ?? undefined,
        right: bounds.right ?? undefined,
        bottom: bounds.bottom ?? undefined,
      });
    }
  }, [position]);

  return (
    <RootPortal portalId={"inspect_card_tooltip"}>
      <motion.div
        ref={tooltipRef}
        className="w-fit z-[999] flex flex-col border border-[var(--BLACK)]"
        style={{
          position: "fixed",
          left: coordinates.left,
          top: coordinates.top,
          right: coordinates.right,
          bottom: coordinates.bottom,
          gap: sizeAdaptive(180),
          padding: sizeAdaptive(80),
          borderWidth: sizeAdaptive(200),
          backgroundColor: "rgba(from var(--BEIGE) r g b / 80%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {hasCardRef && isPinned && (
          <div className="absolute top-0 right-0">
            <img
              src="./icon-pin.png"
              alt=""
              style={{ height: sizeAdaptive(40), margin: sizeAdaptive(120) }}
            />
          </div>
        )}

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
          {content &&
            content.map((message, index) => (
              <div key={index} style={{ fontSize: sizeAdaptive(40) }}>
                <TooltipMessageLine message={message} />
              </div>
            ))}
        </div>

        {hasCardRef && <HoldToInspect />}
      </motion.div>
    </RootPortal>
  );
}

function HoldToInspect() {
  const locale = useSystemLocalization() as Record<string, string>;
  const localeText = locale["tooltip_holdToInspect"];

  const parts = localeText.split(`{icon}`);

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
          style={{ height: sizeAdaptive(35), margin: sizeAdaptive(120) }}
        />
      </div>

      {parts[1]}
    </div>
  );
}
