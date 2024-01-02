import React, { useMemo, useState } from "react";
import { Modal } from "./Modal";
import { Card } from "../card";
import { IOrder, IStatusTracking } from "@/types";
import { RiFileCopyLine } from "react-icons/ri";
import { useLayout } from "@/hooks/layouts";
import { Image } from "../utility";
import { EstimateDelivery } from "@/helpers/common";

interface IProps {
  data?: IStatusTracking[];
  dataOrder?: IOrder;
  htmlFor: string;
}
export const ModalMyOrderTracking = (props: IProps) => {
  const { data, htmlFor, dataOrder } = props;
  const [isOrderStacking, setIsOrderStacking] = useState<IStatusTracking[]>([]);
  const { setIsSuccess, setIsMessage, setIsError } = useLayout();
  const [isCopy, setIsCopy] = useState(false);
  useMemo(() => {
    const dataOrderTack = data ?? [];
    setIsOrderStacking([...dataOrderTack].reverse());
  }, [data]);
  const handleCopy = () => {
    const { origin } = window.location;
    if (dataOrder && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(dataOrder?.invoice)
        .then(() => {
          // setIsSuccess(true);
          // setIsMessage("Berhasil menyalin ke clipboard");
          setIsCopy(true);
        })
        .catch(error => {
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
  return (
    <Modal htmlFor={htmlFor} className="w-11/12 max-w-2xl">
      <div className="text-center">
        <h3 className="text-lg font-bold">Detail Tracking</h3>
      </div>
      <Card variant="shadow">
        {dataOrder?.order_items.map((item, idx) => (
          <div className="flex items-center gap-4" key={idx}>
            <div className="w-20 p-2 border rounded-lg">
              <Image
                src={
                  process.env.NEXT_PUBLIC_URL_CDN +
                  "/" +
                  item.img.replace(/"/g, "")
                }
                alt="product"
                className="h-20 mx-auto"
              />
            </div>
            <div className="w-full">
              <div className="items-center justify-between w-full gap-2 sm:flex">
                <p className="font-bold sm:text-xl">Estimasi diterima</p>
                <p className="text-brand">
                  {EstimateDelivery(
                    dataOrder.shipping.audit_trail.created_at,
                    dataOrder.shipping.courier.min_day,
                    dataOrder.shipping.courier.max_day,
                  )}
                </p>
              </div>
              <p>
                Dikirim dengan{" "}
                {`${dataOrder.shipping.courier.logistic_name} ${dataOrder.shipping.courier.rate_type}`}
              </p>
            </div>
          </div>
        ))}
      </Card>
      <div className="flex items-center justify-between my-4">
        <p>Nomer Resi</p>
        <div className="flex items-center gap-2">
          <p>{dataOrder?.invoice}</p>
          <div
            className={`${isCopy && "tooltip tooltip-open tooltip-bottom"}`}
            data-tip="Tersalin"
          >
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-brand"
            >
              <RiFileCopyLine className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-4 pl-4 mx-auto mt-2 border md:mt-4 max-w-max rounded-xl">
        {isOrderStacking?.map((item, idx) => (
          <div key={idx} className="relative grid max-w-xs sm:max-w-max">
            {/* <div className="col-span-2">
              <p className="py-1 pl-6 text-sm sm:pl-0 sm:pr-6 sm:text-end">
                {DateFormatFull(item.audit_trail.created_at)}
              </p>
            </div> */}
            <div
              className={`sm:relative ${
                idx !== isOrderStacking.length - 1
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
                <p className="font-black">{item.status.name}</p>
                <p className="text-sm text-stone-400">
                  {item.status.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
