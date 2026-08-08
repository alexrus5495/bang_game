import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import Button from "../../shared/Button";
import { useCurrentPageState } from "../../../stores/hooks/useCurrentPageState";

export default function MainMenu_navigation_Home({
  setMenuState,
}: {
  setMenuState: (state: string) => void;
}) {
  const locale = useSystemLocalization();
  const setCurrentPage = useCurrentPageState()[1];

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
