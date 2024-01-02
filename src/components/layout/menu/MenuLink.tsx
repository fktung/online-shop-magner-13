import { TMenuLink } from "@/constant/layout";
import { t } from "i18next";
import Link from "next/link";
import React from "react";
import { Capitalize } from "@/helpers/common";
import { IconOutlineDown } from "@/components/icons";
import { MenuIcon } from "./MenuIcon";

interface IProps {
  data: TMenuLink;
}

export const MenuLink = (props: IProps) => {
  const { label, link, idx } = props.data;
  return (
    <div className="relative flex items-center mx-3 cursor-pointer menuItem group xl:mx-4 min-w-max">
      {Array.isArray(link) ? (
        <div className="dropdown">
          <label
            tabIndex={idx}
            className="relative inline-flex items-center text-sm font-normal py-1 lg:text-15px text-brand-dark dark:text-brand-light group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[1px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto"
          >
            <p>{Capitalize(t(`${label}`))}</p>
            {Array.isArray(link) && (
              <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-brand-dark dark:text-brand-light opacity-40 group-hover:text-brand">
                <IconOutlineDown />
              </span>
            )}
          </label>
          <ul
            tabIndex={idx}
            className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
          >
            {link.map((row, idx) => (
              <li key={idx}>
                <Link href={row.link}>{t(`${row.item}`)}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link
          href={"#"}
          className="relative inline-flex items-center text-sm font-normal py-1 lg:text-15px text-brand-dark dark:text-brand-light group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[1px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto"
        >
          <p>{Capitalize(t(`${label}`))}</p>
          {Array.isArray(link) && (
            <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-brand-dark opacity-40 group-hover:text-brand">
              <IconOutlineDown />
            </span>
          )}
        </Link>
      )}
    </div>
  );
};
