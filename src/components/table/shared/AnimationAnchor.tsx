import React from "react";
import { useAnchorRef, type AnchorId } from "../../../contexts/AnchorsContext";

type AnchorProps = {
  id: AnchorId;
  className?: string;
  style?: React.CSSProperties;
};

const AnimationAnchor = React.memo(({ id, className, style }: AnchorProps) => {
  const ref = useAnchorRef<HTMLDivElement>(id);

  return <div ref={ref} className={className} style={style}></div>;
});

export default AnimationAnchor;
