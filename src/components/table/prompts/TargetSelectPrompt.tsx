import React, { useState } from "react";
import { useHandValidation } from "../../../hooks/useHandValidation";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { socket } from "../../../lib/socket";
import {
  usePendingCardIndex,
  usePlayersController,
} from "../../../stores/hooks/localStateStore.hooks";
import TargetButton from "./TargetSelectPrompt/TargetButton";
import CancelButton from "./TargetSelectPrompt/CancelButton";
import { useDinamicTargetSelectSpacing } from "./TargetSelectPrompt.hooks";

const TargetSelectPrompt = React.memo(
  ({ cardIndex }: { cardIndex: number }) => {
    const pendingCardIndex = usePendingCardIndex();
    const playersController = usePlayersController();
    const players = playersController.getRotatedPlayerIds(socket?.id ?? "");
    const handValidationData = useHandValidation();
    const [highlightedOption, setHighlightedOption] = useState<number | null>(
      null,
    );

    const possibleTargets =
      pendingCardIndex !== null && handValidationData
        ? (handValidationData[pendingCardIndex]?.possibleTargets ?? [])
        : [];

    // Filter the players array instead of just using possibleTargets because the latter isn't ordered properly
    const targetPlayers = players
      ? players.filter((player) => possibleTargets.includes(player))
      : [];

    const spacing = useDinamicTargetSelectSpacing({ players: targetPlayers });

    if (!players) return null;
    if (!handValidationData) return null;
    if (spacing === null) return null;

    return (
      <div
        className="h-full absolute left-[100%] top-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
        style={{
          display: pendingCardIndex !== cardIndex ? "none" : "block",
          marginLeft: sizeAdaptive(12),
        }}
      >
        {targetPlayers.map((player, index) => (
          <TargetButton
            key={player}
            player={player}
            index={index}
            spacing={spacing}
            highlightedOption={highlightedOption}
            setHighlightedOption={setHighlightedOption}
          />
        ))}

        <CancelButton
          index={targetPlayers.length}
          spacing={spacing}
          highlightedOption={highlightedOption}
          setHighlightedOption={setHighlightedOption}
        />
      </div>
    );
  },
);

export default TargetSelectPrompt;
