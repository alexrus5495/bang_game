import CreateLobby_content from "../components/createLobby/CreateLobby_content";
import { motion } from "motion/react";
import Background_big from "../components/shared/Background_big";

export default function CreateLobby() {
  return (
    <motion.div
      className="w-[100vw] absolute select-none flex justify-center items-center "
      style={{ height: "min(51vw, 100vh)", width: "min(100vw, 196vh)" }}
    >
      <Background_big />
      <CreateLobby_content />
    </motion.div>
  );
}
