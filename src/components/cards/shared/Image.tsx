import { getImageComponent } from "../../../lib/images";

export default function CardImageComponent({
  cardImage,
}: {
  cardImage: string;
}) {
  return (
    <>
      {getImageComponent(cardImage, { className: "w-[230px] m-auto border" })}
    </>
  );
}
