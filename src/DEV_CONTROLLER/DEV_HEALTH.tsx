import { useState } from "react";
import { socket } from "../lib/socket";
import { SocketEvents } from "../lib/socketEvents";
import {
  usePlayers,
  usePlayersController,
} from "../stores/hooks/localStateStore.hooks";

export default function DevHealth() {
  const players = usePlayers();
  const playersController = usePlayersController();

  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(
    players[0]?.id ?? "",
  );

  const activePlayer =
    players.find((p) => p.id === selectedPlayerId) ?? players[0];

  const handleDamage = () => {
    if (!activePlayer) return;

    const currentHealth = activePlayer.stats.health.current;
    const maxHealth = activePlayer.stats.health.max;
    const newCurrent = Math.max(0, currentHealth - 1);

    socket.emit(SocketEvents.DEV_DAMAGE_PLAYER, { playerId: activePlayer.id });

    playersController.updateHealth(activePlayer.id, {
      current: newCurrent,
      max: maxHealth,
    });
  };

  const handleHeal = () => {
    if (!activePlayer) return;

    const currentHealth = activePlayer.stats.health.current;
    const maxHealth = activePlayer.stats.health.max;
    const newCurrent = Math.min(maxHealth, currentHealth + 1);

    socket.emit(SocketEvents.DEV_HEAL_PLAYER, { playerId: activePlayer.id });

    playersController.updateHealth(activePlayer.id, {
      current: newCurrent,
      max: maxHealth,
    });
  };

  return (
    <div className="h-auto w-64 p-3 bg-amber-500 flex flex-col gap-3 items-center rounded shadow-lg">
      <div className="text-3xl font-bold text-black">HEALTH</div>

      {players.length === 0 ? (
        <div className="text-black/70 text-sm font-mono">No players found</div>
      ) : (
        <>
          <select
            className="w-full h-10 px-2 text-lg bg-white text-black border border-gray-400 rounded cursor-pointer font-mono"
            value={activePlayer?.id ?? ""}
            onChange={(e) => setSelectedPlayerId(e.target.value)}
          >
            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nickname} ({p.id.slice(0, 4)})
              </option>
            ))}
          </select>

          <div className="text-black font-mono self-start px-1 text-sm">
            HP:{" "}
            <span className="font-bold text-base">
              {activePlayer?.stats.health.current} /{" "}
              {activePlayer?.stats.health.max}
            </span>
          </div>

          <div className="flex gap-2 w-full">
            <button
              type="button"
              className="flex-1 h-10 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded cursor-pointer transition-colors active:scale-95"
              onClick={handleDamage}
            >
              DAMAGE
            </button>

            <button
              type="button"
              className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded cursor-pointer transition-colors active:scale-95"
              onClick={handleHeal}
            >
              HEAL
            </button>
          </div>
        </>
      )}
    </div>
  );
}
