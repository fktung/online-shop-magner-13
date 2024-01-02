import React, { ReactNode } from "react";

interface IProps {
  variant?: "border" | "shadow";
  className?: string;
  children: ReactNode;
}

export const Card = (props: IProps) => {
  const { children, className, variant } = props;

  return (
    <div
      className={`p-4 rounded-xl dark:shadow-zinc-500 ${className} ${variant}`}
    >
      {children}
    </div>
  );
};
