import Layout_4 from "./OtherPlayersDisplay/Layout_4";
import Layout_5 from "./OtherPlayersDisplay/Layout_5";
import Layout_6 from "./OtherPlayersDisplay/Layout_6";
import Layout_7 from "./OtherPlayersDisplay/Layout_7";
import { useLocalStateStore } from "../../stores/localStateStore";

export default function OtherPlayersDisplay() {
  const numberOfPlayers = useLocalStateStore((state) => state.players.length);

  return (
    <div className="w-full h-full">
      {numberOfPlayers === 4 && <Layout_4 />}
      {numberOfPlayers === 5 && <Layout_5 />}
      {numberOfPlayers === 6 && <Layout_6 />}
      {numberOfPlayers === 7 && <Layout_7 />}
    </div>
  );
}
