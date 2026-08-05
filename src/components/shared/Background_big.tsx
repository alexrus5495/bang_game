import { getImageComponent } from "../../lib/images";

export default function Background_big() {
  return getImageComponent("blank_2", {
    className:
      "h-[95%] w-auto absolute  select-none border border-white p-0 m-0",
    draggable: false,
  });
}
