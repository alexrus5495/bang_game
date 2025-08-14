import { useEffect, useState } from "react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { useSocket } from "../../../hooks/useSocket";
import { motion } from "motion/react";
import { SocketEvents } from "../../../lib/socketEvents";
import RoleCard from "../../cards/RoleCard";
import CharacterCard from "../../cards/CharacterCard";
import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import CardHighlight from "../shared/CardHighlight";
import Button from "../../shared/Button";
import { usePublicDataState } from "../../../hooks/usePublicDataState";

type CharOption = {
  id: string;
  bullets: number;
};

export default function CharSelectPrompt() {
  const { socket } = useSocket();
  const locale = useSystemLocalization() as Record<string, string>;
  const publicData = usePublicDataState()[0];

  const [role, setRole] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<number>(60);
  const [charOptions, setCharOptions] = useState<CharOption[]>([]);
  const [highlightedOption, setHighlightedOption] = useState<
    "a" | "b" | "none"
  >("none");
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

  const handleSelectChar = (option: 0 | 1) => {
    console.log("SENDING SELECT CHAR");
    socket.emit(SocketEvents.SELECT_CHAR, publicData?.id, option);
  };

  return (
    <div className="w-full h-full bg-black/70 absolute z-3 flex flex-col">
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
            <motion.div
              className="h-full absolute z-1"
              initial={{ x: 0 }}
              animate={{
                x: "-125%",
                scale:
                  highlightedOption === "a" || selectedOption === "a"
                    ? 1.15
                    : 1,
              }}
              onMouseEnter={() => setHighlightedOption("a")}
              onMouseLeave={() => setHighlightedOption("none")}
              onClick={() => setSelectedOption("a")}
            >
              <CardHighlight
                condition={() =>
                  selectedOption === "a" || highlightedOption === "a"
                }
                scaleFactor={2}
                color={"#F3EFE3"}
              />

              {selectedOption === "a" && (
                <Button
                  text={"SELECT"}
                  className="absolute w-full"
                  style={{
                    bottom: "-20%",
                    fontSize: sizeAdaptive(15),
                    color: "var(--WHITE)",
                  }}
                  handler={() => {
                    handleSelectChar(0);
                  }}
                />
              )}

              <CharacterCard cardId={charOptions[0].id} />
            </motion.div>
          )}

          {role !== "" && (
            <div className="h-full absolute z-2">
              <RoleCard cardId={role} />
            </div>
          )}

          <div
            className="absolute w-full"
            style={{
              bottom: "-20%",
              fontSize: sizeAdaptive(15),
              color: "var(--WHITE)",
            }}
          >
            {remainingTime}
          </div>

          {charOptions.length > 0 && (
            <motion.div
              className="h-full absolute z-1"
              initial={{ x: 0 }}
              animate={{
                x: "125%",
                scale:
                  highlightedOption === "b" || selectedOption === "b"
                    ? 1.15
                    : 1,
              }}
              onMouseEnter={() => setHighlightedOption("b")}
              onMouseLeave={() => setHighlightedOption("none")}
              onClick={() => setSelectedOption("b")}
            >
              <CardHighlight
                condition={() =>
                  selectedOption === "b" || highlightedOption === "b"
                }
                scaleFactor={2}
                color={"#F3EFE3"}
              />

              {selectedOption === "b" && (
                <Button
                  text={"SELECT"}
                  className="absolute w-full"
                  style={{
                    bottom: "-20%",
                    fontSize: sizeAdaptive(15),
                    color: "var(--WHITE)",
                  }}
                  handler={() => {
                    handleSelectChar(1);
                  }}
                />
              )}

              <CharacterCard cardId={charOptions[1].id} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
