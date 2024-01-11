"use client";
import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { IProducts } from "@/types";
import Link from "next/link";
import { Capitalize, MoneyFormat } from "@/helpers/common";
import { WidgetsFlashSaleLabel } from "./WidgetsFlashSaleLabel";
import Image from "next/image";

interface IProps {
  data: IProducts[];
  show: number[];
}

export const WidgetCardSlider = (props: IProps) => {
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
        <div className="flex gap-4 px-4 mx-auto md:px-16 w-max flex-nowrap">
          {[...data].reverse().map((row, idx) =>
            show.includes(row.id) ? (
              <Link
                href={"/product/" + row.slug}
                className="relative w-48 px-4 my-4 rounded-lg shadow-md cursor-pointer dark:shadow-brand-muted slider-card"
                key={idx}
              >
                {row.flash_sale.length > 0 && <WidgetsFlashSaleLabel />}
                <div className="relative mx-auto w-28 h-28">
                  {/* <Image
                    // src={
                    //   process.env.NEXT_PUBLIC_URL_CDN +
                    //   "/assets/products/small/" +
                    //   row.imgs[0].split("/").pop()
                    // }
                    src={process.env.NEXT_PUBLIC_URL_CDN + "/" + row.imgs[0]}
                    alt="product"
                    className="h-24 mx-auto sm:h-36"
                  /> */}
                  <Image
                    src={process.env.NEXT_PUBLIC_URL_CDN + "/" + row.imgs[0]}
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
                  <p className="font-semibold">{MoneyFormat(row.price)}</p>
                  <p>{Capitalize(row.name.toLowerCase())}</p>
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
            ) : null
          )}
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
