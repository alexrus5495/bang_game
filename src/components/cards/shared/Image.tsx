import { getImageComponent } from "../../../lib/images";

export default function CardImageComponent({
  cardImage,
}: {
  cardImage: string;
}) {
  return (
    <>
      {getImageComponent(cardImage, {
        className: "w-[355px] border h-auto m-auto",
      })}
    </>
  );
}
