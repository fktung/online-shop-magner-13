import React, { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import Link from "next/link";
import { ADDRESS } from "@/constant/account";
import { ROUTES } from "@/constant/routes";
import { IAddress, IPayment } from "@/types";
import { ApiAxios } from "@/helpers/axios";
import { useLayout } from "@/hooks/layouts";

interface IProps {
  htmlFor: string;
  toggleModal?: () => void;
  getCheckout: () => void;
  payment: IPayment[];
}

export const ModalPaymentsCheckout = (props: IProps) => {
  const { getCheckout, payment } = props;
  const { setIsSuccess, setIsError, setIsMessage } = useLayout();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isAddresses, setAddresses] = useState<IAddress[]>([]);
  const myClose = useRef<HTMLLabelElement | null>(null);

  return (
    <Modal htmlFor={props.htmlFor} className="w-11/12 max-w-2xl">
      <div className="text-center">
        <h3 className="text-lg font-bold">Pilih Payment</h3>
      </div>
      <label ref={myClose} htmlFor={props.htmlFor} className="hidden">
        Cancle
      </label>
      <div className="my-4">
        <div className="mt-4 overflow-y-auto max-h-[28rem] no-scrollbar">
          {payment.map((item, idx) => (
            <div key={idx} className="my-4">
              <div className="items-center px-4 py-2 border md:flex rounded-xl">
                <div className="flex w-full gap-3">
                  <p>
                    <span className="font-bold">{item.name}</span>
                  </p>
                  <p>{item.group}</p>
                </div>
                <div className="mx-auto w-full max-w-[15rem] flex justify-center md:justify-end items-center">
                  <button className="px-4 py-2 text-white transition-all duration-300 bg-black rounded-xl hover:bg-brand-muted dark:border dark:border-white">
                    Pilih
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
