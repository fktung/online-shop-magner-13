import React, { useState } from "react";
import { Image } from "../utility";

interface IProductDetailImageProps {
  imgs?: string[];
}
export const ProductDetailImage = ({ imgs }: IProductDetailImageProps) => {
  const [isImgSelect, setIsImgSelect] = useState(0);
  return (
    <div className="w-full px-2 mx-auto xl:max-w-xl lg:ms-auto lg:mx-0">
      <div className="p-2 mx-auto border rounded-lg sm:h-[25rem] h-80">
        <Image
          src={
            imgs
              ? process.env.NEXT_PUBLIC_URL_CDN + "/" + imgs[isImgSelect]
              : ""
          }
          alt="product"
          className="h-full mx-auto"
        />
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-2 my-3 min-w-max">
          {imgs?.map((item, idx) => (
            <button
              onClick={() => setIsImgSelect(idx)}
              key={idx}
              className="p-2 border rounded-lg w-28"
            >
              <Image
                src={process.env.NEXT_PUBLIC_URL_CDN + "/" + item}
                alt="product"
                className="max-w-[5rem] max-h-[6rem] mx-auto"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
