"use client";
import { WidgetCardSlider } from "@/components/widgets";
import { ENDPOINT } from "@/constant/api.endpoint";
import { ROUTES } from "@/constant/routes";
import { ApiAxios } from "@/helpers/axios";
import { Capitalize } from "@/helpers/common";
import { useTranslationLocales } from "@/locales";
import { IProducts } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const AutomotiveCare = () => {
  const { t } = useTranslationLocales();
  const [isProducts, setIsProducts] = useState<IProducts[]>([]);
  const showAutomotive = [18, 19, 20, 27, 28, 30];

  const getProducts = async () => {
    try {
      const response = ApiAxios.get(`${ENDPOINT.products.DEFAULT}?limit=30`);
      const data = (await response).data.data;
      setIsProducts(data);
    } catch (error: any) {
      console.log("getProducts", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <React.Fragment>
      <div className="my-4 text-center">
        <h2 className="my-4 text-2xl font-extrabold">
          {Capitalize(t("pages.home.automotiveCare.title"))}
        </h2>
        <p>{t("pages.home.automotiveCare.subtitle")}</p>
      </div>
      <WidgetCardSlider data={isProducts} show={showAutomotive} />
      <div className="my-4 text-center">
        <Link
          href={ROUTES.PRODUCTS}
          className="font-bold transition-all duration-300 text-brand hover:text-yellow-500"
        >
          {t("common.viewMore")}
        </Link>
      </div>
    </React.Fragment>
  );
};
