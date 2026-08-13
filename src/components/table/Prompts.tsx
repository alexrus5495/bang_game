import React from "react";
import { AnimatePresence } from "motion/react";
import { usePendingInteraction } from "../../stores/hooks/localStateStore.hooks";
import CharSelectPrompt from "./prompts/CharSelectPrompt";
import StorePrompt from "./prompts/StorePrompt";

const Prompts = React.memo(() => {
  const activePrompt = useActivePrompt();

  return <AnimatePresence mode="wait">{activePrompt}</AnimatePresence>;
});

export default Prompts;

const useActivePrompt = () => {
  const pendingInteraction = usePendingInteraction();

  if (pendingInteraction?.type === "CHAR_SELECTION") {
    return <CharSelectPrompt key="char-select-prompt" />;
  }

  if (pendingInteraction?.type === "GENERAL_STORE") {
    return <StorePrompt key="store-prompt" />;
  }

  return null;
};
