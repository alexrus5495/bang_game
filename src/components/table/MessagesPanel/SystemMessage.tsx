import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { assertNever } from "../../../lib/utils/assertNever";
import type {
  MessageData_Card,
  MessageData_Player,
  SystemMessage,
} from "../../../types";

export default function Message_System({
  message,
  fontSizeFactor,
}: {
  message: SystemMessage;
  fontSizeFactor: number;
}) {
  const locale = useSystemLocalization() as Record<string, string>;

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `[${hours}:${minutes}]`;
  };

  const formatMessage = (message: SystemMessage) => {
    const template = locale[message.template];
    const data = message.data;

    if (!data) return template;

    return template.replace(/\{(\w+)\}/g, (_, key) => {
      const item = data[key as keyof typeof data];
      return item ? formatDataItem(item) : "";
    });
  };

  const formatDataItem = (
    item: MessageData_Player | MessageData_Card,
  ): string => {
    switch (item.type) {
      case "player":
        return item.isAI ? locale[item.data] : item.data;

      case "card":
        return item.data;
      default:
        return assertNever(item);
    }
  };

  const messageTime = formatTime(new Date(message.timestamp));
  const messageText = formatMessage(message);

  return (
    <div
      className="text-[var(--GOLD)] font-palatino"
      style={{ fontSize: sizeAdaptive(fontSizeFactor) }}
    >{`${messageTime} ${messageText}`}</div>
  );
}
