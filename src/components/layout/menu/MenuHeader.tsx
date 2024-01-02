import React from "react";
import { MenuLink } from "./MenuLink";
import { MENU } from "@/constant/layout";

export const MenuHeader = () => {
  return (
    <div className="relative hidden w-full py-3 xl:flex md:ltr:pl-6 md:rtl:pr-6 xl:ltr:pl-10 xl:rtl:pr-10">
      {MENU.map((row, idx) => (
        <MenuLink key={idx} data={{ ...row, idx }} />
      ))}
    </div>
  );
};
