import { FormatDate, MoneyFormat } from "@/helpers/common";
import { IOrder } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Image } from "../utility";
import QRCode from "qrcode.react";
import { RiFileCopyLine } from "react-icons/ri";
import { useLayout } from "@/hooks/layouts";
import { useRouter } from "next/router";
import { ROUTES } from "@/constant/routes";
import { WidgetPaymentMethod } from "../widgets";
import { ModalCheckoutInvoice } from "../modal";

interface ISectiontInvoicePaymentProps {
  isOrder: IOrder;
}

export const SectiontInvoicePayment = (props: ISectiontInvoicePaymentProps) => {
  const { isOrder } = props;
  const router = useRouter();

  const [isHours, setIsHours] = useState(0);
  const [isMinutes, setIsMinutes] = useState(0);
  const [isSeconds, setIsSeconds] = useState(0);
  const [isDateExpired, setIsDateExpired] = useState(new Date().toString());

  const { setIsSuccess, setIsMessage, setIsError } = useLayout();
  const interval = useRef<NodeJS.Timer | undefined>();

  const handleCopy = () => {
    navigator.clipboard.writeText(
      isOrder ? isOrder.payment.action.account_number : "",
    );
    setIsSuccess(true);
    setIsMessage("Copy Clipboard");
  };

  const startTime = () => {
    const dateConvert = new Date(isOrder.payment.expired_at);
    // dateConvert.setUTCHours(dateConvert.getUTCHours() + 7);
    const expired = dateConvert.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    const targetTimeExpired = expired;
    // setIsDateExpired(expired);
    const targetTime = new Date(targetTimeExpired).getTime();
    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
        setIsHours(0);
        setIsMinutes(0);
        setIsSeconds(0);
      } else {
        setIsHours(hours);
        setIsMinutes(minutes);
        setIsSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTime();
    return () => {
      clearInterval(interval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid min-h-[40rem]">
      <div className="max-w-2xl gap-4 mx-auto lg:py-2 ">
        {isOrder.payment.status === "pending" && (
          <div className="text-2xl font-bold text-center">
            <p>Selesaikan pembayaran dalam</p>
            <p className="text-brand">
              {isHours < 10 ? "0" + isHours : isHours}:
              {isMinutes < 10 ? "0" + isMinutes : isMinutes}:
              {isSeconds < 10 ? "0" + isSeconds : isSeconds}
            </p>
          </div>
        )}
        {isOrder.payment.status === "paid" && (
          <div className="pb-4 text-2xl font-bold text-center text-brand">
            <p>Pesanan telah di bayar</p>
          </div>
        )}
        {(isOrder.payment.status === "expired" ||
          isOrder.payment.status === "refund") && (
          <div className="text-2xl font-bold text-center text-red-500">
            <p>Pesanan telah kedaluwarsa</p>
          </div>
        )}
        {isOrder.payment.status !== "paid" && (
          <div className="text-center">
            <p className="opacity-80">Batas akhir pembayaran</p>
            <p className="text-2xl font-bold">
              {FormatDate(
                isOrder?.payment.expired_at ? isOrder?.payment.expired_at : "",
              ) + " WIB"}
            </p>
          </div>
        )}
        <div className="grid gap-4 my-4 sm:px-4 md:px-8">
          <div className="items-center gap-2 xs:flex">
            <p className="font-bold">Invoice: </p>
            <p className="font-bold">{isOrder?.invoice}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold">{isOrder?.payment.name}</p>
            {isOrder.payment.payment.img && (
              <div className="h-5">
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL_CDN}/${isOrder.payment.payment.img}`}
                  alt="Payment"
                  className="h-full"
                />
              </div>
            )}
          </div>
          <div className="grid gap-2">
            {isOrder.payment.provider.toLocaleLowerCase() !==
              "BALANCE".toLocaleLowerCase() &&
              (isOrder.payment.code === "QRIS" ? (
                <div className="grid place-items-center">
                  {isOrder.payment.action.qr_string ? (
                    <QRCode
                      value={isOrder.payment.action.qr_string}
                      renderAs="canvas"
                      size={250}
                    />
                  ) : (
                    "qr kode error"
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Nomor Virtual</p>
                    <p className="font-bold">
                      {isOrder.payment.action.account_number}
                    </p>
                  </div>
                  <div className="h-5">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 text-brand"
                    >
                      <RiFileCopyLine className="text-xl" />
                      <span>Salin</span>
                    </button>
                  </div>
                </div>
              ))}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Total Pembayaran</p>
                <p className="font-bold">{MoneyFormat(isOrder.total_amount)}</p>
              </div>
              <div className="h-5">
                <label
                  htmlFor="paymentModal"
                  className="cursor-pointer text-brand"
                >
                  Lihat Detail
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="grid w-full gap-4 sm:flex">
          <button
            onClick={() => router.push(ROUTES.ACCOUNT_MY_ORDER)}
            className="w-full px-6 py-2 font-semibold text-center transition-all duration-300 border border-black rounded-md hover:bg-zinc-100 dark:border-white"
          >
            Cek Status Pembayaran
          </button>
          <button
            onClick={() => router.push(ROUTES.PRODUCTS)}
            className="w-full px-6 py-2 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md hover:bg-zinc-800"
          >
            Beli Lagi
          </button>
        </div>
        {isOrder.payment.payment.group === "va" &&
          isOrder.payment.payment.how_to_pay !== null && (
            <div className="grid gap-2">
              <WidgetPaymentMethod
                noVA={isOrder.payment.action.account_number}
                how_to_pay={isOrder.payment.payment.how_to_pay}
              />
            </div>
          )}
        {/* Modal */}
      </div>
      <ModalCheckoutInvoice detailOrder={isOrder} />
    </div>
  );
};
