import React from "react";
import { m } from "motion/react";

interface ProgressTextProps {
  children: React.ReactNode;
  currentValue: number | null;
  maxValue: number | null;
  isCompleted?: boolean;
  initialColor?: string;
  finalColor?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ProgressText: React.FC<ProgressTextProps> = ({
  children,
  currentValue,
  maxValue,
  isCompleted = false,
  initialColor = "#FFFFFF",
  finalColor = "#ca0000",
  disabled = false,
  className = "",
  style = {},
}) => {
  const isInactive =
    !isCompleted && (disabled || currentValue === null || maxValue === null);

  if (isInactive) {
    return (
      <span
        className={`inline-block font-bold ${className}`}
        style={{ ...style, color: initialColor }}
      >
        {children}
      </span>
    );
  }

  const fillPercentage = isCompleted
    ? 100
    : calculateProgress(currentValue, maxValue);

  return (
    <m.span
      className={`inline-block font-bold select-none ${className}`}
      style={{
        ...style,
        backgroundImage: `linear-gradient(to right, ${finalColor} 50%, ${initialColor} 50%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      initial={false}
      animate={{
        backgroundPositionX: `${100 - fillPercentage}%`,
      }}
      transition={{
        duration: isCompleted ? 0.3 : 1,
        ease: isCompleted ? "easeOut" : "linear",
      }}
    >
      {children}
    </m.span>
  );
};

function calculateProgress(
  currentValue: number | null,
  maxValue: number | null,
): number {
  if (currentValue === null || maxValue === null) return 0;

  const maxSec = maxValue / 1000;
  const currentSec = currentValue;

  const OFFSET_SEC = 1;
  const adjustedCurrent = Math.max(0, currentSec - OFFSET_SEC);
  const adjustedMax = Math.max(0.1, maxSec - OFFSET_SEC);

  const rawProgress =
    1 - Math.max(0, Math.min(1, adjustedCurrent / adjustedMax));
  return Math.round(rawProgress * 100);
}
