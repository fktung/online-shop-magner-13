/* eslint-disable @next/next/no-img-element */
import { ROUTES } from "@/constant/routes";
import { useAuth } from "@/hooks/auth";
import { useLayout } from "@/hooks/layouts";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { AiOutlineRight, AiOutlineSetting } from "react-icons/ai";
import { useUser } from "@/hooks/user";
import { AiOutlineLogout } from "react-icons/ai";
import { ApiAxios } from "@/helpers/axios";
import { deleteCookie } from "cookies-next";
import { Capitalize, MoneyFormat } from "@/helpers/common";
import { IconMoney } from "../icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuPackageCheck } from "react-icons/lu";

export const WidgetNavAccount = () => {
  const { isName, isBalance, setIsLogout } = useAuth();
  const { setShowSidebar, setIsSuccess, setIsMessage } = useLayout();
  const { isMembership, isStatusMembership } = useUser();
  const menuUser = useRef<HTMLDetailsElement | null>(null);
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
      console.log(error);
    }
    closeSidebar();
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function handleScroll() {
    const currentYOffset = window.pageYOffset;
    const outHeader = 100 < currentYOffset;
    const _open = menuUser.current?.getAttribute("open");
    // if (outHeader && _open) {
    // }
    menuUser.current?.removeAttribute("open");
  }
  return (
    <details ref={menuUser} className="dropdown sm:dropdown-end">
      <summary className="flex items-center gap-2 mx-2 bg-transparent border-transparent cursor-pointer min-w-max hover:bg-transparent hover:border-transparent">
        <div className="overflow-hidden rounded-full">
          <img
            src="https://avatars.githubusercontent.com/u/97165289"
            alt="Profile"
            className="w-10"
          />
        </div>
        <p className="sm:inline">{isName}</p>
      </summary>
      <ul className="z-10 p-2 text-black shadow dark:bg-dark-components menu dropdown-content bg-base-100 rounded-box dark:text-white">
        <li>
          <div className="p-2 my-2 border rounded-lg min-w-max">
            <Link
              href={ROUTES.ACCOUNT}
              className="flex items-center gap-2"
              onClick={closeSidebar}
            >
              <div className="overflow-hidden rounded-full">
                <img
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
                    width={30}
                    height={30}
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
                    width={30}
                    height={30}
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
          {/* <label htmlFor="modalLogout" className="px-2 py-1 mx-auto my-2">
            Keluar{" "}
            <i className="mx-1">
              <AiOutlineLogout />
            </i>
          </label> */}
          <button className="px-2 py-1 mx-auto my-2" onClick={handleLogout}>
            Keluar{" "}
            <i className="mx-1">
              <AiOutlineLogout />
            </i>
          </button>
        </li>
      </ul>
      {/* <input type="checkbox" id="modalLogout" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
            <label htmlFor="modalLogout" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div> */}
    </details>
  );
};
