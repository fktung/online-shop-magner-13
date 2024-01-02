import { FormatDate, FormatNumber } from "@/helpers/common";
import { IMembershipOrders } from "@/types";
import Image from "next/image";
import { FC } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

const MembershipOrders: FC<{ orders: IMembershipOrders[] }> = ({ orders }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        {orders?.map((order: any, i) => {
          return (
            <div className="flex flex-col gap-3 p-2 sm:p-4 shadow-card" key={i}>
              <div className="justify-between md:flex">
                <div className="flex-wrap gap-4 text-sm xl:flex">
                  <div className="flex items-start gap-2">
                    <AiOutlineShopping />
                    <p className="grid flex-wrap sm:flex">
                      <span className="mr-1 ">Belanja tanggal:</span>
                      <span className="">
                        {FormatDate(order.audit_trail.created_at)}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <LiaFileInvoiceDollarSolid />
                    <p className="break-words">{order.invoice}</p>
                  </div>
                </div>
                <div className="max-w-[100px] hidden md:block justify-center justify-self-end">
                  <p
                    className={`${
                      order.status == "new"
                        ? "bg-yellow-300 text-yellow-600"
                        : order.status == "pending"
                        ? "bg-slate-300 text-slate-600"
                        : order.status == "prepare"
                        ? "bg-orange-300 text-orange-600"
                        : order.status == "recieved"
                        ? "bg-purple-300 text-purple-600"
                        : order.status == "complaint"
                        ? "bg-red-300 text-red-600"
                        : order.status == "completed"
                        ? "bg-green-300 text-green-600"
                        : order.status == "shipping"
                        ? "bg-blue-300 text-blue-600"
                        : order.status == "canceled"
                        ? "bg-red-300 text-red-600"
                        : ""
                    } px-2 rounded-full `}
                  >
                    {order.status}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <div className="relative w-14 h-14">
                    <Image
                      src={`${
                        process.env.NEXT_PUBLIC_URL_CDN
                      }/${order.order_items[0].img.replace(/"/g, "")}`}
                      loading={"eager"}
                      alt="Avatar Tailwind CSS Component"
                      fill={true}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <p className="font-semibold max-w-max">
                    {order.order_items[0].name}
                  </p>
                  <p className="max-w-max">({order.order_items[0].qty}x)</p>
                </div>
                <div className="grid text-right place-items-end md:place-items-start">
                  <p className="font-semibold">
                    Rp. {FormatNumber(order.order_items[0].price)}
                  </p>
                  <p
                    className={`${
                      order.status == "new"
                        ? "bg-yellow-300 text-yellow-600"
                        : order.status == "pending"
                        ? "bg-slate-300 text-slate-600"
                        : order.status == "prepare"
                        ? "bg-orange-300 text-orange-600"
                        : order.status == "recieved"
                        ? "bg-purple-300 text-purple-600"
                        : order.status == "complaint"
                        ? "bg-red-300 text-red-600"
                        : order.status == "completed"
                        ? "bg-green-300 text-green-600"
                        : order.status == "shipping"
                        ? "bg-blue-300 text-blue-600"
                        : order.status == "canceled"
                        ? "bg-red-300 text-red-600"
                        : ""
                    } px-2 rounded-full mt-2 md:hidden text-center`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>

              <div className="justify-between md:flex">
                <div>
                  <p>{order.order_items.length} Produk</p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <p>Total Pesanan:</p>
                  <p className="font-semibold">
                    Rp. {FormatNumber(order.total_amount)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MembershipOrders;
