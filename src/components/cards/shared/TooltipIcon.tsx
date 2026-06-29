import React, { useMemo } from "react";
import { getImageComponent } from "../../../lib/images";

const TooltipIcon = React.memo(() => {
  const imageComponent = useMemo(() => {
    return getImageComponent("book", {
      className: "h-[30px] absolute bottom-50 left-2",
    });
  }, []);

  return imageComponent;
});

export default TooltipIcon;
