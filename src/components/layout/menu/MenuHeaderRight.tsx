/* eslint-disable @next/next/no-img-element */
import { ButtonBlack } from "@/components/button";
import { t } from "i18next";
import React from "react";
import { Capitalize } from "@/helpers/common";
import { useAuth } from "@/hooks/auth";
import { useLayout } from "@/hooks/layouts";
import { ROUTES } from "@/constant/routes";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useUser } from "@/hooks/user";
import { usePathname, useRouter } from "next/navigation";
import { useTranslationLocales } from "@/locales";

export const MenuHeaderRight = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { t } = useTranslationLocales();
  const { isAvatar, isCart } = useUser();
  const { isAuth, isName, setIsPreviousUrl } = useAuth();
  const { setShowSidebar } = useLayout();

  const handleLogin = () => {
    setIsPreviousUrl(pathName);
    setShowSidebar(false);
    router.push(ROUTES.LOGIN);
  };

  const handleCart = () => {
    router.push(ROUTES.CART);
    setShowSidebar(false);
  };

  return (
    <div className="flex flex-row-reverse items-center gap-2 xl:flex-row">
      {isAuth && (
        <>
          <button
            type="button"
            className="relative flex justify-center w-10 text-2xl"
            onClick={handleCart}
          >
            <AiOutlineShoppingCart />
            {isCart > 0 && (
              <div className="absolute right-0 -top-5">
                <span
                  className={`text-white bg-red-500 rounded-full mb-auto text-[8px] ${
                    isCart > 9 ? "p-1" : "py-0.5 px-1"
                  }`}
                >
                  {isCart}
                </span>
              </div>
            )}
          </button>
          <div className="w-1 h-8 border-l border-brand-muted" />
        </>
      )}
      <div className="flex items-center max-w-[10rem]">
        {isAuth ? (
          // <WidgetNavAccount />
          <Link
            href={ROUTES.ACCOUNT}
            className="flex items-center gap-2 overflow-hidden"
          >
            <div className="overflow-hidden rounded-full min-w-max">
              <img
                src={`${process.env.NEXT_PUBLIC_URL_CDN}${
                  isAvatar ? "/" + isAvatar : "/asset/noProfile.png"
                }`}
                alt="Profile"
                className="object-contain w-10 h-10"
              />
            </div>
            <p className="text-lg font-bold truncate text-ellipsis ...">
              {isName}
            </p>
          </Link>
        ) : (
          <ButtonBlack onClick={handleLogin}>
            {Capitalize(t("common.singIn"))}
          </ButtonBlack>
        )}
      </div>
    </div>
  );
};
