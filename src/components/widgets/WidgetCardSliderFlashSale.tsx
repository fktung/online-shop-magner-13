"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { IProductsFlashSale } from "@/types";
import Link from "next/link";
import { Capitalize, MoneyFormat } from "@/helpers/common";
import { WidgetsFlashSaleLabel } from "./WidgetsFlashSaleLabel";
import { ROUTES } from "@/constant/routes";

interface IProps {
  data: IProductsFlashSale[];
  show?: number[];
}

export const WidgetCardSliderFlashSale = (props: IProps) => {
  const { data, show } = props;

  const cardSlideRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    cardSlideRef.current?.scrollTo({
      left: cardSlideRef.current.scrollLeft - 350,
      behavior: "smooth",
    });
  };

  const slideRight = () => {
    cardSlideRef.current?.scrollTo({
      left: cardSlideRef.current.scrollLeft + 350,
      behavior: "smooth",
    });
  };

  return (
    <div
      id="main-slider-container"
      className="relative flex items-center w-full px-6"
    >
      <div className="absolute top-0 bottom-0 left-0 flex items-center my-auto">
        <button
          onClick={slideLeft}
          className="z-10 transition-all duration-300 bg-white rounded-full shadow-lg dark:bg-dark-components hover:bg-gray-100 dark:hover:bg-brand-muted"
        >
          <MdChevronLeft size={40} />
        </button>
      </div>
      <div
        // id={id}
        ref={cardSlideRef}
        className="w-full min-h-[20rem] overflow-x-auto no-scrollbar"
      >
        <div
          className={`flex gap-4 px-4 md:px-16 w-max flex-nowrap ${
            data.length < 6 && data.length < 3 ? "sm:mx-auto" : "lg:mx-auto"
          }`}
        >
          {data.length !== 0 &&
            data.map((item, idx) => {
              return (
                <Link
                  href={`${ROUTES.PRODUCTS}/${item.product.slug}`}
                  className="max-w-[11rem] relative cursor-pointer p-4 rounded-lg shadow-md dark:shadow-brand-muted min-w-[13rem] my-4 slider-card"
                  key={idx}
                >
                  <WidgetsFlashSaleLabel />
                  <div className="relative mx-auto w-28 h-28">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_URL_CDN +
                        "/" +
                        item.product.imgs[0]
                      }
                      alt="Product"
                      quality={100}
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                    />
                    <div className="absolute bottom-0 right-0 w-8 h-8">
                      <Image
                        src="/assets/icons/iconAddToCard.png"
                        alt="Add to Card"
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                  <div className="my-8">
                    <div className="flex items-end gap-2">
                      <span className="inline-block text-xs font-black line-through opacity-80">
                        {MoneyFormat(item.price)}
                      </span>
                      <span className="inline-block font-black">
                        {MoneyFormat(item.discount_price)}
                      </span>
                    </div>
                    <p>{Capitalize(item.product.name.toLowerCase())}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    {/* <p>1 Liter</p> */}
                    {/* <p className="flex items-center gap-1">
                    4.2
                    <span className="text-xl text-yellow-400">
                      <AiFillStar />
                    </span>
                  </p> */}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="absolute top-0 bottom-0 right-0 flex items-center my-auto">
        <button
          onClick={slideRight}
          className="z-10 transition-all duration-300 bg-white rounded-full shadow-lg dark:bg-dark-components hover:bg-gray-100 dark:hover:bg-brand-muted"
        >
          <MdChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};
