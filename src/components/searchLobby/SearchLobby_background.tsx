import { sizeAdaptive } from "../../lib/css/cssFunctions";
import { getImageComponent } from "../../lib/images";
import Background_big from "../shared/Background_big";

export default function SearchLobby_background() {
  return (
    <>
      <Background_big />
      {getImageComponent("outlaw", {
        style: {
          height: sizeAdaptive(8),
          bottom: sizeAdaptive(16),
          right: sizeAdaptive(3.0),
        },
        className: "absolute",
      })}
    </>
  );
}
