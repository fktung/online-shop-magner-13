import Link from "next/link";
import React from "react";
import { MenuIcon } from "./MenuIcon";
import { MENU } from "@/constant/layout";
import { Capitalize } from "@/helpers/common";
import { t } from "i18next";
import { IconOutlineDown } from "@/components/icons";
import { ROUTES } from "@/constant/routes";
import { useLayout } from "@/hooks/layouts";
import { useTranslationLocales } from "@/locales";

export const MenuHeader = () => {
  const { setIsModalSearch } = useLayout();
  const { t } = useTranslationLocales();
  return (
    <div className="py-3 mx-auto xs:w-full md:ltr:pl-6 md:rtl:pr-6 xl:ltr:pl-10 xl:rtl:pr-10">
      <div className="flex items-center justify-center w-full gap-6 font-bold">
        <div className="flex items-center justify-evenly gap-6 lg:min-w-[345px]">
          {MENU.map((item, i) => {
            return i <= 1 ? (
              <div
                key={i}
                className="relative items-center hidden mx-3 cursor-pointer menuItem group xl:mx-4 min-w-max xl:flex"
              >
                {typeof item.link === "string" && (
                  <Link
                    href={item.link}
                    className="relative inline-flex items-center text-sm py-1 lg:text-15px group-hover:text-brand before:absolute before:right-0 before:left-0 before:-bottom-[1px] before:w-0 before:group-hover:w-full before:h-[3px] before:bg-brand before:mx-auto transition-all duration-300 before:transition-all before:duration-300"
                  >
                    <p>{Capitalize(t(`${item.label}`))}</p>
                  </Link>
                )}
              </div>
            ) : null;
          })}
        </div>

        <div>
          <Link href={ROUTES.HOME}>
            <MenuIcon />
          </Link>
        </div>

        <div className="flex items-center justify-evenly gap-6 lg:min-w-[345px]">
          {MENU.map((item, i) => {
            return i >= 2 ? (
              <div
                key={i}
                className="relative items-center hidden mx-3 cursor-pointer menuItem group xl:mx-4 min-w-max xl:flex"
              >
                {item.idx === 3 ? (
                  <button
                    onClick={() => setIsModalSearch(true)}
                    type="button"
                    className="relative inline-flex items-center text-sm py-1 lg:text-15px group-hover:text-brand before:absolute before:right-0 before:left-0 before:-bottom-[1px] before:w-0 before:group-hover:w-full before:h-[3px] before:bg-brand before:mx-auto transition-all duration-300 before:transition-all before:duration-300"
                  >
                    {Capitalize(t(`${item.label}`))}
                  </button>
                ) : (
                  <Link
                    href={"#"}
                    className="relative inline-flex items-center text-sm py-1 lg:text-15px group-hover:text-brand before:absolute before:right-0 before:left-0 before:-bottom-[1px] before:w-0 before:group-hover:w-full before:h-[3px] before:bg-brand before:mx-auto transition-all duration-300 before:transition-all before:duration-300"
                  >
                    <p>{Capitalize(t(`${item.label}`))}</p>
                  </Link>
                )}
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};
