import React from "react";
import { WidgetLinks } from "./WidgetLinks";
import { FOOTER } from "@/constant/footer";
import { FooterSosmed } from "./FooterSosmed";
import { FooterSubscription } from "./FooterSubscription";
import { FooterContactUs } from "./FooterContactUs";

export const Widgets = () => {
  const { widgetsLink } = FOOTER;
  return (
    <div className="mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10">
      <div className="grid sm:place-items-center xl:place-items-start justify-center sm:grid-cols-2 xl:grid-cols-10 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[50px]">
        {widgetsLink.map((item, idx) => (
          <WidgetLinks key={idx} data={item} />
        ))}
        <FooterContactUs />
        <FooterSubscription />
      </div>
    </div>
  );
};
