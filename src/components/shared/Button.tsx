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
}: {
  text: string;
  className?: string;
  handler: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <motion.button
      type="button"
      className={`${className} cursor-pointer`}
      style={style}
      onClick={handler}
      whileHover={BUTTON_WHILE_HOVER}
      transition={BUTTON_TRANSITION}
    >
      {text}
    </motion.button>
  );
}
