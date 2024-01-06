import { useLayout } from "@/hooks/layouts";
import React from "react";
import { GrClose } from "react-icons/gr";
import { MenuIcon } from "./MenuIcon";
import { MenuSidebarDown } from "./MenuSidebarDown";
import { MenuSidebarLists } from "./MenuSidebarLists";
import { ButtonBlack } from "@/components/button";
import { useAuth } from "@/hooks/auth";
import { ROUTES } from "@/constant/routes";
import { Capitalize } from "@/helpers/common";
import { t } from "i18next";
import { usePathname, useRouter } from "next/navigation";
import { useTranslationLocales } from "@/locales";

export const MenuSidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { t } = useTranslationLocales();
  const { setShowSidebar, showSidebar } = useLayout();
  const { isAuth, isName, setIsPreviousUrl, getAuthMe } = useAuth();
  const handleLogin = () => {
    setIsPreviousUrl(pathName);
    setShowSidebar(false);
    router.push(ROUTES.LOGIN);
  };
  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`w-full h-full transition-all duration-300
          ${showSidebar && "fixed bg-black/50 z-30 shadow-xl"}`}
      />
      <div
        className={`fixed top-0 bottom-0 z-30 flex flex-col w-full h-screen bg-white dark:bg-dark-components dark:text-white max-w-[18rem] transition-all duration-300
        ${showSidebar ? "left-0" : "-left-full"}`}
      >
        <div className="relative h-full">
          <div className="flex items-center justify-between p-4 px-4 border-b border-brand-muted xs:py-5">
            <div className="pl-4">
              <MenuIcon />
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              className="p-2 dark:invert"
            >
              <GrClose />
            </button>
          </div>
          {!isAuth && (
            <div className="flex items-center justify-between py-2 mx-2 border-b xl:hidden">
              <div className="ml-2 xl:hidden">
                <ButtonBlack onClick={handleLogin}>
                  {Capitalize(t("common.singIn"))}
                </ButtonBlack>
              </div>
              {/* <InputSearchProduct /> */}
            </div>
          )}
          <div className="flex flex-col h-full pb-8">
            <MenuSidebarLists />
            <div className="absolute bottom-0 left-0 right-0">
              <MenuSidebarDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
