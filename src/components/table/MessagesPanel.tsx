import { useMessagesState } from "../../hooks/useMessagesState";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import Message_System from "./MessagesPanel/SystemMessage";

export default function MessagesPanel() {
  const messages = useMessagesState()[0];

  return (
    <div
      className="bg-black/50 h-full w-full border border-[var(--BLACK)]"
      style={{ borderRadius: sizeAdaptive(50) }}
    >
      {messages &&
        messages.map((msg, index) => {
          switch (msg.type) {
            case "system":
              return (
                <Message_System message={msg} key={index} fontSizeFactor={55} />
              );
          }
        })}
    </div>
  );
}
