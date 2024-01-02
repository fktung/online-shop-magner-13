/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { GrNotification } from "react-icons/gr";
// import { MenuAccountNavMobile } from "../menu";
import { ROUTES } from "@/constant/routes";
import Link from "next/link";
import { WidgetUserInfoMembership } from "../widgets";
import { IconMembershipMenu } from "../icons";
import { useUser } from "@/hooks/user";
import { LuPackageCheck } from "react-icons/lu";
import dynamic from "next/dynamic";
const MenuAccountNavMobile = dynamic(
  () => import("../menu").then(data => data.MenuAccountNavMobile),
  {
    ssr: false,
    suspense: false,
  },
);

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
    slug: ROUTES.ACCOUNT_MY_ORDER,
    name: "Pesanan Saya",
    icon: <LuPackageCheck className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    appear: true,
    slug: "#",
    name: "Notifikasi",
    icon: (
      <GrNotification className="w-5 md:w-[22px] h-5 md:h-[22px] dark:invert" />
    ),
  },
];

export const LayoutDashboard = (props: IProps) => {
  const { children } = props;
  const { isMembership } = useUser();
  return (
    <div className="grid gap-4 lg:flex">
      {/* ========= menu Mobile ============== */}
      <div className=" lg:hidden">
        <WidgetUserInfoMembership />
        <div className="w-full max-w-lg px-4 mx-auto">
          <MenuAccountNavMobile options={accountMenu} />{" "}
        </div>
      </div>

      <div className="w-full min-w-[16rem] max-w-[17rem]">
        <div className="hidden p-4 rounded-lg shadow-lg lg:block">
          <WidgetUserInfoMembership variants={true} />
          <div className="mx-2 my-3">
            {accountMenu.map((item, idx) =>
              item.name === "Membership" &&
              item.appear !== isMembership ? null : (
                <div key={idx} className="my-6">
                  <div className="flex items-center gap-5">
                    {item.icon && item.icon}
                    <h4 className={`${item.icon ? "font-bold" : "ml-10"}`}>
                      <Link href={item.slug}>{item.name}</Link>
                    </h4>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-max xl:w-full">
        <div className="w-full max-w-full px-2 py-4 mx-auto sm:px-4">
          {children}
        </div>
      </div>
    </div>
  );
};
