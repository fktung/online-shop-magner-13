import { MENU_TAB_TRENDING_PROFUCT } from "@/constant/home";
import { Capitalize } from "@/helpers/common";
import { t } from "i18next";
import React, { useState } from "react";

export const MenuTabTrendingProduct = () => {
  const tab = [false, false, false];
  const [tabMenu, setTabMenu] = useState([true, false, false]);

  const handelTab = (i: number) => {
    const newSetTab = [...tab];
    newSetTab[i] = true;
    setTabMenu(newSetTab);
  };

  return (
    <div className="justify-center my-6 font-extrabold tabs">
      {MENU_TAB_TRENDING_PROFUCT.map((item, idx) => (
        <button
          key={idx}
          onClick={() => handelTab(idx)}
          className={`tab ${
            tabMenu[idx] &&
            "text-black dark:text-brand-light tab-bordered border-warning"
          }`}
        >
          {Capitalize(t(`${item.label}`))}
        </button>
      ))}
    </div>
  );
};
