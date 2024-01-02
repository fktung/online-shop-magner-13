import { MENU_TAB_MEMBERSHIP } from "@/constant/home";
import { Capitalize } from "@/helpers/common";
import { t } from "i18next";
import React, { useState } from "react";

interface IProps {
  tabMenu: boolean[];
  setTabMenu: (props: boolean[]) => void;
  tab: boolean[];
}

export const MenuTabMembershipV2 = (props: IProps) => {
  const { tabMenu, setTabMenu, tab } = props;

  const handelTab = (i: number) => {
    const newSetTab = [...tab];
    newSetTab[i] = true;
    setTabMenu(newSetTab);
  };

  return (
    <div className="mt-6 font-extrabold tabs">
      {MENU_TAB_MEMBERSHIP.map((item, idx) => (
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
