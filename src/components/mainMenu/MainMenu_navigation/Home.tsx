import Button from "../../shared/Button";
import { useCurrentPageState } from "../../../stores/hooks/useCurrentPageState";
import { useTranslation } from "../../../hooks/useTranslation";

export default function MainMenu_navigation_Home({
  setMenuState,
}: {
  setMenuState: (state: string) => void;
}) {
  const t = useTranslation();
  const setCurrentPage = useCurrentPageState()[1];

  return (
    <>
      <li>
        <Button
          text={t("create_lobby")}
          handler={() => setCurrentPage("createLobby")}
        />
      </li>

      <li>
        <Button text={t("join_lobby")} handler={() => setMenuState("join")} />
      </li>

      <li>
        <Button
          text={t("search_lobby")}
          handler={() => setCurrentPage("searchLobby")}
        />
      </li>
      <li>
        <Button text={t("credits")} handler={() => console.log("PLUG")} />
      </li>
    </>
  );
}
