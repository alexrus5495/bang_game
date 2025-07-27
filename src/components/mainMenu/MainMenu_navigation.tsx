import { useState } from "react";
import { motion } from "motion/react";
import MainMenu_navigation_Home from "./MainMenu_navigation/Home";
import { AnimatePresence } from "motion/react";
import MainMenu_navigation_Join from "./MainMenu_navigation/Join";

export default function MainMenu_navigation({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) {
  const [menuState, setMenuState] = useState("home");

  const FONT_SIZE_FACTOR = 13;

  return (
    <nav
      className="h-[60%] w-[30%] absolute bottom-[14%] right-[7.6%]"
      aria-label="Main menu"
    >
      <ul
        className="
            text-center
            pt-[10%] 
            "
        style={{
          fontSize: `min(calc(51vw/${FONT_SIZE_FACTOR}), calc(100vh/${FONT_SIZE_FACTOR}))`,
        }}
      >
        <AnimatePresence mode="wait">
          {menuState === "home" && (
            <motion.div
              key={"home"}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
            >
              <MainMenu_navigation_Home
                setMenuState={setMenuState}
                setCurrentPage={setCurrentPage}
              />
            </motion.div>
          )}

          {menuState === "join" && (
            <motion.div
              key={"join"}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
            >
              <MainMenu_navigation_Join setMenuState={setMenuState} />
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </nav>
  );
}
