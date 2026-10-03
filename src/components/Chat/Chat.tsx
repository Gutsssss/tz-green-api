import { useCallback, useEffect, useRef, useState } from "react";
import { useGreenPolling } from "@/assets/hooks/useGreenPooling";
import { ChatComponent } from "./Chat/ChatComponent";
import { ChatHistory } from "./Chat/ChatHistory";
import { Input } from "../shared/Input/Input";
import { Button } from "../shared/Button/Button";
import { notificationsStore } from "@/store/notificationStore/notificationStore";
import { ModalSendMessage } from "../ModalSendMessage/ModalSendMessage";
import {
  historyStore,
  type ContactInfo,
  type MessageComponentProps,
} from "@/store/chatStore/chatHistoryStore";
import { authStore } from "@/store/authStore/auth";
import { chatStore } from "@/store/chatStore/chatStore";
import { Loader } from "../Loader/Loader";
import { observer } from "mobx-react-lite";

const BASE = "https://4100.api.green-api.com";

export const Chat = observer(() => {
  const [text, setText] = useState("");
  const [chatId, setChatId] = useState("");
  const [historyMessages, setHistoryMessages] = useState<
    MessageComponentProps[] | []
  >([]);
  const [chatInfo, setChatInfo] = useState<ContactInfo | null>(null);

  const shownIds = useRef<Set<string>>(new Set());
  const { messages } = useGreenPolling({
    idInstance: authStore.authData?.idInstance as string,
    apiTokenInstance: authStore.authData?.apiTokenInstance as string,
    baseUrl: BASE,
  });
  useEffect(() => {
    messages.forEach((m) => {
      if (shownIds.current.has(m.idMessage)) return;
      shownIds.current.add(m.idMessage);
      if (m.chatId === chatId) return;

      notificationsStore.push({
        senderData: {
          senderName: m.senderData.senderName,
          chatName: m.senderData.chatName,
          senderPhoneNumber: m.senderData.senderPhoneNumber,
        },
        senderId: m.chatId,
        text: m.text,
      });
    });
  }, [messages, chatId]);
  const getHistory = async (chatId: string) => {
    await historyStore.getHistoryChat(chatId);
    setHistoryMessages(historyStore.history);
  };

  useEffect(() => {
    if (chatStore.chats.length === 0) {
      chatStore.loadChats();
    }
  }, []);
  const getContactInfo = async (chatId: string) => {
    await historyStore.getContactInfo(chatId);
    setChatInfo(historyStore.contactInfo);
  };

  const sendMessage = async () => {
    historyStore.sendMessage(chatId, text);
    setText("");
  };
  const setChatHistory = (chatId: string) => {
    const cleanChatId = String(chatId).replace(/^-/, "");
    setChatId(chatId);
    getHistory(chatId);
    getContactInfo(cleanChatId);
  };

  const handleChangeText = useCallback((value: string) => {
    setText(value);
  }, []);
  return (
    <div className="flex h-screen bg-[#e6ebee]">
      <div className="w-[320px] flex flex-col border-r border-[#dadce0] bg-white shrink-0">
        <div className="text-center m-2 p-2 flex flex-row items-center justify-between">
          <h1 className="text-xl">Чаты</h1>
          <ModalSendMessage />
        </div>
        <div className="flex-1 overflow-y-auto border-t border-[#dadce0]">
          {chatStore.loading ? (
            <div className="text-center">
              <Loader />
            </div>
          ) : (
            <>
              {chatStore.chats.map((chat) => (
                <ChatComponent
                  key={chat.chatId}
                  action={() => {
                    setChatHistory(chat.chatId);
                  }}
                  name={chat.name}
                  id={chat.chatId}
                  selected={chatId}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#dadce0] bg-white shrink-0">
          {chatInfo?.avatar ? (
            <img
              className="object-cover w-10 h-10 rounded-full bg-gray-200 shrink-0"
              src={chatInfo.avatar}
              alt={chatInfo.name || "chat"}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#3390ec] text-white flex items-center justify-center font-semibold shrink-0">
              {(chatInfo?.name || "?")[0].toUpperCase()}
            </div>
          )}
          <div className="flex flex-col leading-tight min-w-0">
            <p className="font-semibold text-black truncate">
              {chatInfo?.name ||
                chatInfo?.username ||
                chatInfo?.chatId ||
                chatId}
              {chatInfo?.chatType === "channel" && (
                <span className="ml-1 text-xs text-gray-400 font-normal">
                  канал
                </span>
              )}
              {(chatInfo?.chatType === "group" ||
                chatInfo?.chatType === "supergroup") && (
                <span className="ml-1 text-xs text-gray-400 font-normal">
                  группа
                </span>
              )}
            </p>
            <p className="text-xs text-[#707579] truncate">
              {chatInfo?.username || chatInfo?.chatId || ""}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 bg-[#e6ebee]">
          <div className="flex flex-col gap-2">
            <ChatHistory
              history={historyMessages}
              loading={historyStore.loading}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 border-t border-[#dadce0] bg-white shrink-0">
          <div className="flex-1">
            <Input
              type="text"
              value={text}
              onChange={handleChangeText}
              innerPlaceholder="Напишите сообщение"
              fullWidth
              isTextarea
            />
          </div>
          <Button title="Отправить" clickIvent={sendMessage} />
        </div>
      </div>
    </div>
  );
});
