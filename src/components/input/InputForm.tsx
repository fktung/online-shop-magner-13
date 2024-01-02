import React, { ChangeEvent, ReactNode } from "react";

export type TInputForm = {
  [key: string]: string;
};

interface IPropsInput {
  type: string;
  name: string;
  value: string;
  className?: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
}

export const InputForm = (props: IPropsInput) => {
  const {
    type,
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    children,
    className,
    disabled,
    required,
  } = props;
  return (
    <div className="relative my-2">
      <input
        type={type}
        placeholder={placeholder || ""}
        className={`w-full input border-zinc-200 focus:border-brand dark:bg-dark-components focus:outline-none ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
      />
      {children}
    </div>
  );
};
