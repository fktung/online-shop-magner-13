import React, { ReactNode } from "react";
import { IoArrowBack } from "react-icons/io5";

interface IProps {
  children?: ReactNode;
}

export const IconBack = (props: IProps) => {
  const { children } = props;
  return (
    <span className="flex items-center gap-2">
      <i className="text-3xl transition-all duration-300 text-brand-muted hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-brand-light">
        <IoArrowBack className="transition-all duration-300 hover:scale-125" />
      </i>
      {children}
    </span>
  );
};
