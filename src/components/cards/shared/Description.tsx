import React from "react";
import { getImageComponent } from "../../../lib/images";
import type { CardDescription as CardDescriptionType } from "../../../types";
import { renderDescriptionBlock } from "./renderDescriptionBlock";

export default function CardDescriptionComponent({
  description,
  packKey,
}: {
  description: CardDescriptionType;
  packKey: string;
}) {
  const totalLinesNumber = description.length;

  //Calculate line height:
  //(CONTAINER_HEIGHT - TOTAL_DIVIDERS_HEIGHT) / TOTAL_NUMBER_OF_LINES
  const lineHeight = `${Math.floor((175 - 8 * Math.max(0, totalLinesNumber - 1)) / totalLinesNumber)}px`;

  const lineClasses = `flex items-center justify-evenly`;
  const lineInlineStyle = { height: lineHeight };

  return (
    <div
      className={`h-[175px] mt-[5px] w-full pl-[10px] pr-[10px] flex flex-col select-none`}
    >
      {description.map((line, lineIndex) => (
        <React.Fragment key={`line-${lineIndex}`}>
          <div
            style={lineInlineStyle}
            className={lineClasses}
            draggable="false"
          >
            {line.map((block, blockIndex) =>
              renderDescriptionBlock(
                block,
                lineIndex,
                blockIndex,
                packKey,
                totalLinesNumber,
              ),
            )}
          </div>

          {/* Render divider after each line except the last one*/}
          {lineIndex !== description.length - 1 &&
            getImageComponent("divider", {
              className: "h-[8px] m-auto",
            })}
        </React.Fragment>
      ))}
    </div>
  );
}
