import RegularImageComponent from "./components/RegularImageComponent";
import SVGImageComponent from "./components/SVGImageComponent";
import { CARDPACKS } from "../../config/cardpacks";
import type { ImageComponent, ImageManifest, ImageResources } from "./types";

const MANIFEST_LOADERS: Record<
  string,
  () => Promise<{ default: ImageManifest }>
> = {
  base: () => import("../../assets/images/base/manifest.ts"),
};

export async function preloadImages(): Promise<ImageResources> {
  const resources: ImageResources = {};

  // Resolve all manifest modules safely using the static registry
  const manifests = await Promise.all(
    CARDPACKS.map(async (pack) => {
      const loadManifest = MANIFEST_LOADERS[pack];

      if (!loadManifest) {
        throw new Error(
          `[Preload Error]: Manifest loader for pack "${pack}" is not registered.`,
        );
      }

      const module = await loadManifest();
      return module.default;
    }),
  );

  // Flatten the manifest structure to extract all image metadata entries
  const images = manifests.flatMap((manifest) =>
    Object.values(manifest).flatMap((section) => Object.entries(section)),
  );

  // Load and cache all images concurrently
  await Promise.all(
    images.map(async ([name, url]) => {
      resources[name] = await loadImage(url);
    }),
  );

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
