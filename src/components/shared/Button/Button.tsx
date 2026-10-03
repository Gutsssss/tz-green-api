import type { ReactNode } from "react";
import { NavLink } from "react-router";
interface ButtonProps {
  title?: string;
  clickIvent?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  linkTo?: string;
}

export const Button = (props: ButtonProps) => {
  const { disabled, icon, title, linkTo, clickIvent } = props;

  const BaseButton = (
    <button
      className="border border-green-500 rounded-xl px-4 py-2 cursor-pointer bg-green-300 hover:bg-green-400 hover:text-green-800 disabled:bg-green-100 disabled:cursor-not-allowed text-green-900 disabled:text-green-900"
      disabled={disabled}
      onClick={clickIvent}
    >
      {icon ? icon : <p className="text-l">{title}</p>}
    </button>
  );
  if (linkTo) {
    return <NavLink to={linkTo}>{BaseButton}</NavLink>;
  }
  return BaseButton;
};
