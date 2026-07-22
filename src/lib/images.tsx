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
  if (imageId === "equals") {
    extraProps = { className: "pl-3 pr-0" };
  }

  //Integrating special rules
  let combinedClassName = twMerge(options?.className, extraProps?.className);

  // Make images unselectable
  combinedClassName = twMerge(combinedClassName, "select-none");

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
      className: combinedClassName,
      draggable: false,
    } as React.ImgHTMLAttributes<HTMLImageElement> &
      RegularImageComponentCustomProps;

    return <resource.component {...imgOptions} />;
  }
}
