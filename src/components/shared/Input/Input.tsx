import React from "react";
type TypeInput = "text" | "password" | "email" | "date";

interface InputProps {
  type: TypeInput;
  placeholder?: string;
  innerPlaceholder?: string;
  value: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  isTextarea?: boolean;
  fullWidth?: boolean;
}

export const Input = (props: InputProps) => {
  const {
    type,
    value,
    isTextarea,
    onChange,
    innerPlaceholder,
    placeholder,
    readonly,
    fullWidth,
  } = props;

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange?.(e.target.value);
  };
  const baseStyle = [
    "border border-green-500 rounded-xl p-2 min-h-[40px] disabled:border-green-200",
    fullWidth ? "w-full" : "min-w-[200px]",
  ]
    .filter(Boolean)
    .join(" ");
  const input = (
    <input
      type={type}
      className={baseStyle}
      placeholder={innerPlaceholder}
      disabled={readonly}
      value={value}
      onChange={onChangeHandler}
    />
  );
  const textArea = (
    <textarea
      className={[baseStyle, "min-h-[40px]"].filter(Boolean).join(" ")}
      placeholder={innerPlaceholder}
      disabled={readonly}
      value={value}
      onChange={onChangeHandler}
    />
  );
  return (
    <div>
      {placeholder && <p className="text-sm text-gray-400">{placeholder}</p>}
      {isTextarea ? textArea : input}
    </div>
  );
};
