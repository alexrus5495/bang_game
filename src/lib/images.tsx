import { twMerge } from "tailwind-merge";
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

  //Special rules for specific images
  let extraProps;
  if (imageId === "miss") {
    extraProps = { className: "-rotate-25" };
  } else if (imageId === "equals") {
    extraProps = { className: "pl-0 pr-0" };
  }

  //Integrating special rules
  const combinedClassName = twMerge(options?.className, extraProps?.className);

  if (!resource) {
    return <div>Image failed to load</div>;
  }

  if (resource.type === "svg") {
    const svgOptions = options as React.SVGProps<SVGSVGElement> &
      SVGImageComponentCustomProps;
    return <resource.component {...svgOptions} />;
  } else {
    const imgOptions = {
      ...options,
      ...extraProps,
      className: combinedClassName,
    } as React.ImgHTMLAttributes<HTMLImageElement> &
      RegularImageComponentCustomProps;

    return <resource.component {...imgOptions} />;
  }
}
