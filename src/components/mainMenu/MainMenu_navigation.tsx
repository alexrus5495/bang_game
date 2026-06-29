import { useState } from "react";
import { m } from "motion/react";
import MainMenu_navigation_Home from "./MainMenu_navigation/Home";
import { AnimatePresence } from "motion/react";
import MainMenu_navigation_Join from "./MainMenu_navigation/Join";

export default function MainMenu_navigation() {
  const [menuState, setMenuState] = useState("home");

  const FONT_SIZE_FACTOR = 13;

  return (
    <nav
      className="h-[60%] w-[30%] absolute bottom-[14%] right-[7.6%]"
      aria-label="Main menu"
    >
      <ul
        className="text-center pt-[10%] h-full w-full"
        style={{
          fontSize: `min(calc(51vw/${FONT_SIZE_FACTOR}), calc(100vh/${FONT_SIZE_FACTOR}))`,
        }}
      >
        <AnimatePresence mode="wait">
          {menuState === "home" && (
            <m.div
              key={"home"}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
            >
              <MainMenu_navigation_Home setMenuState={setMenuState} />
            </m.div>
          )}

          {menuState === "join" && (
            <m.div
              className="h-full w-full"
              key={"join"}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
            >
              <MainMenu_navigation_Join setMenuState={setMenuState} />
            </m.div>
          )}
        </AnimatePresence>
      </ul>
    </nav>
  );
}
