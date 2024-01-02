import React from "react";
import { Modal } from "./Modal";
import { Image } from "../utility";
import { Card } from "../card";
import { IOrder } from "@/types";
import { EstimateDelivery, MoneyFormat } from "@/helpers/common";

interface IModalCheckoutInvoiceProps {
  detailOrder: IOrder;
}

export const ModalCheckoutInvoice = (props: IModalCheckoutInvoiceProps) => {
  const { detailOrder } = props;
  return (
    <Modal htmlFor="paymentModal">
      <div className="text-center">
        <h3 className="text-lg font-bold">Detail Pembayaran</h3>
      </div>
      <div className="mt-2 md:mt-4">
        <Card variant="shadow">
          {detailOrder.order_items.map((item, idx) => (
            <div
              className="flex items-center gap-4 my-2 border rounded-xl"
              key={idx}
            >
              <div className="w-16 h-16 p-2 border rounded-lg">
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
              <div className="flex items-center gap-2">
                <p className="font-bold">{item.name}</p>
                <p className="min-w-max">({item.qty} Barang)</p>
              </div>
            </div>
          ))}
        </Card>
        <div className="grid gap-2 my-4">
          <div className="flex items-center justify-between">
            <p className="opacity-80">Total Harga</p>
            <p>{MoneyFormat(detailOrder.amount)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="opacity-80">Total Ongkos Kirim</p>
            <p>{MoneyFormat(detailOrder.shipping_fee)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="opacity-80">Biaya Pembayaran</p>
            <p>{MoneyFormat(detailOrder.payment_fee)}</p>
          </div>
          <div className="flex items-center justify-between font-bold ">
            <p>Total Tagihan</p>
            <p>{MoneyFormat(detailOrder.total_amount)}</p>
          </div>
        </div>
        <div className="flex items-center py-4 border-t justify-between0">
          <div className="flex items-center justify-between w-full font-bold ">
            <div className="grid gap-2 text-sm">
              <p>Dibayar Dengan</p>
              <p className="font-medium opacity-80">BCA Virtual Account</p>
            </div>
            <p>{MoneyFormat(detailOrder.total_amount)}</p>
          </div>
        </div>
        <div className="flex items-center py-4 border-t justify-between0">
          <div className="grid gap-1 text-sm font-bold">
            <p>Alamat Pengiriman</p>
            <p className="font-medium opacity-80">
              Penerima : {detailOrder.shipping.consignee.name}
            </p>
            <p className="font-medium opacity-80">
              {detailOrder.shipping.destination.address}{" "}
              {detailOrder.shipping.destination.direction}
            </p>
            <p className="font-medium opacity-80">
              No. Telpon : {detailOrder.shipping.consignee.phone_number}
            </p>
          </div>
        </div>
        <div className="flex justify-between py-4 border-t items-top">
          <div className="grid gap-1 text-sm">
            <p className="font-bold">Kurir</p>
            <p className="opacity-80">
              {detailOrder.shipping.courier.logistic_name} (
              {detailOrder.shipping.courier.rate_type} -{" "}
              {detailOrder.shipping.courier.rate_name})
            </p>
            {detailOrder.shipping.courier.rate_type.toLocaleLowerCase() !==
              "manual" && (
              <p className="opacity-80">
                Estimasi tiba{" "}
                {EstimateDelivery(
                  detailOrder.shipping.audit_trail.created_at,
                  detailOrder.shipping.courier.min_day,
                  detailOrder.shipping.courier.max_day,
                )}
              </p>
            )}
          </div>
          <div>
            <Image
              src={`${
                detailOrder.shipping.courier.rate_type.toLocaleLowerCase() ===
                "manual"
                  ? process.env.NEXT_PUBLIC_URL_CDN +
                    "/" +
                    detailOrder.shipping.courier.logistic_logo_url
                  : detailOrder.shipping.courier.logistic_logo_url
              }`}
              alt="courier"
              className={`${
                detailOrder.shipping.courier.rate_type.toLocaleLowerCase() ===
                "manual"
                  ? "w-28"
                  : "h-10"
              }`}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
