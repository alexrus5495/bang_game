import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { m } from "motion/react";

export default function FormTextInput({
  inputName,
  handler,
  text,
  state,
  isDisabled = false,
  className,
  style,
}: {
  inputName: string;
  handler: (newValue: string) => void;
  text: string;
  state: string;
  isDisabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const TEXT_SCALE_FACTOR = 20;

  return (
    <div className={`flex flex-col ${className}`} style={style}>
      <label
        htmlFor={inputName}
        style={{
          fontSize: sizeAdaptive(TEXT_SCALE_FACTOR),
          color: isDisabled ? "var(--BEIGE)" : "var(--BLACK)",
        }}
      >
        {text}:
      </label>
      <m.input
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
        maxLength={15}
      />
    </div>
  );
}
