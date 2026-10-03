import axios from "axios";
import type { ContactInfo } from "./chatHistoryStore";
import { makeAutoObservable } from "mobx";
import { authStore } from "../authStore/auth";
class ChatStore {
  chats: ContactInfo[] = [];
  loading = false;
  error: string | null | unknown = null;
  private refreshTimer: number | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  async loadChats() {
    this.loading = true;
    this.error = null;
    try {
      const res = await axios.get(
        `https://4100.api.green-api.com/waInstance${authStore.authData?.idInstance}/getChats/${authStore.authData?.apiTokenInstance}`,
      );
      this.chats = Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  }
  scheduleRefresh(delay = 2000) {
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = null;
      this.loadChats();
    }, delay);
  }
}

export const chatStore = new ChatStore();
