import { usePublicDataState } from "../../hooks/usePublicDataState";
import { useSocket } from "../../hooks/useSocket";
import { processPlayersArray } from "../../lib/gameData/processPlayersArray";
import Layout_4 from "./OtherPlayersDisplay/Layout_4";
import Layout_5 from "./OtherPlayersDisplay/Layout_5";
import Layout_6 from "./OtherPlayersDisplay/Layout_6";
import Layout_7 from "./OtherPlayersDisplay/Layout_7";

export default function OtherPlayersDisplay() {
  const { socket } = useSocket();
  const publicData = usePublicDataState();

  if (!publicData) return null;

  const players = processPlayersArray(
    publicData.playersPublicData,
    socket.id as string,
  );

  if (!players) return null;

  const numberOfPlayers = players.length;

  return (
    <div className="w-full h-full">
      {numberOfPlayers === 4 && (
        <Layout_4 playersData={players} clientId={socket.id} />
      )}
      {numberOfPlayers === 5 && (
        <Layout_5 playersData={players} clientId={socket.id} />
      )}
      {numberOfPlayers === 6 && (
        <Layout_6 playersData={players} clientId={socket.id} />
      )}
      {numberOfPlayers === 7 && (
        <Layout_7 playersData={players} clientId={socket.id} />
      )}
    </div>
  );
}
