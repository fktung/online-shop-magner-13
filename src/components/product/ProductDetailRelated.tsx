import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Image } from "../utility";
import { AiFillStar } from "react-icons/ai";
import { ROUTES } from "@/constant/routes";
import { IProducts } from "@/types";
import { ProductWidget } from "./widget";
import { useRouter } from "next/router";

interface IProps {
  data: IProducts[];
  getProductById: () => void;
}

export const ProductDetailRelated = (props: IProps) => {
  const router = useRouter();
  const [isProductRelated, setIsProductRelated] = useState<IProducts[]>([]);
  const { data } = props;
  useEffect(() => {
    let view = 0;
    const dataFilter: IProducts[] = [];
    data.map(item => {
      if (view >= 5) return;
      if (item.slug !== router.query.slug) {
        dataFilter.push(item);
        view++;
      }
    });
    setIsProductRelated(dataFilter);
  }, [data, router.query.slug]);

  return (
    <div className="grid gap-2 my-4 md:min-w-max">
      <div className="flex items-center justify-between gap-10">
        <p className="font-bold">Produk Terkait</p>
        <Link href={ROUTES.PRODUCTS}>
          <p className="text-brand">Lihat Semua</p>
        </Link>
      </div>
      <div className="overflow-auto no-scrollbar">
        <div className="flex gap-2 mx-auto md:grid md:mx-0 lg:flex flex-nowrap lg:justify-evenly lg:min-w-max">
          {isProductRelated.map((item, idx) => (
            <ProductWidget
              key={idx}
              data={item}
              className="sm:min-w-[11rem] min-w-[8rem] sm:max-w-[12rem]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
