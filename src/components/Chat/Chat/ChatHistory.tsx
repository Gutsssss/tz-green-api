import type { MessageComponentProps } from "@/store/chatStore/chatHistoryStore";
import { MessageComponent } from "./MessageComponent";
import { Loader } from "@/components/Loader/Loader";

interface ChatHistoryProps {
  history: MessageComponentProps[];
  loading: boolean;
}
export const ChatHistory = (props: ChatHistoryProps) => {
  const { history, loading } = props;
  if (loading) {
    return (
      <div className="m-auto">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col-reverse">
      {history?.map((message) => (
        <MessageComponent
          key={message.idMessage}
          textMessage={message?.textMessage}
          timestamp={message?.timestamp}
          isEdited={message?.isEdited}
          senderName={message?.senderName}
          statusMessage={message?.statusMessage}
          type={message.type}
          quotedMessage={message?.quotedMessage}
          downloadUrl={message?.downloadUrl}
        />
      ))}
    </div>
  );
};
