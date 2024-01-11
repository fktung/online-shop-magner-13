import { ROUTES } from "@/constant/routes";
import { Capitalize } from "@/helpers/common";
import { useAuth } from "@/hooks/auth";
import { useTranslationLocales } from "@/locales";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa";

export const MenuAuthentication = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { t } = useTranslationLocales();
  const { setIsPreviousUrl } = useAuth();
  return (
    <button
      onClick={() => {
        setIsPreviousUrl(pathName);
        router.push(ROUTES.LOGIN);
      }}
      className="flex items-center gap-2 text-brand-black"
    >
      <i className="text-lg">
        <FaUser />
      </i>
      <p>{Capitalize(t("common.singIn"))}</p>
    </button>
  );
};
