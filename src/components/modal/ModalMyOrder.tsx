import React, { useMemo, useState } from "react";
import { Modal } from "./Modal";
import { Card } from "../card";
import { Image } from "../utility";
import { DateFormatFull, MoneyFormat } from "@/helpers/common";
import { IOrder, TOrderLog } from "@/types";
import { AiOutlineDown } from "react-icons/ai";
import { MONTHS } from "@/constant/common";
import { RiFileCopyLine } from "react-icons/ri";
import { useLayout } from "@/hooks/layouts";

interface IProps {
  data?: IOrder;
  htmlFor: string;
}

export const ModalMyOrder = (props: IProps) => {
  const { data, htmlFor } = props;
  const { setIsSuccess, setIsMessage, setIsError } = useLayout();
  const [isCopy, setIsCopy] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isOrderLogs, setIsOrderLogs] = useState<TOrderLog[]>([]);
  const shoppingDate = `${new Date(
    data?.audit_trail.created_at || ""
  ).getDate()} ${
    MONTHS[new Date(data?.audit_trail.created_at || "").getMonth()]
  } ${new Date(data?.audit_trail.created_at || "").getFullYear()}`;

  const handleCopy = () => {
    const { origin } = window.location;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(data?.shipping.reference_id || "")
        .then(() => {
          setIsSuccess(true);
          setIsMessage("Berhasil menyalin ke clipboard");
          setIsCopy(true);
        })
        .catch((error) => {
          setIsError(true);
          setIsMessage("Gagal menyalin ke clipboard");
          console.error("Error copying to clipboard:", error);
        });
    } else {
      setIsError(true);
      setIsMessage("Clipboard tidak didukung di browser ini");
    }
    // setIsSuccess(true);
    // setIsMessage("Copy Clipboard");
    // setIsCopy(true);
  };
  useMemo(() => {
    const dataOrderLog = data?.order_logs ?? [];
    setIsOrderLogs([...dataOrderLog].reverse());
  }, [data?.order_logs]);

  return (
    <Modal htmlFor={htmlFor} className="w-11/12 max-w-2xl">
      <div className="text-center">
        <h3 className="text-lg font-bold">Detail Traksaksi</h3>
      </div>
      <div className="mt-2 md:mt-4">
        {data?.order_items.map((item, idx) => (
          <Card
            key={idx}
            variant="shadow"
            className="mb-2 sm:flex sm:justify-between sm:items-center"
          >
            <div className="flex items-center gap-4">
              <div className="min-w-[4rem] h-16 p-2 border rounded-lg">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_URL_CDN +
                    "/" +
                    item.img.replace(/"/g, "")
                  }
                  alt="product"
                  className="h-full mx-auto"
                />
              </div>
              <div>
                <p className="font-bold">{item.name}</p>
              </div>
            </div>
            <div className="text-end">
              <p className="opacity-80">Total Belanja</p>
              <p>{MoneyFormat(item.amount)}</p>
            </div>
          </Card>
        ))}
        <div className="my-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-black">Berhasil</p>
            <button
              onClick={() => setIsDetailOpen(!isDetailOpen)}
              className="flex items-center gap-2 font-black text-brand"
            >
              Lihat Detail <AiOutlineDown className="text-lg" />
            </button>
          </div>
          <div
            className={`my-2 overflow-hidden transition-all duration-300 ${
              isDetailOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="py-4 pl-4 border rounded-xl">
              {isOrderLogs.map((item, idx) => (
                <div
                  key={idx}
                  className="relative grid max-w-xs mx-auto sm:grid-cols-5 sm:max-w-max"
                >
                  <div className="col-span-2">
                    <p className="py-1 pl-6 text-sm sm:pl-0 sm:pr-6 sm:text-end">
                      {DateFormatFull(item.audit_trail.created_at)}
                    </p>
                  </div>
                  <div
                    className={`col-span-3 sm:relative ${
                      idx !== isOrderLogs.length - 1
                        ? "border-l border-dashed"
                        : ""
                    }`}
                  >
                    <span
                      className={`absolute top-1 flex items-center justify-center w-5 h-5 rounded-full -left-2.5 dark:ring-gray-900 dark:bg-yellow-900 blur-sm ${
                        idx === 0 ? "bg-yellow-200" : ""
                      }`}
                    ></span>
                    <span
                      className={`absolute top-1 flex items-center justify-center w-5 h-5 rounded-full -left-2.5 dark:ring-gray-900 dark:bg-yellow-900 z-10 ${
                        idx === 0 ? "bg-yellow-200" : "bg-white"
                      }`}
                    >
                      <i
                        className={`w-2 h-2 rounded-full ${
                          idx === 0 ? "bg-brand" : "bg-zinc-400"
                        }`}
                      ></i>
                    </span>
                    <div className="pb-6 pl-6">
                      <p className="font-black">{item.status}</p>
                      <p className="text-sm text-stone-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid space-y-2">
            <div className="items-center justify-between text-sm sm:flex sm:text-base">
              <p className="text-stone-400">No. Invoice</p>
              <p className="flex items-center gap-2 font-black text-brand">
                {data?.invoice}
              </p>
            </div>
            <div className="items-center justify-between text-sm sm:flex sm:text-base">
              <p className="text-stone-400">Tanggal Belanja</p>
              {data && (
                <p className="flex items-center gap-2 font-bold">
                  {shoppingDate}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-2 py-4 mt-4 border-t">
          <p className="text-lg font-bold">Info Pengiriman</p>
          <div className="items-center gap-2 sm:flex sm:gap-4 md:gap-6">
            <div className="flex gap-2 sm:justify-between min-w-[7rem] sm:min-w-[9rem]">
              <p>No Invoice </p>:
            </div>
            <p className="w-full">{data?.invoice}</p>
          </div>
          <div className="items-center gap-2 sm:flex sm:gap-4 md:gap-6">
            <div className="flex gap-2 sm:justify-between min-w-[7rem] sm:min-w-[9rem]">
              <p>Kurir </p>:
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="w-full">
                {data?.shipping.courier.logistic_name}{" "}
                {data?.shipping.courier.rate_name}
              </p>
              <div className="min-w-max">
                {data?.shipping.courier && (
                  <Image
                    // src={data.shipping.courier.logistic_logo_url}
                    src={`${
                      data.shipping.courier.rate_type.toLocaleLowerCase() ===
                      "manual"
                        ? process.env.NEXT_PUBLIC_URL_CDN +
                          "/" +
                          data.shipping.courier.logistic_logo_url
                        : data.shipping.courier.logistic_logo_url
                    }`}
                    alt={data?.shipping.courier.logistic_name ?? ""}
                    className={`${
                      data.shipping.courier.rate_type.toLocaleLowerCase() ===
                      "manual"
                        ? "w-28"
                        : "h-10"
                    }`}
                  />
                )}
              </div>
            </div>
          </div>
          {data?.shipping.reference_id && (
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <div className="flex justify-between min-w-[7rem] sm:min-w-[9rem]">
                <p>Nomer Resi </p>:
              </div>
              <div className="flex items-center gap-2">
                <p className="w-full">{data.shipping.reference_id}</p>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-brand"
                >
                  <RiFileCopyLine className="text-xl" />
                  <span>{isCopy ? "Disalin" : "Salin"}</span>
                </button>
              </div>
            </div>
          )}
          <div className="items-start gap-2 sm:flex sm:gap-4 md:gap-6">
            <div className="flex gap-2 sm:justify-between min-w-[7rem] sm:min-w-[9rem]">
              <p>Alamat </p>:
            </div>
            <div className="w-full space-y-1">
              <p className="font-bold">{data?.shipping.consignee.name}</p>
              <p className="font-bold">
                {data?.shipping.consignee.phone_number}
              </p>
              <p>
                {/* {data?.shipping.destination.address} */}
                {data?.shipping.destination.direction},{" "}
                {data?.shipping.destination.address}
                {", "}
                {data?.shipping.destination.area_name}
                {", "}
                {data?.shipping.destination.suburb_name}
                {", "}
                {data?.shipping.destination.city_name}
                {", "}
                {data?.shipping.destination.province_name}
                {", "}
                {data?.shipping.destination.postcode},{" "}
                {data?.shipping.destination.country_name}
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-2 py-4 border-t">
          <p className="text-lg font-bold">Rincian Pembayaran</p>
          <div className="flex items-center justify-between">
            <p className="opacity-70">Metode Pembayaran</p>
            <p className="font-medium text-end">{data?.payment.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="opacity-70">
              Total Harga (
              {data &&
                data.order_items.reduce(
                  (total, item) => total + item.qty,
                  0
                )}{" "}
              Barang)
            </p>
            <p className="font-medium text-end">
              {MoneyFormat(data?.amount || 0)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="opacity-70">Ongkos Kirim</p>
            <p className="font-medium text-end">
              {MoneyFormat(data?.shipping.fee || 0)}
            </p>
          </div>
          {data?.shipping.is_insurance && (
            <div className="flex items-center justify-between">
              <p className="opacity-70">Asuransi Pengiriman</p>
              <p className="font-medium text-end">
                {MoneyFormat(data.shipping.insurance_fee)}
              </p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="opacity-70">Biaya Pembayaran</p>
            <p className="font-medium text-end">
              {MoneyFormat(data?.payment_fee || 0)}
            </p>
          </div>
          <div className="flex items-center justify-between text-lg font-bold ">
            <p>Total Tagihan</p>
            <p>{MoneyFormat(data?.total_amount || 0)}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
