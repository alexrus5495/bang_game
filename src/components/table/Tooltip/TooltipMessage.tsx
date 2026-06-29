import React from "react";
import type {
  CharacterCardMeta,
  PlayingCardMeta,
  RoleCardMeta,
  TooltipMessage,
} from "../../../types";
import TooltipMessageCardRef from "./TooltipMessagePart";

const TooltipMessageLine = React.memo(
  ({ message }: { message: TooltipMessage }) => {
    return (
      <>
        {message.map((part, index) => {
          if (part.type === "plainText") {
            return (
              <span
                // react-doctor-disable-next-line no-array-index-as-key
                key={index}
              >
                {part.content as string}
              </span>
            );
          } else {
            return (
              <TooltipMessageCardRef
                meta={
                  part.content as
                    | PlayingCardMeta
                    | CharacterCardMeta
                    | RoleCardMeta
                }
                type={part.type}
                // react-doctor-disable-next-line no-array-index-as-key
                key={index}
              />
            );
          }
        })}
        <div></div>
      </>
    );
  },
);

export default TooltipMessageLine;
