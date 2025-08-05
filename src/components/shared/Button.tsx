import { motion } from "motion/react";
import {
  BUTTON_TRANSITION,
  BUTTON_WHILE_HOVER,
} from "../../config/menu.config";

export default function Button({
  text,
  className,
  handler,
  style,
  disabled,
}: {
  text: string;
  className?: string;
  handler: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      className={`${className} ${!disabled ? "cursor-pointer" : ""}`}
      style={style}
      onClick={handler}
      whileHover={!disabled ? BUTTON_WHILE_HOVER : ""}
      transition={BUTTON_TRANSITION}
      disabled={disabled}
    >
      {text}
    </motion.button>
  );
}
