import React from "react";
import { SidebarItemsLink } from "./SidebarItemsLink";
import { MENU } from "@/constant/layout";
import { Capitalize } from "@/helpers/common";
import { t } from "i18next";
import { useLayout } from "@/hooks/layouts";

export const MenuSidebarLists = () => {
  const { setIsModalSearch, setShowSidebar } = useLayout();
  return (
    <div className="p-8 overflow-y-auto pb-52">
      <ul className="w-full space-y-2 join join-vertical">
        {MENU.map((item, idx) => (
          <li key={idx}>
            {item.idx === 3 ? (
              <div className="relative py-4 pl-4 mt-2 mr-4 group">
                <button
                  onClick={() => {
                    setIsModalSearch(true);
                    setShowSidebar(false);
                  }}
                  type="button"
                  className="w-full text-left group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:bottom-0 group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 group-hover:before:right-auto"
                >
                  {Capitalize(t(`${item.label}`))}
                </button>
              </div>
            ) : (
              <SidebarItemsLink data={item} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
