"use client";
import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { MenuAuthentication, MenuHeader } from "./menu";
import { useLayout } from "@/hooks/layouts";

interface INavbarV2 {
  className?: string;
}

export const Navbar: React.FC<INavbarV2> = (props) => {
  const { className } = props;
  const { setShowSidebar, showSidebar } = useLayout();

  return (
    <div className={`py-2 transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between gap-4 px-4 mx-auto md:px-6 max-w-8xl">
        <div className=" relative flex items-center w-full gap-4">
          {/* sidebar button */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="absolute z-10 flex-col items-center justify-center px-2 py-2 text-2xl transition-all duration-300 outline-none ltr:mx-10 lg:flex xl:hidden shrink-0 focus:outline-none active:scale-80"
          >
            <HiMenuAlt2 />
          </button>
          <div className="flex items-center justify-end w-full h-full px-4 mx-auto max-w-8xl md:px-6 ">
            <MenuHeader />
          </div>
          <div className="items-center hidden sm:flex shrink-0 absolute right-0">
            <MenuAuthentication />
          </div>
        </div>
      </div>
    </div>
  );
};
