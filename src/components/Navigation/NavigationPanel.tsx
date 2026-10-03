import { Link } from "../shared/Link/Link";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Letter from "@/assets/icons/letter.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Profile from "@/assets/icons/profile.svg?react";
export const NavigationPanel = () => {
  return (
    <div className="w-[100px] border-r border-gray-200 py-4">
      <Link itemPath="/" text="Чаты" icon={<Letter />} />
      <Link itemPath="/profile" text="Профиль" icon={<Profile />} />
    </div>
  );
};
