import { ModalAddToCartInWidgets } from "@/components/modal";
import { Image } from "@/components/utility";
import { WidgetsFlashSaleLabel } from "@/components/widgets";
import { MANIPULATION_SOLD } from "@/constant/manipulation";
import { ROUTES } from "@/constant/routes";
import { ApiAxios } from "@/helpers/axios";
import { Capitalize, FormatNumber, MoneyFormat } from "@/helpers/common";
import { useAuth } from "@/hooks/auth";
import { useLayout } from "@/hooks/layouts";
import { useUser } from "@/hooks/user";
import { IProducts } from "@/types";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface IProductWidgetProps {
  data: IProducts;
  className?: string;
}

export const ProductWidget = ({ data, className }: IProductWidgetProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { setIsError, setIsSuccess, setIsMessage } = useLayout();
  const { isAuth, setIsPreviousUrl } = useAuth();
  const { getCountCart } = useUser();
  const [isShowAdd, setIsShowAdd] = useState(false);
  const toCart = useRef<HTMLLabelElement | null>(null);

  const tokenStorage = getCookie("_MToken");
  const addToCard = async () => {
    if (!isAuth && !tokenStorage) {
      setIsPreviousUrl(pathName);
      setIsError(true);
      setIsMessage("Silahkan Login terlebih dahulu");
      router.push(ROUTES.LOGIN);
      return;
    }
    const dataAddCard: { [k: string]: any } = {
      product_id: data?.id,
      qty: 1,
    };
    if (data && data.flash_sale.length > 0) {
      dataAddCard.flash_sale_id = data.flash_sale[0].id;
    }
    try {
      const response: any = await ApiAxios.post(`/carts`, dataAddCard);
      const res = response.data;
      setIsSuccess(true);
      setIsMessage(`${res.message} add to cart`);
      setIsShowAdd(true);
      toggleModal();
      getCountCart();
    } catch (error: any) {
      console.log("addToCard", error);
      setIsError(true);
      setIsMessage(error.response.data.message);
    }
  };

  const toggleModal = () => {
    if (toCart.current instanceof HTMLElement) {
      toCart.current.click();
    }
  };

  const manipulationSold = (id: number, stocK: number) => {
    if (MANIPULATION_SOLD[id]) {
      return stocK + MANIPULATION_SOLD[id];
    }
    return stocK;
  };

  return (
    <div
      className={`w-full p-4 mx-1 my-4 relative rounded-lg shadow-md cursor-pointer sm:mx-2 dark:shadow-brand-muted slider-card pb-6 ${className}`}
    >
      {data.flash_sale && data.flash_sale?.length > 0 && (
        <WidgetsFlashSaleLabel />
      )}
      <Link
        href={"/product/" + data.slug}
        className="absolute top-0 bottom-0 left-0 right-0"
      />
      <div className="relative z-0">
        <Link
          href={"/product/" + data.slug}
          className="absolute top-0 bottom-0 left-0 right-0"
        />
        <Image
          src={process.env.NEXT_PUBLIC_URL_CDN + "/" + data.imgs[0]}
          alt="product"
          className="h-24 mx-auto sm:h-36"
        />
        <button
          className="absolute bottom-0 right-0 w-8 h-8 transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={addToCard}
        >
          <Image src="/assets/icons/iconAddToCard.png" alt="Add to Card" />
        </button>
        <label ref={toCart} htmlFor={data.slug} className="hidden"></label>
      </div>
      <div className="my-4">
        {data.flash_sale && data.flash_sale?.length > 0 ? (
          <div className="flex items-end gap-2">
            <span className="inline-block text-xs font-black line-through opacity-80">
              {MoneyFormat(data.flash_sale[0].price)}
            </span>
            <span className="inline-block font-black">
              {MoneyFormat(data.flash_sale[0].discount_price)}
            </span>
          </div>
        ) : (
          <p className="font-black">{MoneyFormat(data.price)}</p>
        )}
        <p>{Capitalize(data.name.toLowerCase())}</p>
      </div>
      <div className="absolute left-0 flex flex-row-reverse items-center justify-between text-xs right-4 bottom-3">
        {data.sold_amount && (
          <p>
            {FormatNumber(manipulationSold(data.id, +data.sold_amount))} Terjual
          </p>
        )}
        {/* <p className="flex items-center gap-1">
            4.2
            <span className="text-xl text-yellow-400">
              <AiFillStar />
            </span>
          </p> */}
      </div>
      <ModalAddToCartInWidgets
        data={data}
        IsPrice={data.price}
        htmlFor={data?.slug || ""}
        toggleModal={toggleModal}
        isShowAdd={isShowAdd}
        setIsShowAdd={setIsShowAdd}
      />
    </div>
  );
};
