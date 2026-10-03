import { makeAutoObservable, runInAction } from "mobx";

export interface AppNotification {
  id: string;
  senderId: string;
  text: string;
  createdAt: number;
  senderData: {
    chatName: string;
    senderName: string;
    senderPhoneNumber: number;
  };
}

class NotificationsStore {
  items: AppNotification[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  push(n: Omit<AppNotification, "id" | "createdAt">, ttl = 5000) {
    const item: AppNotification = {
      ...n,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };

    this.items.push(item);

    if (ttl > 0) {
      setTimeout(() => this.remove(item.id), ttl);
    }

    return item.id;
  }

  remove(id: string) {
    runInAction(() => {
      this.items = this.items.filter((n) => n.id !== id);
    });
  }

  clear() {
    this.items = [];
  }
}

export const notificationsStore = new NotificationsStore();
