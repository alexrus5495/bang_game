import { useEffect, useState } from "react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { useSocket } from "../../../hooks/useSocket";
import { motion } from "motion/react";
import { SocketEvents } from "../../../lib/socketEvents";
import RoleCard from "../../cards/RoleCard";
import CharacterCard from "../../cards/CharacterCard";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import CardHighlight from "../shared/CardHighlight";
import Button from "../../shared/Button";
import { usePublicDataState } from "../../../stores/hooks/usePublicDataState";
import RootPortal from "../../shared/RootPortal";

type CharOption = {
  id: string;
  bullets: number;
};

type HighlightedOption = "a" | "b" | "none";

export default function CharSelectPrompt() {
  const { socket } = useSocket();
  const locale = useSystemLocalization() as Record<string, string>;

  const [role, setRole] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<number>(60);
  const [charOptions, setCharOptions] = useState<CharOption[]>([]);
  const [highlightedOption, setHighlightedOption] =
    useState<HighlightedOption>("none");
  const [selectedOption, setSelectedOption] = useState<"a" | "b" | "none">(
    "none",
  );

  useEffect(() => {
    const onSendTimerUpdate = (data: number) => {
      setRemainingTime(data);
    };

    const onSendCharOptions = (data: CharOption[]) => {
      setCharOptions(data);
    };

    const onSendRole = (role: string) => {
      setRole(role);
    };

    socket.emit(SocketEvents.REQUEST_ROLE);
    socket.emit(SocketEvents.REQUEST_CHAR_OPTIONS);

    socket.on(SocketEvents.SEND_TIMER_UPDATE, onSendTimerUpdate);
    socket.on(SocketEvents.SEND_CHAR_OPTIONS, onSendCharOptions);
    socket.on(SocketEvents.SEND_ROLE, onSendRole);

    return () => {
      socket.off(SocketEvents.SEND_CHAR_OPTIONS, onSendCharOptions);
      socket.off(SocketEvents.SEND_ROLE, onSendRole);
    };
  }, [socket]);

  return (
    <RootPortal portalId={"char-select-prompt"}>
      <div className="w-full h-full bg-black/90 absolute z-3 flex flex-col">
        <div className="w-full h-[20%] border border-white flex justify-center items-center">
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            className="text-stroke-black"
            style={{ fontSize: sizeAdaptive(10), color: "var(--RED)" }}
          >
            {locale["charSelect_title"]}
          </motion.div>
        </div>

        <div className="w-full h-[65%] border border-white flex justify-center">
          <div className="border border-white h-[70%] flex justify-center relative">
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

            <div
              className="absolute text-center"
              style={{
                bottom: "-20%",
                fontSize: sizeAdaptive(15),
                color: "var(--WHITE)",
              }}
            >
              {remainingTime}
            </div>

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
  const { socket } = useSocket();
  const publicData = usePublicDataState()[0];

  const handleSelectChar = (option: 0 | 1) => {
    socket.emit(SocketEvents.SELECT_CHAR, publicData?.id, option);
  };

  return (
    <motion.div
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
    </motion.div>
  );
}
