import { ButtonBlack } from "@/components/button";
import { Card } from "@/components/card";
import { ROUTES } from "@/constant/routes";
import { MoneyFormat } from "@/helpers/common";
import { useUser } from "@/hooks/user";
import { IItemCart } from "@/types";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

interface IPropsCartSection {
  data: IItemCart[];
}
export const CartAside = (props: IPropsCartSection) => {
  const { data } = props;
  const { isStatusMembership } = useUser();
  const arrPrice = useMemo(() => {
    const arr: number[] = [];
    data.map(i => {
      if (!i.is_checked) return;
      if (i.flash_sale) {
        arr.push(i.flash_sale.discount_price * i.qty);
        return;
      }
      arr.push(i.price * i.qty);
    });
    return arr;
  }, [data]);

  const arrQty = useMemo(() => {
    const arr: number[] = [];
    data.map(i => {
      if (!i.is_checked) return;
      arr.push(i.qty);
    });
    return arr;
  }, [data]);

  return (
    <div className="lg:min-w-[25rem]">
      {isStatusMembership != "active" && (
        <Card variant="border" className="relative mb-4 overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-brand" />
          <p className="mb-2 font-black">Persyaratan Gabung Membership</p>
          <p className="text-xs text-end">
            {arrPrice.reduce((acc, item) => acc + item, 0) >= 100000
              ? `Syarat Daftar Membership Terpenuhi ${MoneyFormat(
                  arrPrice.reduce((acc, item) => acc + item, 0),
                )}/${MoneyFormat(100000)}`
              : `Syarat Daftar Membership Belum Terpenuhi ${MoneyFormat(
                  arrPrice.reduce((acc, item) => acc + item, 0),
                )}/${MoneyFormat(100000)}`}
          </p>
          <progress
            className={`
          w-full transition-all duration-300 progress
          ${
            arrPrice.reduce((acc, item) => acc + item, 0) >= 100000
              ? "progress-accent"
              : "progress-warning"
          }

        `}
            value={arrPrice.reduce((acc, item) => acc + item, 0)}
            max="100000"
          ></progress>
        </Card>
      )}
      <Card variant="shadow" className="w-full">
        <div className="flex justify-between font-extrabold">
          <p>Ringkasan Belanja</p>
        </div>
        <div className="flex items-center justify-between py-6 border-b">
          <p>
            Total Harga ({arrQty.reduce((acc, item) => acc + item, 0)} Barang)
          </p>
          <p>{MoneyFormat(arrPrice.reduce((acc, item) => acc + item, 0))}</p>
        </div>
        <div className="flex justify-between py-6 font-extrabold">
          <p>Total Tagihan</p>
          <p>{MoneyFormat(arrPrice.reduce((acc, item) => acc + item, 0))}</p>
        </div>
        <Link href={ROUTES.CHECKOUT}>
          <ButtonBlack className="w-full">Bayar</ButtonBlack>
        </Link>
      </Card>
    </div>
  );
};
