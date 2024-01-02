import React, { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

interface IModal {
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

export const Modal: React.FC<IModal> = props => {
  const { htmlFor, children, className } = props;
  return (
    <>
      <input type="checkbox" id={htmlFor} className="modal-toggle" />
      <div className="modal">
        <div className={`relative modal-box no-scrollbar ${className}`}>
          <label
            htmlFor={htmlFor}
            className="fixed cursor-pointer top-5 right-5"
          >
            <IoIosClose className="text-4xl" />
          </label>
          {children}
        </div>
        <label className="modal-backdrop" htmlFor={htmlFor} />
      </div>
    </>
  );
};
