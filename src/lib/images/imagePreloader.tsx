import RegularImageComponent from "./components/RegularImageComponent";
import SVGImageComponent from "./components/SVGImageComponent";
import { CARDPACKS } from "../../config/cardpacks";
import type { ImageComponent, ImageManifest, ImageResources } from "./types";

export async function preloadImages(): Promise<ImageResources> {
  const resources: ImageResources = {};

  for (const pack of CARDPACKS) {
    const packModule = await import(`../../assets/images/${pack}/manifest.ts`);
    const packManifest = (await packModule.default) as ImageManifest;

    for (const sectionContent of Object.values(packManifest)) {
      for (const [imgName, imgURL] of Object.entries(sectionContent)) {
        resources[imgName] = await loadImage(imgURL);
      }
    }
  }

  return resources;
}

async function loadImage(imgURL: string): Promise<ImageComponent> {
  if (imgURL.endsWith(".svg")) {
    const svgContent = await fetch(imgURL).then((r) => r.text());
    const innerSVG = svgContent
      .replace(/^<svg[^>]*>/, "")
      .replace(/<\/svg>$/, "");

    return {
      type: "svg",
      component: (props) => (
        <SVGImageComponent {...props} innerSVG={innerSVG} />
      ),
    };
  } else {
    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = imgURL;
    });

    return {
      type: "image",
      component: (props) => <RegularImageComponent {...props} src={imgURL} />,
    };
  }
}
