import type { ReactNode } from "react";
import { NavLink } from "react-router";

interface LinkProps {
  text: string;
  icon: ReactNode;
  itemPath: string;
}

export const Link = (props: LinkProps) => {
  const { icon, itemPath, text } = props;
  return (
    <NavLink to={itemPath}>
      <div className="flex flex-col p-2 justify-center items-center hover:text-green-500">
        {icon}
        <p>{text}</p>
      </div>
    </NavLink>
  );
};
