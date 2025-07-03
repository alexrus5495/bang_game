import { getImageComponent } from "../../lib/images";

export default function TooltipIcon({ className }: { className: string }) {
  return getImageComponent("book", { className });
}
