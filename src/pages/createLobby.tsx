import CreateLobby_background from "../components/createLobby/CreateLobby_background";
import CreateLobby_content from "../components/createLobby/CreateLobby_content";
import { motion } from "motion/react";

export default function CreateLobby({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) {
  return (
    <motion.div
      className="w-[100vw] absolute select-none flex justify-center items-center "
      style={{ height: "min(51vw, 100vh)", width: "min(100vw, 196vh)" }}
    >
      <CreateLobby_background />
      <CreateLobby_content setCurrentPage={setCurrentPage} />
    </motion.div>
  );
}
