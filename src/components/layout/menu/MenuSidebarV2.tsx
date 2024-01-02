import { useLayout } from "@/hooks/layouts";
import React from "react";
import { GrClose } from "react-icons/gr";
import { MenuIcon } from "./MenuIcon";
import { MenuSidebarDown } from "./MenuSidebarDown";
import { MenuSidebarLists } from "./MenuSidebarLists";
import { MenuHeaderRight } from "./MenuHeaderRight";
import { Capitalize, MoneyFormat } from "@/helpers/common";
import { IconMoney } from "@/components/icons";
import Link from "next/link";
import {
  AiOutlineLogout,
  AiOutlineRight,
  AiOutlineSetting,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { ROUTES } from "@/constant/routes";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/hooks/user";
import { Image } from "@/components/utility";
import { LuPackageCheck } from "react-icons/lu";
import { deleteCookie } from "cookies-next";
import { ApiAxios } from "@/helpers/axios";

export const MenuSidebarV2 = () => {
  const { setShowSidebar, showSidebar, setIsSuccess, setIsMessage } =
    useLayout();
  const { isName, isAuth, isBalance, setIsLogout } = useAuth();
  const { isMembership, isStatusMembership } = useUser();

  const handleLogout = async () => {
    const confirmLogout = confirm("Do you want to logout");
    if (!confirmLogout) return;
    try {
      await ApiAxios.post(`/auth/user/logout`);
      setIsSuccess(true);
      setIsMessage("Berhasil Logout");
      deleteCookie("_MToken");
      setIsLogout();
      localStorage.removeItem("_MToken");
    } catch (error) {
      console.log("handleLogout", error);
    }
    setShowSidebar(false);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`w-full h-full transition-all duration-300
          ${showSidebar && "fixed bg-black/50 z-30 shadow-xl"}`}
      />
      <div
        className={`fixed top-0 bottom-0 z-30 flex flex-col w-full h-screen bg-white dark:bg-dark-components dark:text-white max-w-sm transition-all duration-300
        ${showSidebar ? "left-0" : "-left-full"}`}
      >
        <div className="relative h-full">
          <div className="flex items-center justify-between p-4 px-4 border-b border-brand-muted xs:py-5">
            <div className="pl-4">
              <MenuIcon />
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              className="transition-all duration-300 dark:invert active:scale-80"
            >
              <GrClose />
            </button>
          </div>
          <div className="flex flex-col h-full ">
            {/* <MenuSidebarLists /> */}
            {isAuth ? (
              <ul className="z-10 p-2 m-8 text-black shadow dark:bg-dark-components menu dropdown-content bg-base-100 rounded-box dark:text-white">
                <li>
                  <div className="p-2 my-2 border rounded-lg min-w-max">
                    <Link
                      href={ROUTES.ACCOUNT}
                      className="flex items-center gap-2"
                      onClick={closeSidebar}
                    >
                      <div className="overflow-hidden rounded-full">
                        <Image
                          src="https://avatars.githubusercontent.com/u/97165289"
                          alt="Profile"
                          className="w-10"
                        />
                      </div>
                      <p className="text-lg font-bold">{isName}</p>
                    </Link>
                  </div>
                </li>
                <li>
                  {isMembership ? (
                    <div className="px-2 py-4 my-2 bg-gray-100 dark:bg-dark-components rounded-xl">
                      <Link
                        href={ROUTES.MEMBERSHIP}
                        className="flex items-center gap-2"
                        onClick={closeSidebar}
                      >
                        <div>
                          <Image
                            src={"/assets/icons/diamondOn.png"}
                            alt="Status Membership"
                          />
                        </div>
                        <p className="font-bold">
                          Membership {Capitalize(isStatusMembership || "")}
                        </p>
                        <span className="ml-auto">
                          <AiOutlineRight />
                        </span>
                      </Link>
                    </div>
                  ) : (
                    <div className="px-2 py-4 my-2 bg-gray-100 dark:bg-dark-components rounded-xl">
                      <Link
                        href={ROUTES.MEMBERSHIP_REGISTER}
                        className="flex items-center gap-2"
                        onClick={closeSidebar}
                      >
                        <div>
                          <Image
                            src={
                              isMembership
                                ? "/assets/icons/diamondOn.png"
                                : "/assets/icons/diamondOff.png"
                            }
                            alt="Status Membership"
                          />
                        </div>
                        <p className="font-bold">Gabung Membership</p>
                        <span className="ml-auto">
                          <AiOutlineRight />
                        </span>
                      </Link>
                    </div>
                  )}
                </li>
                <li>
                  <Link
                    href={ROUTES.BALANCE}
                    className="flex items-center justify-between w-full px-1"
                    onClick={closeSidebar}
                  >
                    <p className="flex items-center gap-2">
                      <IconMoney size={20} />
                      Balance
                    </p>
                    <p>{MoneyFormat(isBalance)}</p>
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTES.CART}
                    className="flex items-center gap-2 px-1"
                    onClick={closeSidebar}
                  >
                    <AiOutlineShoppingCart size={20} /> Keranjang
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTES.ACCOUNT_MY_ORDER}
                    className="flex items-center gap-2 px-1"
                    onClick={closeSidebar}
                  >
                    <LuPackageCheck size={20} /> Pesanan Saya
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTES.ACCOUNT_SETTING}
                    className="flex items-center gap-2 px-1"
                    onClick={closeSidebar}
                  >
                    {" "}
                    <AiOutlineSetting size={20} />
                    Pengaturan
                  </Link>
                </li>
                <li>
                  <button
                    className="px-2 py-1 mx-auto my-2"
                    onClick={handleLogout}
                  >
                    Keluar{" "}
                    <i className="mx-1">
                      <AiOutlineLogout />
                    </i>
                  </button>
                </li>
              </ul>
            ) : (
              <div className="flex items-center justify-between py-2 mx-2 border-b sm:hidden">
                <div className="ml-2 sm:hidden">
                  <MenuHeaderRight />
                </div>
                {/* <InputSearchProduct /> */}
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0">
              <MenuSidebarDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
