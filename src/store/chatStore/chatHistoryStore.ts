import axios from "axios";
import { makeAutoObservable } from "mobx";
import { authStore } from "../authStore/auth";

export type IdChatType = "chat" | "phoneNumber";

export interface QuotedMessage {
  stanzaId: string;
  participant: string;
  typeMessage: string;
  textMessage?: string;
  isForwarded?: boolean;
}

export interface ContactInfo {
  avatar: string;
  name: string;
  contactName: string;
  phoneNumber: string;
  chatId: string;
  chatType: string;
  username: string;
}

export interface MessageComponentProps {
  idMessage?: string;
  timestamp: Date;
  type: string;
  chatId?: string;
  chatType?: string;
  textMessage: string;
  senderId?: string;
  senderName?: string;
  statusMessage?: string;
  isEdited: boolean;
  quotedMessage?: QuotedMessage | null;
  downloadUrl?: string;
}

class ChatHistoryStore {
  history: MessageComponentProps[] = [];
  loading = false;
  error: string | null | unknown = null;
  subscribe: boolean = false;
  contactInfo: ContactInfo | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  async getHistoryChat(chatId: string, count: number = 100) {
    this.loading = true;
    this.error = null;

    authStore.getProfile();

    try {
      const res = await axios.post(
        `https://4100.api.green-api.com/waInstance${authStore.authData?.idInstance}/getChatHistory/${authStore.authData?.apiTokenInstance}`,
        { chatId, count },
        { headers: { "Content-Type": "application/json" } },
      );

      this.history = Array.isArray(res.data) ? res.data : [];
      this.subscribe = true;
    } catch (error) {
      this.error = error;
      this.history = [];
    } finally {
      this.loading = false;
    }
  }
  async sendMessage(
    chatId: string,
    message: string,
    typingTime: number = 1000,
  ) {
    this.error = null;
    authStore.getProfile();

    try {
      await axios.post(
        `https://4100.api.green-api.com/waInstance${authStore.authData?.idInstance}/sendMessage/${authStore.authData?.apiTokenInstance}`,
        {
          chatId,
          message,
          typingTime,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      this.error = error;
    }
  }
  async getContactInfo(chatId: string) {
    this.error = null;
    try {
      const res = await axios.post(
        `https://4100.api.green-api.com/waInstance${authStore.authData?.idInstance}/getContactInfo/${authStore.authData?.apiTokenInstance}`,
        {
          chatId,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      this.contactInfo = res.data;
    } catch (error) {
      this.error = error;
    }
  }
}
export const historyStore = new ChatHistoryStore();
