import { sizeAdaptive } from "../../lib/css/cssFunctions";
import Background_big from "../shared/Background_big";

export default function SearchLobby_background() {
  return (
    <>
      <Background_big />
      <img
        src="./outlaw.png"
        alt=""
        className="absolute"
        style={{
          height: sizeAdaptive(8),
          bottom: sizeAdaptive(16),
          right: sizeAdaptive(3.0),
        }}
      />
    </>
  );
}
