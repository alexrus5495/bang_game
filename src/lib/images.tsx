import { preloadImages } from "./images/imagePreloader";
import type {
  RegularImageComponentCustomProps,
  SVGImageComponentCustomProps,
} from "./images/types";

export const IMAGES = await preloadImages();

export function getImageComponent(
  imageId: string,
  options?:
    | ({ type?: "svg" } & React.SVGProps<SVGSVGElement> &
        SVGImageComponentCustomProps)
    | ({ type?: "image" } & React.ImgHTMLAttributes<HTMLImageElement> &
        RegularImageComponentCustomProps),
): React.ReactElement {
  const resource = IMAGES[imageId];

  if (!resource) {
    return <div>Image failed to load</div>;
  }

  if (resource.type === "svg") {
    const svgOptions = options as React.SVGProps<SVGSVGElement> &
      SVGImageComponentCustomProps;
    return <resource.component {...svgOptions} />;
  } else {
    const imgOptions = options as React.ImgHTMLAttributes<HTMLImageElement> &
      RegularImageComponentCustomProps;
    return <resource.component {...imgOptions} />;
  }
}
