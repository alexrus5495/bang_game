import { useState } from "react";
import { socket } from "../lib/socket";
import { usePlayersController } from "../stores/hooks/localStateStore.hooks";
import { SocketEvents } from "../lib/socketEvents";

const CARD_TYPES = [
  "bang_",
  "missed_",
  "beer_",
  "stagecoach_",
  "wells_fargo_",
  "gatling_",
  "indians_",
  "cat_balou_",
  "panic_",
  "saloon_",
  "duel_",
  "general_store_",
  "mustang_",
  "scope_",
  "barrel_",
  "jail_",
  "dynamite_",
  "schofield_",
  "remington_",
  "carabine_",
  "winchester_",
  "volcanic_",
] as const;

const CARD_INDEXES = Array.from({ length: 10 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);

export default function DevCard() {
  const [selectedType, setSelectedType] = useState<string>(CARD_TYPES[0]);
  const [selectedIndex, setSelectedIndex] = useState<string>(CARD_INDEXES[0]);
  const playersController = usePlayersController();

  const handleAdd = () => {
    if (!socket.id) return;

    const cardId = `${selectedType}${selectedIndex}`;

    socket.emit(SocketEvents.DEV_ADD_TO_HAND, cardId);

    playersController.addToHand(socket.id, cardId);
  };

  return (
    <div className="h-auto w-64 p-3 bg-amber-500 flex flex-col gap-3 items-center rounded shadow-lg">
      <div className="text-3xl font-bold text-black">CARDS</div>

      <div className="flex gap-2 w-full">
        <select
          className="flex-1 h-10 px-2 text-lg bg-white text-black border border-gray-400 rounded cursor-pointer font-mono"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {CARD_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          className="w-20 h-10 px-2 text-lg bg-white text-black border border-gray-400 rounded cursor-pointer font-mono text-center"
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(e.target.value)}
        >
          {CARD_INDEXES.map((index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>
      </div>

      <div className="text-xs text-black/70 font-mono self-start px-1">
        Target ID:{" "}
        <span className="font-bold">
          {selectedType}
          {selectedIndex}
        </span>
      </div>

      <button
        type="button"
        className="h-10 w-full bg-green-600 hover:bg-green-700 text-white text-2xl font-bold rounded cursor-pointer transition-colors active:scale-95"
        onClick={handleAdd}
      >
        ADD
      </button>
    </div>
  );
}
