import { useState } from "react";
import { Button } from "../shared/Button/Button";
import { Modal } from "../shared/Modal/Modal";
import { Input } from "../shared/Input/Input";
import {
  historyStore,
  type IdChatType,
} from "@/store/chatStore/chatHistoryStore";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Plus from "@/assets/icons/Vector.svg?react";
const TYPE_OPTIONS: { value: IdChatType; label: string }[] = [
  { value: "chat", label: "Id чата" },
  { value: "phoneNumber", label: "Номер телефона" },
];

export const ModalSendMessage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [chatId, setChatId] = useState("");
  const [selectType, setSelectType] = useState<IdChatType>("phoneNumber");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChangeText = (value: string) => setText(value);
  const handleChangeChatId = (value: string) => setChatId(value);

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectType(e.target.value as IdChatType);
  };

  const handleSend = () => {
    const finalChatId =
      selectType === "phoneNumber" ? `${chatId}@c.us` : chatId;
    historyStore.sendMessage(finalChatId, text);
    setChatId("");
    setText("");
    closeModal();
  };

  return (
    <>
      <Button clickIvent={openModal} icon={<Plus />} />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="flex flex-col gap-2">
          <select
            name="select"
            value={selectType}
            onChange={handleChangeType}
            className="border border-green-500 rounded-xl p-2 w-full"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-0 border border-green-500 rounded-xl overflow-hidden">
            <div className="flex-1">
              <Input
                type="text"
                value={chatId}
                onChange={handleChangeChatId}
                innerPlaceholder={
                  selectType === "phoneNumber"
                    ? "79991234567"
                    : "-1001234567890"
                }
                fullWidth
              />
            </div>
            {selectType === "phoneNumber" && (
              <span className="px-2 text-gray-500 bg-gray-50 flex items-center self-stretch">
                @c.us
              </span>
            )}
          </div>

          <Input
            isTextarea
            fullWidth
            value={text}
            onChange={handleChangeText}
            type="text"
          />

          <Button title="Отправить" clickIvent={handleSend} />
        </div>
      </Modal>
    </>
  );
};
