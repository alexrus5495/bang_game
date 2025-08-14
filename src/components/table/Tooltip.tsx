import { useEffect, useRef, useState } from "react";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import { motion } from "motion/react";
import type { TooltipMessage } from "../../types";
import TooltipMessageLine from "./Tooltip/TooltipMessage";
import { checkBounds } from "../../lib/utils/checkBounds";
import { useSystemLocalization } from "../../hooks/useSystemLocalization";

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
  const locale = useSystemLocalization() as Record<string, string>;

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
    <motion.div
      ref={tooltipRef}
      className="w-fit z-[999] bg-[var(--BEIGE)] flex flex-col border border-[var(--BLACK)]"
      style={{
        position: "fixed",
        left: coordinates.left,
        top: coordinates.top,
        right: coordinates.right,
        bottom: coordinates.bottom,
        gap: sizeAdaptive(180),
        padding: sizeAdaptive(80),
        borderWidth: sizeAdaptive(200),
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
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
        className="flex flex-col font-palatino"
        style={{ fontWeight: "bolder" }}
      >
        {content &&
          content.map((message, index) => (
            <div key={index} style={{ fontSize: sizeAdaptive(40) }}>
              <TooltipMessageLine message={message} />
            </div>
          ))}
      </div>

      {hasCardRef && (
        <div
          className="text-center italic font-palatino"
          style={{ fontSize: sizeAdaptive(45), paddingTop: sizeAdaptive(50) }}
        >
          {locale["tooltip_holdToInspect"]}
        </div>
      )}
    </motion.div>
  );
}
