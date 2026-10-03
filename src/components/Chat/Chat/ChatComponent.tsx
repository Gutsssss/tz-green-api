interface ChatComponentProps {
  id: string;
  name: string;
  action: () => void;
  selected: string;
}

export const ChatComponent = (props: ChatComponentProps) => {
  const { id, name, action, selected } = props;
  return (
    <div
      className={`flex flex-row items-center p-2 cursor-pointer font-medium text-gray-500 hover:bg-green-100 ${id === selected ? "bg-green-100" : "hover:bg-gray-100"}`}
      key={id}
      onClick={action}
    >
      <p className="text-l">{name}</p>
    </div>
  );
};
