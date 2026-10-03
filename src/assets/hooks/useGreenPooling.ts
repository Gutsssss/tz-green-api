import { chatStore } from "@/store/chatStore/chatStore";
import { useCallback, useEffect, useRef, useState } from "react";

export interface ChatMessage {
  idMessage: string;
  chatId: string;
  senderName: string;
  senderData: {
    chatName: string;
    senderName: string;
    senderPhoneNumber: number;
  };
  text: string;
  timestamp: number;
}

interface Options {
  idInstance: string;
  apiTokenInstance: string;
  chatId?: string | null;
  baseUrl: string;
}

export const useGreenPolling = ({
  idInstance,
  apiTokenInstance,
  chatId,
}: Options) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stopRef = useRef(false);
  const runningRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleBody = useCallback((body: any) => {
    if (body?.typeWebhook !== "incomingMessageReceived") return;

    chatStore.scheduleRefresh();

    if (body?.messageData?.typeMessage !== "textMessage") return;

    const msg: ChatMessage = {
      idMessage: body.idMessage,
      chatId: body.senderData?.chatId ?? "",
      senderName: body.senderData?.senderName ?? "",
      text: body.messageData?.textMessageData?.textMessage ?? "",
      timestamp: body.timestamp ?? Math.floor(Date.now() / 1000),
      senderData: body.senderData,
    };

    setMessages((prev) =>
      prev.some((m) => m.idMessage === msg.idMessage) ? prev : [...prev, msg],
    );
  }, []);

  const poll = useCallback(async () => {
    const base = `https://4100.api.green-api.com/waInstance${idInstance}`;

    while (!stopRef.current) {
      try {
        abortRef.current = new AbortController();

        const res = await fetch(
          `${base}/receiveNotification/${apiTokenInstance}`,
          { signal: abortRef.current.signal },
        );

        if (!res.ok) {
          setError(`HTTP ${res.status}`);
          await new Promise((r) => setTimeout(r, 2000));
          continue;
        }

        const data = await res.json();
        setError(null);

        if (!data?.receiptId) continue;

        handleBody(data.body);

        await fetch(
          `${base}/deleteNotification/${apiTokenInstance}/${data.receiptId}`,
          { method: "DELETE" },
        );
      } catch (e: any) {
        if (e?.name === "AbortError") break;
        setError(e?.message ?? "poll error");
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
  }, [idInstance, apiTokenInstance, handleBody]);

  const start = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    stopRef.current = false;
    setRunning(true);
    poll();
  }, [poll]);

  const stop = useCallback(() => {
    stopRef.current = true;
    runningRef.current = false;
    abortRef.current?.abort();
    setRunning(false);
  }, []);

  const reset = useCallback(() => setMessages([]), []);

  useEffect(() => {
    if (!idInstance || !apiTokenInstance) return;
    start();
    return () => stop();
  }, [idInstance, apiTokenInstance, start, stop]);

  const filtered = chatId
    ? messages.filter((m) => m.chatId === chatId)
    : messages;

  return {
    messages: filtered,
    allMessages: messages,
    running,
    error,
    start,
    stop,
    reset,
  };
};
