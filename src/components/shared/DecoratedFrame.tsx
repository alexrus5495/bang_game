import type { ReactNode } from "react";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import frame_topArch from "../../assets/images/base/misc/frame_topArch.svg";
import frame_topArch_texture from "../../assets/images/base/misc/frame_topArch_texture.webp";
import frame_doubleArch from "../../assets/images/base/misc/frame_doubleArch.svg";
import frame_doubleArch_texture from "../../assets/images/base/misc/frame_doubleArch_texture.webp";

type DecoratedFrameVariant = "topArch" | "doubleArch";

export default function DecoratedFrame({
  variant,
  children,
  className,
  style,
}: {
  variant: DecoratedFrameVariant;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  let FrameComponent;
  switch (variant) {
    case "topArch":
      FrameComponent = TopArch;
      break;
    case "doubleArch":
      FrameComponent = DoubleArch;
      break;
    default:
      console.error(`Unknown decoratedFrame variant: ${variant}`);
      return null;
  }

  return (
    <FrameComponent children={children} className={className} style={style} />
  );
}

function TopArch({
  children,
  className = "",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const borderStyles = {
    borderStyle: "solid",
    borderWidth: `${sizeAdaptive(20)} ${sizeAdaptive(200)} ${sizeAdaptive(200)} ${sizeAdaptive(200)}`,
    borderImageSlice: "100 10 10 10 fill",
    borderImageRepeat: "stretch",
    borderImageOutset: `0 ${sizeAdaptive(400)} ${sizeAdaptive(500)} ${sizeAdaptive(400)}`,
  };

  return (
    <div className={`absolute ${className} h-auto w-auto`} style={style}>
      <div
        className="absolute z-10 inset-0 pointer-events-none"
        style={{
          ...borderStyles,
          borderImageSource: `url(${frame_topArch_texture})`,
        }}
      />

      <div
        className="relative z-11 box-content h-auto w-auto"
        style={{
          ...borderStyles,
          borderImageSource: `url("${frame_topArch}")`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function DoubleArch({
  children,
  className = "",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const borderStyles = {
    borderStyle: "solid",
    borderWidth: `${sizeAdaptive(50)} ${sizeAdaptive(70)}`,
    borderImageSlice: "30 30 30 30 fill",
    borderImageRepeat: "stretch",
    borderImageOutset: `${sizeAdaptive(50)} ${sizeAdaptive(170)}`,
  };

  return (
    <div className={`relative ${className} h-auto w-auto`} style={style}>
      <div
        className="absolute z-10 inset-0 pointer-events-none"
        style={{
          ...borderStyles,
          borderImageSource: `url(${frame_doubleArch_texture})`,
        }}
      />

      <div
        className="relative z-11 box-content h-auto w-auto"
        style={{
          ...borderStyles,
          borderImageSource: `url("${frame_doubleArch}")`,
        }}
      >
        <div
          className="h-auto w-auto"
          style={{
            minHeight: sizeAdaptive(20),
            minWidth: sizeAdaptive(8),
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
