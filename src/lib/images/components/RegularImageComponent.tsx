import React from "react";
import type { RegularImageComponentCustomProps } from "../types";

const RegularImageComponent = React.memo(
  ({
    src,
    className,
    alt = "Card picture",
    ...imgProps
  }: React.ImgHTMLAttributes<HTMLImageElement> &
    RegularImageComponentCustomProps & { src: string }) => {
    return <img {...imgProps} src={src} alt={alt} className={className} />;
  },
);

export default RegularImageComponent;
