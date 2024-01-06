import React, {
  AnchorHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Image } from "../utility";
import { SlOptionsVertical } from "react-icons/sl";
import { BiShoppingBag } from "react-icons/bi";
import { GrDocumentText } from "react-icons/gr";
import { Card } from "../card";
import { ORDER_STATUS, TOrder } from "@/constant/order";
import { Capitalize, MoneyFormat } from "@/helpers/common";
import { ModalMyOrder, ModalMyOrderTracking } from "../modal";
import { IMyOrder, IOrder, IStatusTracking } from "@/types/tOrder";
import Swal from "sweetalert2";
import { ApiAxios } from "@/helpers/axios";
import { useLayout } from "@/hooks/layouts";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import { ROUTES } from "@/constant/routes";

interface IProps {
  data: IMyOrder;
  getMyOrder: () => void;
}

export const WidgetMyOrder = (props: IProps) => {
  const { data, getMyOrder } = props;
  const {
    id,
    amount,
    audit_trail,
    order_items,
    payment_fee,
    shipping_fee,
    total_amount,
    invoice,
    status,
  } = data;
  const router = useRouter();
  const { setIsSuccess, setIsError, setIsMessage } = useLayout();
  const { getMeCheck } = useAuth();
  const [isDetailOrder, setIsDetailOrder] = useState<IOrder>();
  const [isDetailOrderTracking, setIsDetailOrderTracking] =
    useState<IStatusTracking[]>();
  const modalDetailOrder = useRef<HTMLLabelElement | null>(null);
  const modalDetailOrderTracking = useRef<HTMLLabelElement | null>(null);
  const { hash } = window.location;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };
  const selectColor = (status: string) => {
    let idColor = 0;
    ORDER_STATUS.map((i) => {
      if (i.key === status) {
        idColor = i.id - 1;
      }
    });
    return idColor;
  };

  const updateOrder = async (status: string) => {
    try {
      await ApiAxios.patch(`/order/${invoice}`, {
        status: status,
      });
      getMyOrder();
      setIsSuccess(true);
      setIsMessage(`Order berhasil di ${status}`);
      getMeCheck();
    } catch (error: any) {
      console.log("updateOrder ", invoice, error);
      setIsError(true);
      setIsMessage(`Order Gagal di ${status}`);
    }
  };

  const handleBtnCanceled = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Konfirmasi Cancel Orderan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Batalkan!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrder("canceled");
      }
    });
  };

  const handleBtnCompleted = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Pesanan Anda Sudah Diterima!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6DF776",
      cancelButtonColor: "#d33",
      confirmButtonText: "Pesanan Diterima!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrder("completed");
      }
    });
  };

  const handleBtnCompaint = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Ingin komplaint pesanan Anda!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ff7b25",
      cancelButtonColor: "#999",
      confirmButtonText: "Komplain Pesanan!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrder("complaint");
        window.open(
          `https://wa.me/6282154304340?text=saya%20mau%20komplain%20orderan%20saya%0anomer%20invoice:%20${invoice}`,
          "_blank",
          "noopener,noreferrer"
        );
      }
    });
  };

  const handleShoModal = async () => {
    try {
      const response = await ApiAxios.get(`/order/${invoice}`);
      const data = response.data.data;
      setIsDetailOrder(data);
      if (modalDetailOrder.current instanceof HTMLElement) {
        modalDetailOrder.current.click();
      }
    } catch (error: any) {
      console.log("handleShoModal", error);
    }
  };

  const handleShoModalTracking = async () => {
    try {
      const responseOrder = await ApiAxios.get(`/order/${invoice}`);
      const response = await ApiAxios.get(`/order/${invoice}/tracking`);
      const dataOrder = responseOrder.data.data;
      const data = response.data.data;
      setIsDetailOrder(dataOrder);
      setIsDetailOrderTracking(data);
      if (modalDetailOrderTracking.current instanceof HTMLElement) {
        modalDetailOrderTracking.current.click();
      }
    } catch (error: any) {
      console.log("handleShoModalTracking", error);
      const dataError = error.response.data;
      setIsError(true);
      setIsMessage(`${dataError.status_code} - ${dataError.message}`);
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(invoice)
        .then(() => {
          router.replace(`#${invoice}`);
        })
        .catch((error) => {
          setIsError(true);
          setIsMessage("Gagal menyalin ke clipboard");
          console.error("Error copying to clipboard:", error);
        });
      // setIsHashUrl(window.location.hash);
    } else {
      setIsError(true);
      setIsMessage("Clipboard tidak didukung di browser ini");
    }
  };

  return (
    <div className="my-4">
      <Card variant="border">
        <div className="grid w-full gap-4 md:items-center md:flex-row-reverse md:justify-between md:flex">
          <div className="flex justify-end gap-2">
            <p
              className={`px-3 py-0.5 rounded font-bold
                  ${
                    [
                      "text-blue-500 bg-blue-300/30",
                      "text-blue-500 bg-blue-300/30",
                      "text-yellow-500 bg-yellow-300/30",
                      "text-yellow-500 bg-yellow-300/30",
                      "text-green-500 bg-green-300/30",
                      "text-red-500 bg-red-300/30",
                      "text-green-500 bg-green-300/30",
                      "text-red-500 bg-red-300/30",
                    ][selectColor(status)]
                  }
                `}
            >
              {Capitalize(status)}
            </p>
            <button>
              <SlOptionsVertical />
            </button>
          </div>
          <div className="grid md:flex">
            <p className="flex flex-wrap items-center gap-x-2 md:pr-4">
              <BiShoppingBag className="text-xl min-w-max" />
              Belanja tanggal:
              <span>{formatDate(audit_trail.created_at)}</span>
            </p>
            <div
              className={`flex items-center gap-2 text-xs xs:text-sm md:pl-4 md:border-l ${
                hash.replace("#", "") === invoice && "tooltip tooltip-open"
              }`}
              data-tip="Tersalin"
            >
              <GrDocumentText className="text-lg dark:invert" />
              <button onClick={handleCopy}>{invoice}</button>
            </div>
          </div>
        </div>
        <div className="items-center justify-between gap-2 py-6 md:flex">
          {order_items.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-20 p-2 mx-auto border rounded-lg">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_URL_CDN +
                    "/" +
                    order_items[0].img.replace(/"/g, "")
                  }
                  alt="product"
                  className="h-16 mx-auto"
                />
              </div>
              <div className="w-full">
                <p className="font-bold">{order_items[0].name}</p>
                {/* <p className="opacity-75">{variant}</p> */}
              </div>
            </div>
          )}
          <div className=" min-w-max">
            <p className="opacity-80 text-end">Total Belanja</p>
            <p className="font-bold text-end">{MoneyFormat(total_amount)}</p>
          </div>
        </div>
        <div className="grid w-full gap-4 sm:justify-end sm:flex">
          {(status === "pending" || status === "new") && (
            <button
              onClick={handleBtnCanceled}
              className="w-full px-6 py-2 font-semibold text-center transition-all duration-300 border border-black rounded-md cursor-pointer min-w-max sm:w-36 hover:bg-zinc-100 dark:border-white"
            >
              Cancel
            </button>
          )}
          {status === "pending" && (
            <button
              onClick={() =>
                router.push(`${ROUTES.ACCOUNT_MY_ORDER}/${invoice}`)
              }
              className="w-full px-6 py-2 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md min-w-max sm:w-36 hover:bg-zinc-800"
            >
              Bayar
            </button>
          )}
          {(status === "completed" ||
            status === "complaint" ||
            status === "canceled" ||
            status === "prepare" ||
            status === "new") && (
            <>
              <label
                htmlFor={invoice}
                className={`hidden`}
                ref={modalDetailOrder}
              />
              <button
                onClick={handleShoModal}
                className={`
                ${
                  status === "new"
                    ? "w-full px-6 py-2 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md min-w-max sm:w-36 hover:bg-zinc-800"
                    : "w-full px-6 py-2 font-semibold text-center transition-all duration-300 border border-black rounded-md cursor-pointer min-w-max sm:w-36 hover:bg-zinc-100 dark:border-white"
                }`}
              >
                Lihat Detail
              </button>
            </>
          )}
          {status === "completed" && (
            <button className="w-full px-6 py-2 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md min-w-max sm:w-36 hover:bg-zinc-800">
              Beli Lagi
            </button>
          )}
          {status === "recieved" && (
            <>
              <button
                className="w-full px-6 py-2 font-semibold text-center transition-all duration-300 border border-black rounded-md cursor-pointer min-w-max sm:w-36 hover:bg-zinc-100 dark:border-white"
                onClick={handleBtnCompaint}
              >
                Komplain Orderan
              </button>
              <button
                onClick={handleBtnCompleted}
                className="w-full px-6 py-2 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md min-w-max sm:w-36 hover:bg-zinc-800"
              >
                Pesanan Di Terima
              </button>
            </>
          )}
          {(status === "shipping" || status === "prepare") && (
            <>
              <label
                htmlFor={invoice + "tracking"}
                className={`hidden`}
                ref={modalDetailOrderTracking}
              />
              <button
                onClick={handleShoModalTracking}
                className="w-full px-6 py-2 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md min-w-max sm:w-36 hover:bg-zinc-800"
              >
                Lacak Pesanan
              </button>
            </>
          )}
        </div>
      </Card>

      {/* Modal */}
      <ModalMyOrder data={isDetailOrder} htmlFor={invoice} />
      <ModalMyOrderTracking
        data={isDetailOrderTracking}
        dataOrder={isDetailOrder}
        htmlFor={invoice + "tracking"}
      />
    </div>
  );
};
