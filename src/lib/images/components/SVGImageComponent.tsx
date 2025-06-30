import type { SVGImageComponentCustomProps } from "../types";

export default function SVGImageComponent({
  color,
  className,
  innerSVG,
  ...svgProps
}: React.SVGProps<SVGSVGElement> &
  SVGImageComponentCustomProps & { innerSVG: string }) {
  return (
    <svg
      {...svgProps}
      className={`${className} [&_*]:fill-inherit`}
      viewBox="0 0 760 1112"
      preserveAspectRatio="none"
      fill={color}
      dangerouslySetInnerHTML={{ __html: innerSVG }}
    />
  );
}
