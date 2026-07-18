import { useCardsMetaDataState } from "../../../../stores/hooks/useCardsMetaDataState";
import { useSystemLocalization } from "../../../../stores/hooks/useSystemLocalization";
import { useTooltip } from "../../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../../lib/images";
import type { CardsMetaData, TooltipMessage } from "../../../../types";
import Tooltip from "../../Tooltip/Tooltip";
import { useMemo } from "react";
import { useIsDragging } from "../../../../stores/hooks/localStateStore.hooks";

export default function RoleIcon({ role }: { role: string }) {
  const { position, isVisible, handlersPinable, isPinned } = useTooltip();
  const isDragging = useIsDragging();
  const locale = useSystemLocalization() as Record<string, string>;
  const cardsMeta = useCardsMetaDataState()[0] as CardsMetaData;

  const roleIconElement = useMemo(() => {
    return getImageComponent(role, { draggable: false });
  }, [role]);

  const tooltipContent = useMemo<TooltipMessage[]>(
    () => [[{ type: "roleCardRef", content: cardsMeta.roleDeckMeta[role] }]],
    [cardsMeta.roleDeckMeta, role],
  );

  return (
    <div className="z-0">
      <div
        className="rounded-[50%] bg-paperTexture-yellow relative z-3"
        {...handlersPinable}
        style={{
          cursor: isDragging ? "default" : "pointer",
          borderWidth: sizeAdaptive(300),
          padding: sizeAdaptive(300),
        }}
      >
        {roleIconElement}
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
    </div>
  );
}
