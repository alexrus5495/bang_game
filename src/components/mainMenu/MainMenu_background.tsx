import { getImageComponent } from "../../lib/images";
import AnimatedStar from "./AnimatedStar";

export default function MainMenu_background() {
  return (
    <>
      {getImageComponent("blank_1", {
        className:
          "h-[70%] w-auto absolute bottom-[10%] right-[6%] select-none",
      })}
      <AnimatedStar />
    </>
  );
}
