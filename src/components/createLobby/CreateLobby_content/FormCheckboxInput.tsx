import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { motion } from "motion/react";

export default function FormCheckboxInput({
  inputName,
  handler,
  text,
  state,
}: {
  inputName: string;
  handler: () => void;
  text: string;
  state: boolean;
}) {
  const TEXT_SCALE_FACTOR = 20;
  const CHECKBOX_SCALE_FACTOR = 25;

  return (
    <div className="flex items-center" style={{ gap: sizeAdaptive(55) }}>
      <label
        htmlFor={inputName}
        style={{
          fontSize: sizeAdaptive(TEXT_SCALE_FACTOR),
          height: sizeAdaptive(CHECKBOX_SCALE_FACTOR),
          lineHeight: sizeAdaptive(CHECKBOX_SCALE_FACTOR),
        }}
      >
        {text}:
      </label>
      <motion.input
        type="checkbox"
        name={inputName}
        id={inputName}
        checked={state}
        className="accent-[var(--RED)] outline cur"
        style={{
          outlineWidth: sizeAdaptive(300),
          height: sizeAdaptive(CHECKBOX_SCALE_FACTOR),
          width: sizeAdaptive(CHECKBOX_SCALE_FACTOR),
        }}
        onChange={() => handler()}
        whileTap={{ scale: 0.8 }}
      />
    </div>
  );
}
