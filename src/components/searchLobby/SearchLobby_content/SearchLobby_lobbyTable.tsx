import { useMemo, useState } from "react";
import type { LobbyPublicData } from "../../../types";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";

type SortConfig = {
  key: keyof LobbyPublicData;
  direction: "asc" | "desc";
} | null;

export default function SearchLobby_lobbyTable({
  lobbies,
  selectedLobby,
  setSelectedLobby,
}: {
  lobbies: LobbyPublicData[];
  selectedLobby: string | null;
  setSelectedLobby: (lobbyId: string | null) => void;
}) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const locale = useSystemLocalization();

  const sortedLobbies = useMemo(() => {
    if (!sortConfig) return lobbies;

    return [...lobbies].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      } else if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      } else return 0;
    });
  }, [lobbies, sortConfig]);

  const handleSort = (key: keyof LobbyPublicData) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const handleSelectLobby = (lobbyId: string) => {
    if (lobbyId === selectedLobby) {
      setSelectedLobby(null);
    } else {
      setSelectedLobby(lobbyId);
    }
  };

  return (
    <div
      className="h-full w-full flex flex-col"
      style={{ borderRightWidth: sizeAdaptive(200) }}
    >
      <div>
        <table className="w-full">
          <thead
            className="h-[10%]"
            style={{
              borderBottom: "var(--BLACK) solid",
              borderBottomWidth: sizeAdaptive(200),
              fontSize: sizeAdaptive(25),
            }}
          >
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="w-[30%] text-start"
                style={{ paddingLeft: sizeAdaptive(20) }}
              >
                {locale["lobby_name"]}
                {sortConfig?.key === "name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("ownerName")}
                className="w-[29%] text-start"
              >
                {locale["lobby_owner"]}
                {sortConfig?.key === "ownerName" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("availableHumanSlots")}
                className="w-[15%] text-start"
              >
                {locale["lobby_seats"]}
                {sortConfig?.key === "availableHumanSlots" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>

              <th
                onClick={() => handleSort("numberOfSeats")}
                className="w-[10%] text-start"
              >
                {locale["lobby_size"]}
                {sortConfig?.key === "numberOfSeats" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("isPrivate")}
                className="w-[16%] text-start"
              >
                {locale["lobby_private"]}
                {sortConfig?.key === "isPrivate" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div
        className="w-full h-full overflow-scroll custom-scrollbar"
        style={{
          borderBottomLeftRadius: sizeAdaptive(20),
        }}
      >
        <table className="w-full">
          <colgroup>
            <col style={{ width: "30%" }} />
            <col style={{ width: "29%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "16%" }} />
          </colgroup>
          <tbody style={{ fontSize: sizeAdaptive(30) }}>
            {sortedLobbies.map((lobby) => (
              <tr
                key={lobby.id}
                className="h-[10%]"
                onClick={() => handleSelectLobby(lobby.id)}
                style={{
                  backgroundColor:
                    lobby.id === selectedLobby ? "var(--BLACK)" : "",
                  color:
                    lobby.id === selectedLobby ? "#F3EFE3" : "var(--BLACK)",
                }}
              >
                <td style={{ paddingLeft: sizeAdaptive(50) }}>{lobby.name}</td>
                <td>{lobby.ownerName}</td>
                <td className="text-center pr-[7%]">
                  {lobby.availableHumanSlots}
                </td>
                <td className="text-center pr-[4%]">{lobby.numberOfSeats}</td>
                <td className="text-center pr-[5%]">
                  {lobby.isPrivate ? "☑" : "☐"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
