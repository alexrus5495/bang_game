import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../../lib/images";

export default function RoleIcon({ role }: { role: string }) {
  return (
    <div
      className="h-[50%] aspect-square rounded-[50%] bg-[var(--BEIGE)] absolute"
      style={{
        borderWidth: sizeAdaptive(300),
        padding: sizeAdaptive(300),
        bottom: "-15%",
        left: "13%",
      }}
    >
      {getImageComponent(role, { draggable: false })}
    </div>
  );
}
