import { getImageComponent } from "../../lib/images";

export default function Poster() {
  return getImageComponent("mainMenu-poster", {
    className: "h-[90%] top-[5%] left-[6%] w-auto absolute select-none",
    draggable: "false",
  });
}
