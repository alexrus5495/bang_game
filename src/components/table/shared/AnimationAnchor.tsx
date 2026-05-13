import { useAnchor, type AnchorId } from "../../../contexts/AnchorsContext";

type AnchorProps = {
  id: AnchorId;
  className?: string;
  style?: React.CSSProperties;
};

export function AnimationAnchor({ id, className, style }: AnchorProps) {
  const ref = useAnchor<HTMLDivElement>(id);

  return <div ref={ref} className={className} style={style}></div>;
}
