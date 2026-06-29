import React, { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

function usePortalRoot(portalId: string) {
  const [portalRoot, setPortalRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = document.createElement("div");
    element.id = portalId;
    document.body.appendChild(element);

    setPortalRoot(element);

    return () => {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
    };
  }, [portalId]);

  return portalRoot;
}

const RootPortal = React.memo(
  ({ children, portalId }: { children: ReactNode; portalId: string }) => {
    const portalRoot = usePortalRoot(portalId);

    if (!portalRoot) {
      return null;
    }

    return createPortal(children, portalRoot);
  },
);

export default RootPortal;
