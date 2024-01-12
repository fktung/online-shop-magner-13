import { FOOTER } from "@/constant/footer";
import { t } from "i18next";
import React from "react";
import { Copyright, Widgets } from "./footerUtil";
import { Image } from "../utility";
import {
  BcaIcon,
  BniIcon,
  BriIcon,
  CimbIcon,
  MandiriIcon,
  QrisIcon,
} from "../icons/iconsPayments";

export const Footer = () => {
  const { collaborate } = FOOTER;
  const payment = [
    {
      id: 1,
      path: "#",
      icon: <QrisIcon />,
      name: "payment-master-card",
      width: 34,
      height: 20,
    },
    {
      id: 2,
      path: "#",
      icon: <BcaIcon />,
      name: "payment-master-card",
      width: 34,
      height: 20,
    },
    {
      id: 3,
      path: "#",
      icon: <BniIcon />,
      name: "payment-visa",
      width: 50,
      height: 20,
    },
    {
      id: 4,
      path: "#",
      icon: <MandiriIcon />,
      name: "payment-jcb",
      width: 26,
      height: 20,
    },
    {
      id: 5,
      path: "#",
      icon: <BriIcon />,
      name: "payment-paypal",
      width: 76,
      height: 20,
    },
    {
      id: 6,
      path: "#",
      icon: <CimbIcon />,
      name: "payment-skrill",
      width: 39,
      height: 20,
    },
  ];
  return (
    <footer className="mt-[50px] lg:mt-14 2xl:mt-16 mb-14 xl:mb-0">
      <div className="w-full mx-auto max-w-8xl">
        <Widgets />
        <div className="pb-10 lg:pb-7">
          <div className="mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10">
            <div className="flex flex-col pt-6 text-center border-t md:flex-row md:justify-between border-border-three lg:pt-7">
              <Copyright />
              <div className="flex flex-col items-end gap-2">
                {collaborate && (
                  <ul className="flex flex-wrap justify-center gap-2 sm:gap-6 items-center -mb-1.5 md:mb-0 mx-auto md:mx-0 pt-3.5 md:pt-0">
                    {collaborate?.map((item, idx) => (
                      <li
                        className="inline-flex items-center mb-2 transition md:mb-0 hover:opacity-80 ltr:mr-4 sm:ltr:mr-5 lg:ltr:mr-7 last:ltr:mr-0 rtl:ml-4 sm:rtl:ml-5 lg:rtl:ml-7 last:rtl:ml-0"
                        key={idx}
                      >
                        <div
                          // href={item.path ? item.path : "/#"}
                          // target="_blank"
                          className="inline-flex"
                          rel="noreferrer"
                        >
                          <Image
                            src={item.image}
                            alt={t(item.name)}
                            className="h-6 xs:h-8 lg:h-10"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {payment && (
                  <ul className="flex flex-wrap justify-center gap-2 sm:gap-6 items-center -mb-1.5 md:mb-0 mx-auto md:mx-0 pt-3.5 md:pt-0">
                    {payment.map((item) => (
                      <li key={item.id}>{item.icon}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
