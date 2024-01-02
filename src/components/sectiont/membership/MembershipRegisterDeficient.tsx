import { ButtonBlack } from "@/components/button";
import { ROUTES } from "@/constant/routes";
import { t } from "i18next";
import Link from "next/link";
import React from "react";

export const MembershipRegisterDeficient = () => {
  return (
    <div className="relative flex w-full gap-4 justify-evenly">
      <div className="my-24">
        <div className="grid max-w-md gap-3 mx-auto my-8 ">
          <h3 className="text-xl font-bold text-center">
            Persyaratan Membership Belum Terpenuhi
          </h3>
          <p className="text-sm text-center">
            Silahkan Melakukan Pembelian Barang Dengan Minimal Pembelajaan 100
            Ribu
          </p>
        </div>
        <div className="grid gap-3 my-8 place-content-center">
          <Link href={ROUTES.PRODUCTS}>
            <ButtonBlack>
              <p>{t("pages.verifcation.success.startShopping")}</p>
            </ButtonBlack>
          </Link>
        </div>
      </div>
    </div>
  );
};
