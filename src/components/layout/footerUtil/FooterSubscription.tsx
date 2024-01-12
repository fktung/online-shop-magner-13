import { EmailIcon, IconsSosmed, SendIcon } from "@/components/icons";
import { Image } from "@/components/utility";
import { useTranslationLocales } from "@/locales";
// import Image from "next/image";
import React from "react";

export const FooterSubscription = () => {
  const { t } = useTranslationLocales();
  return (
    <div className="flex flex-col pt-8 border-t text-brand-dark dark:text-brand-light sm:col-span-2 xl:col-span-3 xl:pl-6 xl:pr-6 sm:pt-0 sm:border-t-0 border-border-three 2xl:pl-7 2xl:pr-7 3xl:pl-16 3xl:pr-16">
      <h3 className=" text-base lg:text-xl lg:leading-7 font-bold mb-4 lg:mb-6 lg:pb-0.5 max-w-md">
        {t("layout.footer.subscribeNow.title")}
      </h3>
      <p className="text-sm leading-7 lg:leading-[27px] lg:text-15px lg:-mt-1 max-w-md">
        {t("layout.footer.subscribeNow.subtitle")}
      </p>
      <div className="mt-4">
        <IconsSosmed />
      </div>
    </div>
  );
};
