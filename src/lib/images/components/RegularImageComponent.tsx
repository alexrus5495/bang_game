import type { RegularImageComponentCustomProps } from "../types";

export default function RegularImageComponent({
  src,
  className,
  alt = "Card picture",
  ...imgProps
}: React.ImgHTMLAttributes<HTMLImageElement> &
  RegularImageComponentCustomProps & { src: string }) {
  return <img {...imgProps} src={src} alt={alt} className={className} />;
}
