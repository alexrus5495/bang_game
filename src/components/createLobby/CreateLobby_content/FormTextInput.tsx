import { sizeAdaptive } from "../../../cssFunctions";
import { motion } from "motion/react";

export default function FormTextInput({
  inputName,
  handler,
  text,
  state,
  isDisabled = false,
}: {
  inputName: string;
  handler: (newValue: string) => void;
  text: string;
  state: string;
  isDisabled?: boolean;
}) {
  const TEXT_SCALE_FACTOR = 20;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputName}
        style={{
          fontSize: sizeAdaptive(TEXT_SCALE_FACTOR),
          color: isDisabled ? "var(--BEIGE)" : "var(--BLACK)",
        }}
      >
        {text}:
      </label>
      <motion.input
        type="text"
        name={inputName}
        value={state}
        id={inputName}
        disabled={isDisabled}
        onChange={(e) => handler(e.target.value)}
        className="w-[80%] outline"
        style={{
          color: isDisabled ? "var(--BEIGE)" : "var(--BLACK)",
          fontSize: sizeAdaptive(TEXT_SCALE_FACTOR),
          outlineWidth: sizeAdaptive(150),
          paddingLeft: sizeAdaptive(100),
          outlineColor: isDisabled ? "var(--BEIGE)" : "var(--BLACK)",
        }}
        whileFocus={{ scale: 1.05 }}
      />
    </div>
  );
}
