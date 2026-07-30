import { m } from "motion/react";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../../lib/images";
import { useSystemLocalization } from "../../../../stores/hooks/useSystemLocalization";
import { useTargetPosition } from "../TargetSelectPrompt.hooks";
import { useUiController } from "../../../../stores/hooks/localStateStore.hooks";

export default function CancelButton({
  highlightedOption,
  spacing,
  index,
  setHighlightedOption,
}: {
  index: number;
  spacing: { gap: number; margin: number; elementHeight: number };
  highlightedOption: number | null;
  setHighlightedOption: (v: number | null) => void;
}) {
  const locale = useSystemLocalization() as Record<string, string>;
  const position = useTargetPosition({ index, spacing, highlightedOption });
  const uiController = useUiController();

  const onClick = () => {
    uiController.resetInteractionPhase();
    setHighlightedOption(null);
  };

  if (!position) return null;

  return (
    <m.div
      className="absolute rounded-[50%] aspect-square flex justify-center items-center cursor-pointer"
      style={{
        height: sizeAdaptive(15),
        top: position.top,
        zIndex: position.zIndex,
      }}
      animate={{
        scale: highlightedOption === index ? 1.3 : 1,
        translateY: position.translateY,
      }}
      transition={{ scale: { duration: 0.2 } }}
      initial={{ scale: 0, filter: "grayscale(0)" }}
      onMouseEnter={() => setHighlightedOption(index)}
      onMouseLeave={() => setHighlightedOption(null)}
      onClick={onClick}
    >
      <div
        className="absolute h-full w-full bg-paperTexture-stockalike overflow-hidden rounded-[50%]"
        style={{
          borderColor: "var(--BLACK)",
          borderWidth: sizeAdaptive(300),
          filter:
            highlightedOption === index ? "grayscale(0%)" : "grayscale(50%)",
        }}
      ></div>
      {getImageComponent("arrow-left-black", {
        className: "h-[50%]",
        draggable: "false",
        style: {
          filter:
            highlightedOption === index ? "grayscale(0%)" : "grayscale(50%)",
        },
      })}

      {highlightedOption === index && (
        <m.div
          className="w-max whitespace-nowrap absolute left-[100%] top-1/2 -translate-y-1/2 bg-paperTexture-yellow font-palatino pointer-events-none"
          style={{
            fontSize: sizeAdaptive(55),
            borderWidth: sizeAdaptive(250),
            borderColor: "var(--BLACK)",
            color: "var(--BLACK)",
            fontWeight: "bolder",
            padding: sizeAdaptive(150),
            marginLeft: sizeAdaptive(150),
          }}
        >
          {locale["cancel"]}
        </m.div>
      )}
    </m.div>
  );
}
