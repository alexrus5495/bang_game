import React, { useEffect, useState } from "react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { m } from "motion/react";
import { SocketEvents } from "../../../lib/socketEvents";
import RoleCard from "../../cards/RoleCard";
import CharacterCard from "../../cards/CharacterCard";
import CardHighlight from "../shared/CardHighlight";
import Button from "../../shared/Button";
import RootPortal from "../../shared/RootPortal";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { socket } from "../../../lib/socket";
import ScreenDimmer from "../../shared/ScreenDimmer";
import type { BroadcastedTimerData } from "../../../types";
import { useTranslation } from "../../../hooks/useTranslation";

type CharOption = {
  id: string;
  bullets: number;
};

type HighlightedOption = "a" | "b" | "none";

const CharSelectPrompt = React.memo(() => {
  const t = useTranslation();
  const [role, setRole] = useState<string>("");
  const [charOptions, setCharOptions] = useState<CharOption[]>([]);
  const [highlightedOption, setHighlightedOption] =
    useState<HighlightedOption>("none");
  const [selectedOption, setSelectedOption] = useState<"a" | "b" | "none">(
    "none",
  );

  useEffect(() => {
    const onSendCharOptions = (data: CharOption[]) => {
      setCharOptions(data);
    };

    const onSendRole = (role: string) => {
      setRole(role);
    };

    socket.emit(SocketEvents.REQUEST_ROLE);
    socket.emit(SocketEvents.REQUEST_CHAR_OPTIONS);

    socket.on(SocketEvents.SEND_CHAR_OPTIONS, onSendCharOptions);
    socket.on(SocketEvents.SEND_ROLE, onSendRole);

    return () => {
      socket.off(SocketEvents.SEND_CHAR_OPTIONS, onSendCharOptions);
      socket.off(SocketEvents.SEND_ROLE, onSendRole);
    };
  }, []);

  return (
    <RootPortal portalId={"char-select-prompt"}>
      <ScreenDimmer dimStrength={80} />

      <div className="fixed inset-0 z-40 flex flex-col justify-start pointer-events-auto">
        <div className="w-full h-[25%] flex justify-center items-center">
          <m.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            className="text-stroke-black"
            style={{ fontSize: sizeAdaptive(10), color: "var(--RED)" }}
          >
            {t("charSelect_title")}
          </m.div>
        </div>

        <div className="w-full h-[65%] flex justify-center items-start">
          <div className="border h-[70%] flex justify-center relative">
            {charOptions.length > 0 && (
              <CharOption
                isHighlighted={highlightedOption === "a"}
                isSelected={selectedOption === "a"}
                charOptionIndex={0}
                charOptionId={charOptions[0].id}
                onMouseEnter={() => setHighlightedOption("a")}
                onMouseLeave={() => setHighlightedOption("none")}
                onClick={() => setSelectedOption("a")}
              />
            )}

            {role !== "" && (
              <div className="h-full absolute z-2">
                <RoleCard cardId={role} />
              </div>
            )}

            <Timer />

            {charOptions.length > 0 && (
              <CharOption
                isHighlighted={highlightedOption === "b"}
                isSelected={selectedOption === "b"}
                charOptionIndex={1}
                charOptionId={charOptions[1].id}
                onMouseEnter={() => setHighlightedOption("b")}
                onMouseLeave={() => setHighlightedOption("none")}
                onClick={() => setSelectedOption("b")}
              />
            )}
          </div>
        </div>
      </div>
    </RootPortal>
  );
});

function Timer() {
  const [timerData, setTimerData] = useState<null | BroadcastedTimerData>(null);

  useEffect(() => {
    const onSendTimerUpdate = (data: BroadcastedTimerData) => {
      setTimerData(data);
    };

    socket.on(SocketEvents.SEND_TIMER_UPDATE, onSendTimerUpdate);

    return () => {
      socket.off(SocketEvents.SEND_TIMER_UPDATE, onSendTimerUpdate);
    };
  }, []);

  return (
    <div
      className="absolute text-center"
      style={{
        bottom: "-20%",
        fontSize: sizeAdaptive(15),
        color: "var(--WHITE)",
      }}
    >
      {timerData?.currentValue ?? ""}
    </div>
  );
}

function CharOption({
  isHighlighted,
  isSelected,
  charOptionIndex,
  charOptionId,
  onMouseLeave,
  onMouseEnter,
  onClick,
}: {
  isHighlighted: boolean;
  isSelected: boolean;
  charOptionIndex: 0 | 1;
  charOptionId: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const gameId = useLocalStateStore((state) => state.gameId);

  const handleSelectChar = (option: 0 | 1) => {
    socket.emit(SocketEvents.SELECT_CHAR, gameId, option);
  };

  return (
    <m.div
      className="h-full absolute z-1"
      initial={{ x: 0 }}
      animate={{
        x: charOptionIndex === 0 ? "-125%" : "125%",
        scale: isHighlighted || isSelected ? 1.15 : 1,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <CardHighlight
        condition={() => isSelected || isHighlighted}
        scaleFactor={2}
        color={"#F3EFE3"}
      />

      {isSelected && (
        <Button
          text={"SELECT"}
          className="absolute w-full"
          style={{
            bottom: "-20%",
            fontSize: sizeAdaptive(15),
            color: "var(--WHITE)",
          }}
          handler={() => {
            handleSelectChar(charOptionIndex);
          }}
        />
      )}

      <CharacterCard cardId={charOptionId} />
    </m.div>
  );
}

export default CharSelectPrompt;
