import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { ButtonBlack } from "../button";
import { MoneyFormat } from "@/helpers/common";
import { ApiAxios } from "@/helpers/axios";
import { useLayout } from "@/hooks/layouts";
import { ModalAddToCart } from "../modal";
import { useAuth } from "@/hooks/auth";
import { getCookie } from "cookies-next";
import { ROUTES } from "@/constant/routes";
import { useRouter } from "next/router";
import { IProductDetailDescription } from "@/types";
import { TagProduct } from "./widget";
import { WidgetFlashSale } from "../widgets";

interface IProductDetailDescriptionProps {
  data?: IProductDetailDescription;
  getProductById: () => void;
}

export const ProductDetailDescription = (
  props: IProductDetailDescriptionProps,
) => {
  const { data, getProductById } = props;
  const router = useRouter();
  const { setIsError, setIsSuccess, setIsMessage } = useLayout();
  const { isAuth, setIsPreviousUrl } = useAuth();
  const [isDescription, setIsDescription] = useState(false);
  const [isCheckPlusButton, setIsCheckPlusButton] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isAmount, setIsAmount] = useState(1);
  const [isVariant, setIsVariant] = useState<number>();
  const [isVariantArr, setIsVariantArr] = useState<number>();
  const [isPrice, setIsPrice] = useState<number>();
  const toCart = useRef<HTMLLabelElement | null>(null);

  const tokenStorage = getCookie("_MToken");
  const addToCard = async () => {
    if (!isAuth && !tokenStorage) {
      setIsPreviousUrl(router.asPath);
      setIsError(true);
      setIsMessage("Silahkan Login terlebih dahulu");
      router.push(ROUTES.LOGIN);
      return;
    }
    const dataAddCard: { [k: string]: any } = {
      product_id: data?.id,
      qty: isAmount,
    };
    if (isVariant) dataAddCard.variant_id = isVariant;
    if (data && data.flash_sale.length > 0) {
      dataAddCard.flash_sale_id = data.flash_sale[0].id;
    }
    try {
      const response: any = await ApiAxios.post(`/carts`, dataAddCard);
      const res = response.data;
      setIsSuccess(true);
      setIsMessage(`${res.message} add to cart`);
      setIsAmount(1);
      setIsShowAdd(true);
      toggleModal();
    } catch (error: any) {
      console.log("addToCard", error);
      setIsError(true);
      setIsMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    setIsPrice(data?.price);
  }, [data]);

  const toggleModal = () => {
    if (toCart.current instanceof HTMLElement) {
      toCart.current.click();
    }
  };

  const checkPlusButton = (amount: number = isAmount) => {
    let result = false;
    if (data?.flash_sale[0] && amount >= data.flash_sale[0].margin_stock) {
      result = true;
      setIsCheckPlusButton(result);
    } else if (
      data &&
      data.variants.length > 0 &&
      amount >= data.variants[isVariantArr ?? 0].stock
    ) {
      result = true;
      setIsCheckPlusButton(result);
    } else if (data && data.flash_sale.length === 0 && amount >= data?.stock) {
      result = true;
      setIsCheckPlusButton(result);
    } else {
      setIsCheckPlusButton(result);
    }
  };

  return (
    <div className="md:max-w-xl">
      <div className="grid gap-2 my-4">
        <h3 className="text-2xl font-extrabold">{data?.name || ""}</h3>
        {data && data?.flash_sale.length > 0 ? (
          <WidgetFlashSale
            getProductById={getProductById}
            flashSale={data.flash_sale}
          />
        ) : (
          isPrice && (
            <div className="flex items-end gap-2">
              <p className="text-xl font-extrabold">
                {/* {data?.price ? MoneyFormat(data?.price) : ""} */}
                {MoneyFormat(isPrice)}
              </p>
              {/* <p className="line-through opacity-60">Rp 300.000</p> */}
            </div>
          )
        )}
        {data?.variants.length !== 0 && (
          <div>
            <p className="text-sm opacity-60">Tersedia :</p>
            <div className="flex gap-4 my-2">
              {data?.variants.map((row, idx) => (
                <button
                  key={idx}
                  className={`opacity-75 btn btn-outline ${
                    isVariant === row.id && "bg-brand"
                  }`}
                  onClick={() => {
                    setIsVariant(row.id);
                    setIsPrice(row.price);
                    setIsVariantArr(idx);
                  }}
                >
                  {row.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center gap-6 font-bold bg-gray-100 rounded-lg dark:bg-dark-components max-w-max">
            <button
              disabled={isAmount < 2}
              type="button"
              className={`p-2  transition-all duration-300 rounded-lg active:scale-90 ${
                isAmount < 2
                  ? "cursor-not-allowed bg-zinc-300"
                  : "bg-brand hover:bg-yellow-400"
              }`}
              onClick={() => {
                setIsCheckPlusButton(false);
                setIsAmount(isAmount - 1);
              }}
            >
              <AiOutlineMinus className="mx-auto text-xl text-black" />
            </button>
            <p>{isAmount}</p>
            <button
              disabled={isCheckPlusButton}
              className={`p-2  transition-all duration-300 rounded-lg active:scale-90 ${
                isCheckPlusButton
                  ? "cursor-not-allowed bg-zinc-300"
                  : "bg-brand hover:bg-yellow-400"
              }`}
              onClick={() => {
                setIsAmount(isAmount + 1);
                checkPlusButton(isAmount + 1);
              }}
            >
              <AiOutlinePlus className="mx-auto text-xl text-black" />
            </button>
          </div>
          <div>
            <p>
              Stok:{" "}
              {data && data.flash_sale.length > 0
                ? data.flash_sale[0].margin_stock
                : data && data.variants.length > 0 && isVariantArr !== undefined
                ? data.variants[isVariantArr].stock
                : data?.stock}
            </p>
          </div>
        </div>
        <div>
          <ButtonBlack
            className="flex items-center justify-center w-full gap-2"
            onClick={addToCard}
          >
            <AiOutlineShoppingCart className="text-xl" />
            <p className="py-1">Tambah Ke Keranjang</p>
          </ButtonBlack>
          <label ref={toCart} htmlFor={data?.slug} className="hidden"></label>
        </div>
        {data && <TagProduct data={data} />}
      </div>
      <div className="grid gap-2 my-4">
        <p className="font-bold">Deskripsi Produk:</p>
        <div
          className={`space-y-4 ${
            isDescription ? "line-clamp-none" : "line-clamp-5"
          }`}
        >
          <div dangerouslySetInnerHTML={{ __html: data?.description || "" }} />
        </div>
        <div className="text-center text-brand">
          <button onClick={() => setIsDescription(!isDescription)}>
            {isDescription ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
      <ModalAddToCart
        data={data}
        IsPrice={isPrice}
        htmlFor={data?.slug || ""}
        toggleModal={toggleModal}
        isShowAdd={isShowAdd}
        setIsShowAdd={setIsShowAdd}
      />
    </div>
  );
};
