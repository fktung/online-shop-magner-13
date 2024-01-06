import React, { FormEvent, useRef, useState } from "react";
import { Modal } from "./Modal";
import { InputForm } from "../input";
import { ApiAxios } from "@/helpers/axios";
import { IItemCart } from "@/types";

interface IProps {
  data: IItemCart;
  getItem: () => void;
}

export const ModalCartItem = (props: IProps) => {
  const { data, getItem } = props;
  const [isNote, setIsNote] = useState<string>(data.note || "");
  const myClose = useRef<HTMLLabelElement | null>(null);

  const hendleSubmitNote = async (el: FormEvent<HTMLFormElement>) => {
    el.preventDefault();
    if (myClose.current instanceof HTMLElement) {
      myClose.current.click();
    }
    try {
      await ApiAxios.patch(`/carts/${data.id}`, {
        note: isNote,
      });
      getItem();
    } catch (error: any) {
      console.log("hendleSubmitNote", error);
    }
  };
  return (
    <Modal htmlFor={data.slug + data.id} className="w-11/12 max-w-2xl">
      <div className="text-center">
        <h3 className="text-lg font-bold">Catatan</h3>
      </div>
      <div className="my-4">
        <form onSubmit={hendleSubmitNote}>
          <InputForm
            type="text"
            name="note"
            value={isNote}
            onChange={(e) => {
              setIsNote(e.target.value);
            }}
          />
          <div className="flex items-center justify-end gap-4 my-4">
            <label
              ref={myClose}
              htmlFor={data.slug + data.id}
              className="w-full px-6 py-2 font-semibold text-center transition-all duration-300 border border-black rounded-md cursor-pointer min-w-max sm:w-36 hover:bg-zinc-100 dark:border-white"
            >
              Cancle
            </label>
            <button
              type="submit"
              className="w-full px-6 py-2 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md min-w-max sm:w-36 hover:bg-zinc-800"
            >
              simpan
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
