import { TextBlock, SymbolBlock } from "./DescriptionBlocks.tsx";
import type { DescriptionContentBlock } from "../../types";
import type { ReactElement } from "react";

export function renderDescriptionBlock(
  block: DescriptionContentBlock,
  lineIndex: number,
  blockIndex: number,
  packKey: string,
  totalLinesNumber: number,
): ReactElement {
  const key = `block-${lineIndex}-${blockIndex}`;

  switch (block.type) {
    case "text":
      return <TextBlock key={key} textKey={block.key} packKey={packKey} />;
    case "symbol":
      return (
        <SymbolBlock
          key={key}
          symbolKey={block.key}
          totalLinesNumber={totalLinesNumber}
        />
      );
    default:
      return <div>Failed to load description block</div>;
  }
}
