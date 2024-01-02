import React, { useEffect, useState } from "react";
import { MenuAddressSend, MenuHeader, MenuHeaderRight, MenuIcon } from "./menu";
import { HiMenuAlt2 } from "react-icons/hi";
import { useLayout } from "@/hooks/layouts";
import { InputSearchProduct } from "../input";
import Link from "next/link";

export const Navbar = () => {
  const { setShowSidebar, showSidebar } = useLayout();
  const [pageScroll, setPageScroll] = useState(0);

  useEffect(() => {
    const onScroll: EventListener = (event: Event) => {
      setPageScroll(window.pageYOffset);
    };
    const win: Window = window; // <-- DOM-Window, extends DOM-EventTarget
    win.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="siteHeader"
      className={`w-full z-10 transition-all duration-300`}
    >
      <div
        className={`z-20 w-full transition-all duration-200 ease-in-out body-font
        ${
          pageScroll > 10
            ? "shadow-xl bg-brand-light dark:bg-dark"
            : "bg-transparent"
        }`}
      >
        <div className="py-5 transition-all duration-300 bg-gray-100 dark:bg-dark-components dark:text-white">
          <div className="flex items-center justify-between gap-4 px-4 mx-auto md:px-6 max-w-8xl">
            <div className="flex items-center gap-4">
              {/* sidebar button */}
              <div className="flex gap-2 mr-4 shrink-0 sm:mr-0 ">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="flex-col items-center justify-center text-2xl outline-none ltr:mx-10 lg:flex xl:hidden shrink-0 focus:outline-none"
                >
                  <HiMenuAlt2 />
                </button>
              </div>
              <Link href={"/"}>
                <MenuIcon />
              </Link>
            </div>
            <InputSearchProduct className="hidden lg:flex" />
            <div className="items-center hidden gap-3 sm:flex shrink-0">
              <MenuHeaderRight />
            </div>
          </div>
        </div>

        {/* secondary navbar */}
        <div className="flex items-center justify-end w-full h-full px-4 mx-auto max-w-8xl md:px-6">
          <MenuHeader />
          <MenuAddressSend />
        </div>
      </div>
    </header>
  );
};
