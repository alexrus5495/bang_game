import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import Button from "../../shared/Button";
import { setCurrentPage } from "../../../store/slices/currentPageSlice";
import { useAppDispatch } from "../../../hooks/useAppSelector";

export default function MainMenu_navigation_Home({
  setMenuState,
}: {
  setMenuState: (state: string) => void;
}) {
  const locale = useSystemLocalization() as Record<string, string>;
  const dispatch = useAppDispatch();

  return (
    <>
      <li>
        <Button
          text={locale["create_lobby"]}
          handler={() => dispatch(setCurrentPage("createLobby"))}
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
          handler={() => dispatch(setCurrentPage("searchLobby"))}
        />
      </li>
      <li>
        <Button text={locale["credits"]} handler={() => console.log("PLUG")} />
      </li>
    </>
  );
}
