export type ImageManifest = {
  [section: string]: Record<string, string>;
};

type ImageComponentBase<TType extends string, TProps> = {
  type: TType;
  component: React.FC<TProps>;
};

type SVGImageComponent = ImageComponentBase<
  "svg",
  React.SVGProps<SVGSVGElement> & SVGImageComponentCustomProps
>;

export type SVGImageComponentCustomProps = {
  //Custom props go here
  color?: string;
};

type RegularImageComponent = ImageComponentBase<
  "image",
  React.ImgHTMLAttributes<HTMLImageElement> & RegularImageComponentCustomProps
>;

export type RegularImageComponentCustomProps = {
  /** Custom props go here
   *
   * @internal A plug to prevent {any} behavior. Remove after adding custom props.
   */
  __noCustomPropsYet?: never;
};

export type ImageComponent = SVGImageComponent | RegularImageComponent;
export type ImageResources = Record<string, ImageComponent>;
