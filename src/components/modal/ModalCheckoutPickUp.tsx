import React, { useRef, useState } from "react";
import { Modal } from "./Modal";
import { InputForm } from "../input";

type TModalCheckoutPickUpProps = {
  htmlFor: string;
  setIsNote: (param: string) => void;
};

export const ModalCheckoutPickUp = (props: TModalCheckoutPickUpProps) => {
  const { htmlFor, setIsNote } = props;
  const [isValNote, setIsValNote] = useState("");
  const closeModalRef = useRef<HTMLLabelElement | null>(null);

  const saveNote = () => {
    setIsNote(isValNote);
    if (closeModalRef.current instanceof HTMLElement) {
      closeModalRef.current.click();
    }
  };

  return (
    <Modal htmlFor={htmlFor}>
      <div className="text-center">
        <h3 className="text-lg font-bold">Catatan</h3>
      </div>
      <div className="my-4">
        <InputForm
          type="text"
          name="note"
          value={isValNote}
          onChange={(e) => {
            setIsValNote(e.target.value);
          }}
          placeholder="Nama Pemberi Barang"
        />
        <div className="flex items-center justify-end gap-4 my-4">
          <label
            ref={closeModalRef}
            htmlFor={htmlFor}
            className="w-full px-6 py-2 font-semibold text-center transition-all duration-300 border border-black rounded-md cursor-pointer min-w-max sm:w-36 hover:bg-zinc-100 dark:border-white"
          >
            Cancle
          </label>
          <button
            type="button"
            className="w-full px-6 py-2 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md min-w-max sm:w-36 hover:bg-zinc-800"
            onClick={saveNote}
          >
            simpan
          </button>
        </div>
      </div>
    </Modal>
  );
};
