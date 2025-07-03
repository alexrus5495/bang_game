import { getImageComponent } from "../../lib/images";

export default function BorderComponent({
  borderColor,
}: {
  borderColor: string;
}): React.ReactElement {
  return (
    <>
      {getImageComponent("border_1", {
        color: borderColor,
        className: "w-full h-full absolute rounded-[25px]",
      })}
    </>
  );
}
