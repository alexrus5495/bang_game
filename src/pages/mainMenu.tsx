import MainMenu_background from "../components/mainMenu/MainMenu_background";
import MainMenu_navigation from "../components/mainMenu/MainMenu_navigation";
import Logo from "../components/mainMenu/Logo";
import Poster from "../components/mainMenu/Poster";

export default function MainMenu() {
  return (
    <div
      className="absolute select-none"
      style={{ height: "min(51vw, 100vh)", width: "min(100vw, 196vh)" }}
    >
      <Poster />
      <Logo />
      <MainMenu_background />
      <MainMenu_navigation />
    </div>
  );
}
