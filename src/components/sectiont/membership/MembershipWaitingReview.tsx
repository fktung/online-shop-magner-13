import React from "react";
import { BackgroundSuccessRegistration } from "@/components/background";
import { Capitalize } from "@/helpers/common";
import { useUser } from "@/hooks/user";
import { t } from "i18next";
import Link from "next/link";
import { ButtonBlack } from "@/components/button";

export const MembershipWaitingReview = () => {
  const { isMembership, isStatusMembership } = useUser();
  return (
    <div className="relative flex w-full gap-4 justify-evenly">
      <div className="my-24">
        <BackgroundSuccessRegistration />
        <div className="grid max-w-md gap-3 mx-auto my-8 ">
          <h3 className="text-xl font-bold text-center">
            {/* {t("pages.verifcation.success.title")} */}
            Pendaftaran Membership Dalam {Capitalize(isStatusMembership || "")}!
          </h3>
          <p className="text-sm text-center">
            {/* {t("pages.verifcation.success.subtitle")} */}
            Mohon tunggu beberapa saat. Kami akan infokan via Email dan Whatsapp
            ketika membershipmu aktif
          </p>
        </div>
        <div className="grid gap-3 my-8 place-content-center">
          <Link href={"/"}>
            <ButtonBlack>
              <p>{t("pages.verifcation.success.startShopping")}</p>
            </ButtonBlack>
          </Link>
        </div>
      </div>
    </div>
  );
};
