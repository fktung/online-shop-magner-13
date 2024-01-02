import { EmailIcon, IconsSosmed, SendIcon } from "@/components/icons";
import { Image } from "@/components/utility";
import { t } from "i18next";
// import Image from "next/image";
import React from "react";

export const FooterSubscription = () => {
  return (
    <div className="flex flex-col pt-8 border-t text-brand-dark dark:text-brand-light sm:col-span-2 xl:col-span-3 xl:pl-6 xl:pr-6 sm:pt-0 sm:border-t-0 border-border-three 2xl:pl-7 2xl:pr-7 3xl:pl-16 3xl:pr-16">
      <h3 className=" text-base lg:text-xl lg:leading-7 font-bold mb-4 lg:mb-6 lg:pb-0.5 max-w-md">
        {t("layout.footer.subscribeNow.title")}
      </h3>
      <p className="text-sm leading-7 lg:leading-[27px] lg:text-15px lg:-mt-1 max-w-md">
        {t("layout.footer.subscribeNow.subtitle")}
      </p>
      {/* <form className="relative max-w-md mt-5 overflow-hidden border-2 rounded-md">
        <span className="flex items-center absolute left-0 top-0 h-12 px-3.5 transform">
          <EmailIcon className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]" />
        </span>
        <input
          type="email"
          id="subscription-email"
          className="w-full h-12 pl-10 pr-10 bg-transparent rounded-md 2xl:px-11"
          placeholder="Write your email here"
        />
        <div className="absolute right-0 top-0 hover:opacity-80 focus:outline-none h-12 px-3 lg:px-3.5 transform scale-90 2xl:scale-100">
          <button aria-label="Subscribe Button" className="py-3.5">
            <Image src="/assets/icons/sendEmail.png" alt="Send Email" />
          </button>
        </div>
      </form> */}
      <div className="mt-4">
        <IconsSosmed />
      </div>
    </div>
  );
};
