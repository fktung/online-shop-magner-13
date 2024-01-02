import React, { ReactNode } from "react";

type TProps = {
  children: string | ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
};

export const ButtonBlack = (props: TProps) => {
  const { children, disabled, className, type, onClick } = props;
  return (
    <button
      type={type || "button"}
      className={`bg-black px-6 py-2 rounded-lg font-semibold text-white 
      hover:bg-zinc-800 transition-all duration-300
      ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
