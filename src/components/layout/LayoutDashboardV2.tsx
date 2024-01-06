/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa";
import { PiCoins } from "react-icons/pi";
import { ROUTES } from "@/constant/routes";
import Link from "next/link";
import { WidgetUserInfoMembershipV2 } from "../widgets";
import { IconMembershipMenu } from "../icons";
import { useUser } from "@/hooks/user";
import { LuPackageCheck } from "react-icons/lu";
import { useLayout } from "@/hooks/layouts";
import { deleteCookie } from "cookies-next";
import { useAuth } from "@/hooks/auth";
import { ApiAxios } from "@/helpers/axios";
import { AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import { Capitalize, MoneyFormat } from "@/helpers/common";
import { useRouter } from "next/router";
import { t } from "i18next";

interface IProps {
  children: ReactNode;
}

const accountMenu = [
  {
    appear: true,
    slug: "#",
    name: "Akun Saya",
    icon: <FaRegUser className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    appear: true,
    slug: ROUTES.ACCOUNT,
    name: "Profile",
    // icon: <IoSettingsOutline className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    appear: true,
    slug: ROUTES.ADDRESS,
    name: "Alamat",
    // icon: <IoSettingsOutline className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    appear: true,
    slug: ROUTES.MEMBERSHIP,
    name: "Membership",
    icon: <IconMembershipMenu />,
  },
  {
    appear: true,
    slug: ROUTES.COINS,
    name: "Coins",
    icon: <PiCoins className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    appear: true,
    slug: ROUTES.ACCOUNT_MY_ORDER,
    name: "Pesanan Saya",
    icon: <LuPackageCheck className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    appear: true,
    slug: ROUTES.ACCOUNT_SETTING,
    name: "Pengaturan",
    icon: <AiOutlineSetting className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  // {
  //   appear: true,
  //   slug: "#",
  //   name: "Notifikasi",
  //   icon: (
  //     <GrNotification className="w-5 md:w-[22px] h-5 md:h-[22px] dark:invert" />
  //   ),
  // },
];

export const LayoutDashboardV2 = (props: IProps) => {
  const { children } = props;
  const router = useRouter();
  const { isMembership } = useUser();
  const { isBalance, setIsLogout, isOrderBalance } = useAuth();
  const { setShowSidebar, setIsSuccess, setIsMessage } = useLayout();
  const contentRefDashboard: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

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
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setShowSidebar(false);
  };

  useEffect(() => {
    if (contentRefDashboard.current && window.outerWidth < 1024) {
      contentRefDashboard.current.scrollIntoView({ behavior: "smooth" });
      contentRefDashboard.current.focus();
    }
  }, []);
  return (
    <div className="overflow-auto md:grid lg:gap-4 lg:flex no-scrollbar">
      <div className=" w-full sm:min-w-[16rem] max-w-2xl lg:max-w-[17rem] mx-auto lg:mx-0">
        <div className="p-4 rounded-lg shadow-lg lg:block">
          <WidgetUserInfoMembershipV2 variants={true} />
          <Link href={ROUTES.BALANCE}>
            <div className="py-4 my-4 border-y">
              <div
                className={`flex items-center justify-between ${
                  router.pathname === ROUTES.BALANCE && "text-brand"
                }`}
              >
                <p className="opacity-80">Komisi</p>
                <p className="font-bold">{MoneyFormat(isBalance)}</p>
              </div>
              <div
                className={`flex items-center justify-between ${
                  router.pathname === ROUTES.BALANCE && "text-brand"
                }`}
              >
                <p className="opacity-80">Saldo Belanja</p>
                <p className="font-bold">{MoneyFormat(isOrderBalance)}</p>
              </div>
            </div>
          </Link>
          <div className="mx-2 my-3">
            {/* menu list */}
            {accountMenu.map((item, idx) =>
              item.name === "Membership" &&
              item.appear !== isMembership ? null : (
                <div
                  key={idx}
                  className={`my-6 ${
                    router.pathname === item.slug && "text-brand"
                  }`}
                >
                  <div className="flex items-center gap-5">
                    {item.icon && item.icon}
                    <h4
                      className={`${
                        item.icon ? "font-bold" : "ml-10 opacity-80"
                      }`}
                    >
                      <Link href={item.slug}>{item.name}</Link>
                    </h4>
                  </div>
                </div>
              )
            )}

            <div className="my-6">
              <div className="flex items-center gap-5">
                <button
                  className="flex items-center px-2 py-1 mx-auto my-2 font-black"
                  onClick={handleLogout}
                >
                  {Capitalize(t("common.singOut"))}{" "}
                  <i className="mx-1">
                    <AiOutlineLogout />
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={contentRefDashboard} className="w-full pt-4 lg:pt-0 lg:w-full">
        <div className="w-full max-w-full py-4 mx-auto lg:py-0 sm:px-4">
          {children}
        </div>
      </div>
    </div>
  );
};
