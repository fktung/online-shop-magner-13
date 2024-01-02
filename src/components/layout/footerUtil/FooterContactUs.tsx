import { t } from "i18next";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { BsChatText, BsWhatsapp } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { IoTimeOutline } from "react-icons/io5";
import { Trans } from "react-i18next";
import { COMPANY } from "@/constant/company";
import Link from "next/link";

export const FooterContactUs = () => {
  const { phone, email, address } = COMPANY;
  return (
    <div className="pb-3.5 sm:pb-0 sm:col-span-2 xl:col-span-3 min-w-[15rem] md:min-w-min">
      <h2 className="text-brand-dark dark:text-brand-light text-base lg:text-xl lg:text-[17px] lg:leading-7 font-bold mb-4 sm:mb-5 lg:mb-6 pb-0.5">
        {t("layout.footer.contactUs.title")}
      </h2>
      <li className="flex flex-col space-y-3 text-sm lg:text-15px">
        <ul className="flex items-baseline">
          <div className="flex items-start">
            <i className="mt-1 mr-2 text-md">
              <CiLocationOn />
            </i>
            <p>{address.label}</p>
          </div>
        </ul>
        <ul className="flex items-baseline">
          <div className="flex items-start">
            <i className="mt-1 mr-2 text-md">
              <BsChatText />
            </i>
            <p>
              {t("common.liveChat")}
              {" : "}
              {t("common.everyDay")} | 09.00 - 18.00 WIB
            </p>
          </div>
        </ul>
        <ul className="flex items-baseline">
          <Link href={email.uri} target="_blank">
            <div className="flex items-start">
              <i className="mt-1 mr-2 text-md">
                <AiOutlineMail />
              </i>
              <p>{email.label}</p>
            </div>
          </Link>
        </ul>
        <ul className="flex items-baseline">
          <Link href={phone.uri} target="_blank">
            <div className="flex items-start">
              <i className="mt-1 mr-2 text-md">
                <BsWhatsapp />
              </i>
              <p>{phone.label}</p>
            </div>
          </Link>
        </ul>
        <ul className="flex items-baseline">
          <div className="flex items-start">
            <i className="mt-1 mr-2 text-md">
              <IoTimeOutline />
            </i>
            <p>
              {t("common.day.monday")}
              {" - "}
              {t("common.day.friday")}{" "}
              <Trans i18nKey="layout.footer.contactUs.operationalHour" />
            </p>
          </div>
        </ul>
      </li>
    </div>
  );
};
