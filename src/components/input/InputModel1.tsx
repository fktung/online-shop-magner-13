import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";

interface InputModel1Props {
  label: string;
  type: string;
  name: string;
  id: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  className?: string;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
}

export const InputModel1: React.FC<InputModel1Props> = props => {
  const [isValue, setIsValue] = useState(false);

  function inputLoad() {
    if (props.value && props.value.trim() !== "") {
      setIsValue(true);
    }
  }

  function inputForm() {
    setIsValue(true);
  }

  function outInput() {
    if (!props.value || props.value.trim() === "") {
      setIsValue(false);
    }
  }

  useEffect(() => {
    if (props.value && props.value.trim() !== "") {
      setIsValue(true);
    }
  }, [props.value]);

  return (
    <div className="relative pt-4 my-2">
      <label className="">
        <span
          className={`absolute min-w-max top-5 right-full left-2 opacity-80 transition-all duration-300 ${
            isValue ? "is-input" : "font-bold"
          }`}
        >
          {props.label}
        </span>
        <input
          type={props.type}
          name={props.name}
          id={props.id}
          value={props.value || ""}
          onChange={props.onChange}
          className={`w-full bg-transparent focus:ring-0 border-b text-black dark:text-neutral-200 focus:outline-none border-brand focus:border-yellow-500 dark:focus:border-white ${
            isValue ? "border-yellow-500 dark:border-neutral-800" : ""
          } h-10 px-2 group-focus:bg-black
          ${props.className}`}
          onLoad={inputLoad}
          onFocus={inputForm}
          onBlur={outInput}
          onKeyUp={props.onKeyUp}
        />
      </label>
      {props.children}
    </div>
  );
};
