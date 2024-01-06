"use client";
import { WidgetCardSliderFlashSale } from "@/components/widgets";
import { ApiAxios } from "@/helpers/axios";
import { useTranslationLocales } from "@/locales";
import { IProductsFlashSale } from "@/types";
import React, { useEffect, useState } from "react";

export const SliderFlashSale = () => {
  const { t } = useTranslationLocales();
  const [isProductsFlashSale, setIsProductsFlashSale] = useState<
    IProductsFlashSale[]
  >([]);

  const getProductsFlashSale = async () => {
    try {
      const response = ApiAxios.get(`/flash-sale?page=1&limit=10`);
      const data = (await response).data.data;
      setIsProductsFlashSale(data);
    } catch (error: any) {
      console.log("getProductsFlashSale", error);
    }
  };

  useEffect(() => {
    getProductsFlashSale();
  }, []);
  return (
    <React.Fragment>
      {isProductsFlashSale.length > 0 && (
        <div className="my-20">
          <div className="my-4 text-center">
            <h2 className="my-4 text-2xl font-extrabold">
              {t("pages.home.flashSale.title")}
            </h2>
          </div>
          <WidgetCardSliderFlashSale data={isProductsFlashSale} />
        </div>
      )}
    </React.Fragment>
  );
};
