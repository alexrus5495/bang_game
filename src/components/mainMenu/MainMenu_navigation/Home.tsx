import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import Button from "../../shared/Button";

export default function MainMenu_navigation_Home({
  setMenuState,
  setCurrentPage,
}: {
  setMenuState: (state: string) => void;
  setCurrentPage: (page: string) => void;
}) {
  const locale = useSystemLocalization() as Record<string, string>;

  return (
    <>
      <li>
        <Button
          text={locale["create_lobby"]}
          handler={() => setCurrentPage("createLobby")}
        />
      </li>

      <li>
        <Button
          text={locale["join_lobby"]}
          handler={() => setMenuState("join")}
        />
      </li>

      <li>
        <Button
          text={locale["search_lobby"]}
          handler={() => setCurrentPage("searchLobby")}
        />
      </li>
      <li>
        <Button text={locale["credits"]} handler={() => console.log("PLUG")} />
      </li>
    </>
  );
}
