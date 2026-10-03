import { authStore } from "@/store/authStore/auth";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import DotDelivered from "@/assets/icons/dotDelivered.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import DotSending from "@/assets/icons/dotSending.svg?react";
export const ProfileCard = observer(() => {
  useEffect(() => {
    authStore.getProfile();
  }, []);

  const Row = ({ label, value }: { label: string; value?: string }) => (
    <div className="grid grid-cols-[140px_1fr] items-center gap-2 px-6 py-3.5 text-sm transition-colors hover:bg-gray-50">
      <div className="font-medium text-gray-500">{label}</div>
      <div className="break-all text-gray-900">{value || "—"}</div>
    </div>
  );
  const maskSecret = (value?: string) => {
    if (!value) return "—";
    return (
      value.slice(0, 4) +
      "•".repeat(Math.max(value.length - 8, 0)) +
      value.slice(-4)
    );
  };
  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
      <div className="flex items-center gap-4 px-6 py-6">
        <img
          src={authStore?.authData?.avatar}
          alt={authStore?.authData?.username}
          className="h-18 w-18 rounded-full border-[3px] border-white/50 object-cover bg-white"
          style={{ width: 72, height: 72 }}
        />
        <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold">
            {authStore?.authData?.username || "Без имени"}
          </h2>
          <span className="mt-1 flex items-center gap-2 text-sm text-black/85">
            <span>
              {authStore?.authData?.logoutProcess ? (
                <DotDelivered className="w-3 h-3" />
              ) : (
                <DotSending className="w-3 h-3" />
              )}
            </span>
            {authStore?.authData?.logoutProcess ? "Выходим..." : "В сети"}
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        <Row label="Телефон" value={authStore?.authData?.phone} />
        <Row label="Username" value={authStore?.authData?.username} />
        <Row label="Chat ID" value={authStore?.authData?.chatId} />
        <Row label="ID Instance" value={authStore?.authData?.idInstance} />
        <Row
          label="API Token"
          value={maskSecret(authStore?.authData?.apiTokenInstance)}
        />
      </div>
    </div>
  );
});
