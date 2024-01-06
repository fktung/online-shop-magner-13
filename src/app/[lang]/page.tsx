"use client";
import { LayoutV2 } from "@/components/layout";
import {
  WidgetCardSlider,
  WidgetCardSliderFlashSale,
} from "@/components/widgets";
import Link from "next/link";
import { Capitalize } from "@/helpers/common";
import { t } from "i18next";
import { ROUTES } from "@/constant/routes";
import { ApiAxios } from "@/helpers/axios";
import { IProducts, IProductsFlashSale } from "@/types";
import { useEffect, useState } from "react";
import { SliderBanner } from "@/components/slider";
import { ISliderBanner } from "@/types/tSliderBanner";
import Image from "next/image";

export default function Home() {
  const [isProducts, setIsProducts] = useState<IProducts[]>([]);
  const [isProductsFlashSale, setIsProductsFlashSale] = useState<
    IProductsFlashSale[]
  >([]);
  const [isSliderBanner, setIsSliderBanner] = useState<ISliderBanner[]>([]);
  const showAutomotive = [8, 7, 6, 5, 4, 3, 2];
  const showTrend = [18, 19, 20, 27, 28, 30];
  const getProducts = async () => {
    try {
      const response = ApiAxios.get(`/products?limit=30`);
      const data = (await response).data.data;
      setIsProducts(data);
    } catch (error: any) {
      console.log("getProducts", error);
    }
  };

  const getProductsFlashSale = async () => {
    try {
      const response = ApiAxios.get(`/flash-sale?page=1&limit=10`);
      const data = (await response).data.data;
      setIsProductsFlashSale(data);
    } catch (error: any) {
      console.log("getProductsFlashSale", error);
    }
  };

  const getSlideBanner = async () => {
    try {
      const response = await ApiAxios.get(`/slider-banner`);
      const data = response.data.data;
      setIsSliderBanner(data);
    } catch (error) {
      console.log("getSlideBanner", error);
    }
  };

  useEffect(() => {
    getProducts();
    getProductsFlashSale();
    getSlideBanner();
  }, []);

  return (
    <LayoutV2>
      {isSliderBanner.length > 0 && <SliderBanner data={isSliderBanner} />}
      {isProductsFlashSale.length > 0 && (
        <div className="my-20">
          <div className="my-4 text-center">
            <h2 className="my-4 text-2xl font-extrabold">
              {t("pages.home.flashSale.title")}
            </h2>
          </div>
          <WidgetCardSliderFlashSale data={isProductsFlashSale} />
          {/* <div className="my-4 text-center">
          <Link
            href={ROUTES.PRODUCTS}
            className="font-bold transition-all duration-300 text-brand hover:text-yellow-500"
          >
            {t("common.viewMore")}
          </Link>
        </div> */}
        </div>
      )}
      <div className="my-20">
        <div className="my-4 text-center">
          <h2 className="my-4 text-2xl font-extrabold">
            {Capitalize(t("pages.home.automotiveCare.title"))}
          </h2>
          <p>{t("pages.home.automotiveCare.subtitle")}</p>
        </div>
        <WidgetCardSlider data={isProducts} show={showTrend} />
        <div className="my-4 text-center">
          <Link
            href={ROUTES.PRODUCTS}
            className="font-bold transition-all duration-300 text-brand hover:text-yellow-500"
          >
            {t("common.viewMore")}
          </Link>
        </div>
      </div>

      <div className="my-20">
        {/* <div className="my-4 text-center">
          <h2 className="my-4 text-2xl font-extrabold">
            {Capitalize(t("pages.home.trendingProducts.title"))}
          </h2>
          <p>{t("pages.home.trendingProducts.subtitle")}</p>
        </div>
        <MenuTabTrendingProduct />
        <WidgetCardSlider data={isProducts} show={showTrend} />
        <div className="my-4 text-center">
          <Link
            href={ROUTES.PRODUCTS}
            className="font-bold transition-all duration-300 text-brand hover:text-yellow-500"
          >
            {t("common.viewMore")}
          </Link>
        </div> */}
      </div>
    </LayoutV2>
  );
}
