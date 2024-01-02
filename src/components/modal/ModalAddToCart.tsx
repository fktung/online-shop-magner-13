import React from "react";
import { Modal } from "./Modal";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/router";
import { ROUTES } from "@/constant/routes";
import { Image } from "../utility";
import { MoneyFormat } from "@/helpers/common";
import { AnimationSuccess } from "../animation";
import { IoIosClose } from "react-icons/io";
import { IProductDetailDescription } from "@/types";

interface IProps {
  htmlFor: string;
  toggleModal: () => void;
  data?: IProductDetailDescription;
  IsPrice?: number;
  isShowAdd: boolean;
  setIsShowAdd: (props: boolean) => void;
}

export const ModalAddToCart = (props: IProps) => {
  const { data, IsPrice, isShowAdd, setIsShowAdd } = props;
  const router = useRouter();
  const hendleNextPage = () => {
    props.toggleModal();
    router.push(ROUTES.CART);
  };

  return (
    <Modal htmlFor={props.htmlFor} className="w-11/12 max-w-lg">
      <label
        htmlFor={props.htmlFor}
        onClick={() => setIsShowAdd(false)}
        className="fixed z-10 cursor-pointer top-5 right-5"
      >
        <IoIosClose className="text-4xl" />
      </label>
      <div className="text-center">
        {isShowAdd && (
          <div className="">
            <AnimationSuccess />
          </div>
        )}
        <h3 className="text-lg font-bold">
          Item telah ditambahkan di keranjang
        </h3>
      </div>
      <div className="my-4">
        <div className="flex mx-auto max-w-max">
          <div className="w-32 p-2 border rounded-lg">
            <Image
              src={
                data ? process.env.NEXT_PUBLIC_URL_CDN + "/" + data.imgs[0] : ""
              }
              alt="product"
              className="h-32 mx-auto"
            />
          </div>
          <div className="grid px-8 place-items-center">
            <div className="space-y-4">
              <p>
                <span className="text-xl font-extrabold">
                  {MoneyFormat(IsPrice ?? 0)}
                </span>
                {/* <span className="ml-4 line-through opacity-60">Rp 300.000</span> */}
              </p>
              <p className="text-xl font-extrabold">{data?.name}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 mt-8 sm:justify-center sm:items-center sm:flex">
          <button
            onClick={hendleNextPage}
            className="w-full px-6 py-2 font-semibold text-center transition-all duration-300 border border-black rounded-md cursor-pointer min-w-max sm:w-48 hover:bg-zinc-100 dark:border-white"
          >
            Lihat Keranjang
          </button>
          <button
            onClick={() => router.push(ROUTES.PRODUCTS)}
            className="w-full px-6 py-2 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md min-w-max sm:w-48 hover:bg-zinc-800"
          >
            Lanjutkan Belanja
          </button>
        </div>
        {/* <AiOutlineShoppingCart className="text-xl" /> */}
      </div>
    </Modal>
  );
};
