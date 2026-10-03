import { observer } from "mobx-react-lite";
import type { AppNotification } from "@/store/notificationStore/notificationStore";
import { notificationsStore } from "@/store/notificationStore/notificationStore";

export const NotificationToast = observer(
  ({ notification }: { notification: AppNotification }) => {
    const { senderData, senderId, text } = notification;

    return (
      <div
        className="
          pointer-events-auto w-80 overflow-hidden rounded-2xl
          bg-white shadow-xl ring-1 ring-black/5
          animate-[slideIn_0.25s_ease-out]
        "
      >
        <div className="flex items-start gap-3 p-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-semibold text-gray-900">
                {senderData?.senderName || "Без имени"}
              </span>
              <button
                onClick={() => notificationsStore.remove(notification.id)}
                className="shrink-0 text-gray-400 transition hover:text-gray-600"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            <div className="mt-0.5 truncate text-xs text-gray-500">
              {senderData?.chatName || senderId}
            </div>

            <p className="mt-1.5 line-clamp-3 text-sm text-gray-700">{text}</p>
          </div>
        </div>
      </div>
    );
  },
);
