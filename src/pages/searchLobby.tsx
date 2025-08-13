import SearchLobby_background from "../components/searchLobby/SearchLobby_background";
import SearchLobby_content from "../components/searchLobby/SearchLobby_content";

export default function SearchLobby() {
  return (
    <div
      className="w-[100vw] absolute select-none flex justify-center items-center "
      style={{ height: "min(51vw, 100vh)", width: "min(100vw, 196vh)" }}
    >
      <SearchLobby_background />
      <SearchLobby_content />
    </div>
  );
}
