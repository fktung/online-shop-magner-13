import React from "react";
import { BsFillShareFill } from "react-icons/bs";
import { ModalShareSosmed } from "../modal";

export const WidgetShareSosmed = () => {
  const htmlFor = "shareSosmed";
  return (
    <React.Fragment>
      <label
        htmlFor={htmlFor}
        className={`px-4 py-1 flex gap-2 items-center justify-center font-semibold text-center text-white transition-all duration-300 bg-black rounded-md hover:bg-zinc-800`}
      >
        <BsFillShareFill />
        Share
      </label>
      <ModalShareSosmed htmlFor={htmlFor} />
    </React.Fragment>
  );
};
