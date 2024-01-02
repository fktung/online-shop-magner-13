import React from "react";
import { BsQrCode } from "react-icons/bs";
import { ModalShowQrcode } from "../modal";

export const WidgetQrcodeGenerate = () => {
  const htmlFor = "QrCode";
  return (
    <React.Fragment>
      <label
        htmlFor={htmlFor}
        className={`px-4 py-1 flex gap-2 items-center justify-center font-semibold text-center text-white transition-all duration-300 bg-black rounded-md hover:bg-zinc-800`}
      >
        <BsQrCode />
        QR Code
      </label>
      <ModalShowQrcode htmlFor={htmlFor} />
    </React.Fragment>
  );
};
