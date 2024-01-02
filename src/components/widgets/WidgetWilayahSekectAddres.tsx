import React, { ChangeEvent, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (props: boolean) => void;
  isName: string;
  inputName: string;
  filterInput: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const WidgetWilayahSekectAddres = (props: IProps) => {
  const { children, setIsOpen, isOpen, isName, inputName, filterInput } = props;

  return (
    <div className="relative my-6">
      <button
        className="w-full p-3 border rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="float-left">{isName}</span>
        <svg
          className="float-right h-4 fill-current"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 129 129"
          enableBackground="new 0 0 129 129"
        >
          <g>
            <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
          </g>
        </svg>
      </button>
      <div
        className={`absolute z-50 bg-white left-0 right-0 my-2 rounded shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="static top-0 p-2">
          <input
            className="w-full h-8 px-2 border-2 rounded"
            name={inputName}
            onChange={filterInput}
            placeholder="search"
          />
        </div>
        <div className="overflow-y-auto max-h-80">{children}</div>
      </div>
    </div>
  );
};
