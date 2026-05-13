import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

function usePortalRoot(portalId: string) {
  const portalRootRef = useRef<HTMLDivElement>(null);

  if (portalRootRef.current === null && typeof document !== "undefined") {
    const portalRoot = document.createElement("div");
    portalRoot.id = portalId;
    document.body.appendChild(portalRoot);

    portalRootRef.current = portalRoot;
  }

  useEffect(() => {
    return () => {
      if (portalRootRef.current) {
        document.body.removeChild(portalRootRef.current);
        portalRootRef.current = null;
      }
    };
  }, []);

  return portalRootRef.current;
}

export default function RootPortal({
  children,
  portalId,
}: {
  children: ReactNode;
  portalId: string;
}) {
  const portalRoot = usePortalRoot(portalId);

  if (!portalRoot) {
    return null;
  }

  return createPortal(children, portalRoot);
}
