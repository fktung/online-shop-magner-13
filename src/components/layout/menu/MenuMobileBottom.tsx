import React from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineUserGroup, HiOutlineUser } from "react-icons/hi";
import { ROUTES } from "@/constant/routes";
import { IconProduct } from "@/components/icons";
import { useUser } from "@/hooks/user";
import { useAuth } from "@/hooks/auth";
import { Image } from "@/components/utility";
import { usePathname, useRouter } from "next/navigation";

const MENU_MOBILE = [
  {
    name: "Home",
    children: <AiOutlineHome />,
    uri: "/",
    matchUri: ["/"],
  },
  {
    name: "Product",
    children: <IconProduct />,
    uri: ROUTES.PRODUCTS,
    matchUri: ["/products", "/product/[slug]"],
  },
  {
    name: "Keranjang",
    children: <AiOutlineShoppingCart />,
    uri: ROUTES.CART,
    matchUri: ["/cart", "/checkout", "/checkout/[invoice]"],
  },
  {
    name: "Membership",
    children: <HiOutlineUserGroup />,
    uri: ROUTES.MEMBERSHIP,
    matchUri: ["/membership", "/membership/register", "/membership/waiting"],
  },
  {
    name: "Profile",
    children: <HiOutlineUser />,
    uri: ROUTES.ACCOUNT,
    matchUri: [
      "/account",
      "/account/address",
      "/account/address/add",
      "/account/address/edit",
      "/account/my-order",
      "/account/my-order/[invoice]",
      "/account/setting",
    ],
  },
];

export const MenuMobileBottom = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { isMembership, isCart, isAvatar } = useUser();
  const { isAuth } = useAuth();
  return (
    <div className="fixed xl:hidden z-20 py-4 grid w-full grid-cols-5 bg-white bottom-0 rounded-t-3xl drop-shadow-[0_-3px_6px_rgba(0,0,0,0.25)] place-items-center">
      {MENU_MOBILE.map((item, idx) => (
        <div key={idx} className="relative">
          {item.name.toLowerCase() === "keranjang" &&
            !item.matchUri.includes(pathName) &&
            isCart > 0 && (
              <span
                className={`text-[8px] absolute -right-2 bg-red-500 rounded-full -top-2 px-1 text-white ${
                  isCart > 9 && "py-0.5"
                }`}
              >
                {isCart}
              </span>
            )}
          <button
            onClick={() => {
              if (item.name.toLowerCase() === "membership") {
                isMembership
                  ? router.push(item.uri)
                  : router.push(ROUTES.MEMBERSHIP_REGISTER);
              } else {
                router.push(item.uri);
              }
            }}
            className={`flex-col items-center justify-center text-2xl transition-all duration-300  ${
              item.matchUri.includes(pathName) && "text-brand scale-150"
            }`}
          >
            {item.name.toLowerCase() === "profile" && isAuth ? (
              <div
                className={`overflow-hidden rounded-full min-w-max ${
                  item.matchUri.includes(pathName) &&
                  "shadow-cardHover shadow-brand"
                }`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL_CDN}${
                    isAvatar ? "/" + isAvatar : "/asset/noProfile.png"
                  }`}
                  alt="Profile"
                  className={`aspect-square h-[1em] object-contain`}
                />
              </div>
            ) : (
              item.children
            )}
          </button>
        </div>
      ))}
    </div>
  );
};
