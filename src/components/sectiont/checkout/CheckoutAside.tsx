import { ButtonBlack } from "@/components/button";
import { Card } from "@/components/card";
import { Image } from "@/components/utility";
import { MoneyFormat } from "@/helpers/common";
import { IDelivery, IItemCart, IPayment } from "@/types";
import React, { useMemo } from "react";

interface IProps {
  data: IItemCart[];
  amount: number;
  delivery?: IDelivery;
  isInsurance: boolean;
  handleBtn: () => Promise<void>;
  isPaymentSelect?: IPayment;
  isLoading: boolean;
}

export const CheckoutAside = (props: IProps) => {
  const {
    data,
    amount,
    delivery,
    isInsurance,
    handleBtn,
    isPaymentSelect,
    isLoading,
  } = props;

  const subTotalItems = useMemo(() => {
    const arr: number[] = [];
    data.map(item => {
      arr.push(parseInt(item.subtotal));
    });
    return arr.reduce((acc, item) => acc + item, 0);
  }, [data]);

  const shipping_fee =
    (delivery?.total_price ? delivery.total_price : 0) +
    (isInsurance && delivery?.insurance_fee ? delivery?.insurance_fee : 0);

  const payment_fee =
    ((amount + shipping_fee) *
      (isPaymentSelect ? isPaymentSelect?.fee_percentage : 0)) /
      100 +
    (isPaymentSelect ? isPaymentSelect?.fee_flat : 0);

  const isAmount = amount + shipping_fee + payment_fee;

  return (
    <div className="lg:min-w-[25rem]">
      <Card variant="shadow">
        <div className="flex justify-between font-extrabold">
          <p>Produk</p>
          <p>Subtotal</p>
        </div>
        {data?.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-2 my-6"
          >
            <div className="flex items-center gap-2">
              <div className="h-20 min-w-[5rem] p-2 mx-auto border rounded-lg">
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL_CDN}${
                    item.img
                      ? "/" + item.img.replace(/\"/g, "")
                      : "/asset/noProfile.png"
                  }`}
                  alt="product"
                  className="h-full mx-auto"
                />
              </div>
              <div>
                <p className="font-bold">{item.name.split(" - ")[0]}</p>
                <p className="opacity-75">{item.name.split(" - ")[1]}</p>
                <p className="mt-2 text-sm opacity-75">{item.qty} Product</p>
              </div>
            </div>
            <p className="min-w-max">{MoneyFormat(parseInt(item.subtotal))}</p>
          </div>
        ))}
        <div className="flex items-center justify-between py-6 border-y">
          <p>Subtotal</p>
          <p>{MoneyFormat(subTotalItems)}</p>
        </div>
        <div className="grid gap-2 py-6 border-b">
          <div className="flex items-center justify-between ">
            <p>Biaya Pengiriman</p>
            <p>
              {delivery?.total_price
                ? MoneyFormat(delivery.total_price)
                : "Rp -"}{" "}
            </p>
          </div>
          {isInsurance && (
            <div className="flex items-center justify-between ">
              <p>Asuransi Pengiriman</p>
              <p>
                {delivery?.insurance_fee
                  ? MoneyFormat(delivery?.insurance_fee)
                  : "Rp -"}{" "}
              </p>
            </div>
          )}
          <div className="flex items-center justify-between ">
            <p>Biaya Pembayaran</p>
            <p>
              {isPaymentSelect ? MoneyFormat(Math.floor(payment_fee)) : "Rp -"}{" "}
            </p>
          </div>
        </div>
        <div className="flex justify-between py-6 font-extrabold">
          <p>Total</p>
          <p>{MoneyFormat(Math.floor(isAmount))}</p>
        </div>
        <ButtonBlack
          className="w-full "
          onClick={() => handleBtn()}
          disabled={isLoading}
        >
          {delivery?.total_price && isLoading ? (
            <p className="flex items-center justify-center gap-4">
              <span className="text-white loading loading-spinner"></span>
              Proses...
            </p>
          ) : (
            "Bayar"
          )}
        </ButtonBlack>
      </Card>
    </div>
  );
};
