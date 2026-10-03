// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import DotDelivered from "@/assets/icons/dotDelivered.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import DotSending from "@/assets/icons/dotSending.svg?react";
import type { MessageComponentProps } from "@/store/chatStore/chatHistoryStore";

export const MessageComponent = (props: MessageComponentProps) => {
  const {
    type,
    textMessage,
    timestamp,
    senderName,
    isEdited,
    statusMessage,
    quotedMessage,
    downloadUrl,
  } = props;

  const isOutgoing = type === "outgoing";
  const date = new Date(Number(timestamp) * 1000);

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-xl p-2 flex flex-col gap-1 m-2 ${
          isOutgoing ? "bg-green-200" : "bg-[#ffffff]"
        }`}
      >
        {!isOutgoing && senderName && (
          <div className="text-xs font-bold text-blue-600">{senderName}</div>
        )}
        {!senderName && (
          <div className="text-xs font-bold text-blue-600">{"Вы"}</div>
        )}

        {quotedMessage && (
          <div className="border-l-2 border-[#3390ec] pl-2 mb-1 text-sm">
            <div className="font-semibold text-[#3390ec]">
              {quotedMessage.participant}
            </div>
            <div className="text-[#707579] truncate">
              {quotedMessage.textMessage ?? "Медиа"}
            </div>
          </div>
        )}
        {downloadUrl && (
          <img src={downloadUrl} className="object-cover rounded-xl" />
        )}
        <div className="whitespace-pre-wrap break-words">{textMessage}</div>

        <div className="flex items-center gap-1 justify-end text-xs text-gray-500">
          {isEdited && <span>изменено</span>}
          <span>{time}</span>
          {isOutgoing && (
            <span>
              {statusMessage === "delivered" ? (
                <DotDelivered className="w-3 h-3" />
              ) : (
                <DotSending className="w-3 h-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
