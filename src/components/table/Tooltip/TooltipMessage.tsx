import type {
  CharacterCardMeta,
  PlayingCardMeta,
  RoleCardMeta,
  TooltipMessage,
} from "../../../types";
import TooltipMessageCardRef from "./TooltipMessagePart";

export default function TooltipMessageLine({
  message,
}: {
  message: TooltipMessage;
}) {
  return (
    <>
      {message.map((part, index) => {
        if (part.type === "plainText") {
          return <span key={index}>{part.content as string}</span>;
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
              key={index}
            />
          );
        }
      })}
      <div></div>
    </>
  );
}
