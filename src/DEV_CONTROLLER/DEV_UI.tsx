import { useState } from "react";
import { useUiController } from "../stores/hooks/localStateStore.hooks";

export default function DevUi() {
  const [highlightedButton, setHighlightedButton] = useState<number | null>(
    null,
  );
  const uiController = useUiController();
  return (
    <div className="h-auto w-60 p-3 bg-amber-500 flex gap-5 justify-center">
      <div className="flex flex-col gap-2 items-center">
        <div
          className="text-3xl cursor-pointer"
          style={{ color: highlightedButton === 1 ? "white" : "black" }}
          onMouseEnter={() => setHighlightedButton(1)}
          onMouseLeave={() => setHighlightedButton(null)}
          onClick={() => uiController.resetInteractionPhase()}
        >
          RESET INTERACTION
        </div>
      </div>
    </div>
  );
}
