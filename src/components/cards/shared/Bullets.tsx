import { getImageComponent } from "../../../lib/images";
export default function Bullets({ count }: { count: number }) {
  return (
    <div
      className="
      absolute
      h-auto 
      w-[83px]
      top-[85px]
      -right-[36px]
      flex-column
      "
    >
      {Array.from({ length: count }, (_, index) => (
        <div className="rotate-20" key={index}>
          {getImageComponent("bullet_full")}
        </div>
      ))}
    </div>
  );
}
