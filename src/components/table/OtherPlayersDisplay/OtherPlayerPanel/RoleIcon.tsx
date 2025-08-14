import { useCardsMetaDataState } from "../../../../hooks/useCardsMetaDataState";
import { useSystemLocalization } from "../../../../hooks/useSystemLocalization";
import { useTooltip } from "../../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../../lib/images";
import type { CardsMetaData, TooltipMessage } from "../../../../types";
import Tooltip from "../../Tooltip";

export default function RoleIcon({ role }: { role: string }) {
  const { position, isVisible, handlersPinable, isPinned } = useTooltip();
  const locale = useSystemLocalization() as Record<string, string>;
  const cardsMeta = useCardsMetaDataState()[0] as CardsMetaData;

  const tooltipContent: TooltipMessage[] = [
    [{ type: "roleCardRef", content: cardsMeta.roleDeckMeta[role] }],
  ];

  return (
    <>
      <div
        className="h-[50%] aspect-square rounded-[50%] bg-[var(--BEIGE)] absolute cursor-pointer"
        {...handlersPinable}
        style={{
          borderWidth: sizeAdaptive(300),
          padding: sizeAdaptive(300),
          bottom: "-15%",
          left: "13%",
        }}
      >
        {getImageComponent(role, { draggable: false })}
      </div>

      {isVisible && (
        <Tooltip
          title={locale.role}
          content={tooltipContent}
          position={position}
          hasCardRef={true}
          isPinned={isPinned}
        />
      )}
    </>
  );
}
