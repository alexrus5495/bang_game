import { getImageComponent } from "../../../lib/images";

export default function TooltipIcon() {
  return getImageComponent("book", {
    className: "h-[30px] absolute bottom-50 left-2",
  });
}
