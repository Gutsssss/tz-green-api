import { observer } from "mobx-react-lite";
import { notificationsStore } from "@/store/notificationStore/notificationStore";
import { NotificationToast } from "../NotificationCard/NotificationCard";

export const NotificationProvider = observer(
  ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        {children}

        <div
          className="
            pointer-events-none fixed top-4 right-4 z-50
            flex flex-col gap-3
          "
        >
          {notificationsStore.items.map((n) => (
            <NotificationToast key={n.id} notification={n} />
          ))}
        </div>
      </>
    );
  },
);
