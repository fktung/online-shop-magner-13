import { Card } from "@/components/card";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import {
  IAddress,
  IDeliveries,
  IDelivery,
  IFieldError,
  IPayment,
} from "@/types";
import {
  ModalAddressSelect,
  ModalCheckoutPickUp,
  ModalMapCheckoutInstant,
  ModalPaymentsCheckout,
} from "@/components/modal";
import { ApiAxios } from "@/helpers/axios";
import { MoneyFormat } from "@/helpers/common";
import { DELIVERY } from "@/constant/checkout";
import Swal from "sweetalert2";

interface IProps {
  address: IAddress[];
  expeditions: string[];
  getCheckout: () => void;
  setIsDelivery: (param: IDelivery) => void;
  setIsPaymentSelect: (param: IPayment) => void;
  isDelivery?: IDelivery;
  isInsurance: boolean;
  setIsInsurance: React.Dispatch<React.SetStateAction<boolean>>;
  payments: IPayment[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fieldError: IFieldError;
  isNote: string;
  setIsNote: (param: string) => void;
  htmlForModal: string;
}

export const CheckoutSection = (props: IProps) => {
  const {
    address,
    expeditions,
    getCheckout,
    setIsDelivery,
    isDelivery,
    isInsurance,
    setIsInsurance,
    payments,
    setIsPaymentSelect,
    setIsLoading,
    fieldError,
    isNote,
    setIsNote,
    htmlForModal,
  } = props;
  const [isDefaultAddress, setIsDefaultAddress] = useState<number>();
  const [isDeliveries, setIsDeliveries] = useState<IDeliveries[]>();
  const [notDeliverisSuport, setNotDeliverisSuport] = useState(false);
  const [isOnTheSpot, setIsOnTheSpot] = useState(false);
  const [isRateInstant, setIsRateInstant] = useState(false);

  const labelModalInstantRef = useRef<HTMLLabelElement>(null);
  const htmlForModalInstant = "courierInstant";

  const getDelivery = async (nameDelivery: string) => {
    setNotDeliverisSuport(false);
    setIsOnTheSpot(false);
    setIsRateInstant(false);
    if (nameDelivery.toLowerCase() === "instant") {
      // confirm("Apakah Titik koordinat anda sudah benar ?",);
      if (labelModalInstantRef.current instanceof HTMLElement) {
        labelModalInstantRef.current.click();
      }
      setIsRateInstant(true);
    }
    if (nameDelivery === "0") {
      setIsDeliveries([]);
      return;
    }
    if (nameDelivery === "1") {
      setIsDeliveries([]);
      setIsOnTheSpot(true);
      setIsInsurance(false);
      setIsDelivery({
        courier_hash: DELIVERY.manual,
        total_price: 0,
        insurance_fee: 0,
        must_use_insurance: false,
      });
      return;
    }
    handleRate(nameDelivery);
  };

  const handleRate = async (nameExpedition: string) => {
    setIsLoading(true);
    try {
      const response = await ApiAxios.post(`checkouts/shipping/rate`, {
        address_id: isDefaultAddress,
        expedition_type: nameExpedition.toLowerCase(),
      });
      const data = response.data.data;
      setIsDeliveries(data);
      if (data.length < 1) {
        setNotDeliverisSuport(true);
      }
      selectCourier();
    } catch (error: any) {
      if (error.response.data.errors) {
        Swal.fire(
          error.response.data.errors[0].message,
          "Perikasa Kembali Titik Koordinat Anda Sesuai Alamat Utama Anda",
          "error",
        );
      }
      console.log("getDelivery", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectCourier = (i: number = 0) => {
    if (isOnTheSpot) return;
    if (isDeliveries && isDeliveries?.length > 0) {
      setIsDelivery({
        courier_hash: isDeliveries[i].courier_hash,
        total_price: isDeliveries[i].total_price,
        insurance_fee: isDeliveries[i].insurance_fee,
        must_use_insurance: isDeliveries[i].must_use_insurance,
      });
      setIsLoading(false);
      return;
    }
    setIsDelivery({
      courier_hash: "",
      total_price: 0,
      insurance_fee: 0,
      must_use_insurance: true,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    address.map(item => {
      if (item.is_default) {
        setIsDefaultAddress(item.id);
      }
    });
    if (isDeliveries) {
      selectCourier();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isDeliveries]);

  const selectPayment = (id: number) => {
    const data = payments.find(item => item.id === id);
    if (data) {
      setIsPaymentSelect(data);
    }
  };

  return (
    <div className="w-full">
      <Card variant="border">
        <div className="pt-2 space-y-2">
          <p className="text-xl font-extrabold">Alamat Pengiriman</p>
          {address.map((item, idx) =>
            item.is_default ? (
              <Card key={idx} variant="border">
                <label
                  htmlFor="selectAddres"
                  className="relative flex items-center justify-between cursor-pointer"
                >
                  <div className="pr-5 space-y-2">
                    <p>
                      <span className="font-extrabold">{item.name}</span> -{" "}
                      {item.receiver}
                    </p>
                    <p>
                      {item.destination.direction}, {item.destination.address}
                      {", "}
                      {item.destination.area_name}
                      {", "}
                      {item.destination.suburb_name}
                      {", "}
                      {item.destination.city_name}
                      {", "}
                      {item.destination.province_name}
                      {", "}
                      {item.destination.postcode},{" "}
                      {item.destination.country_name}
                    </p>
                  </div>
                  <AiOutlineRight className="absolute right-0 text-xl max-w-min" />
                </label>
              </Card>
            ) : null,
          )}
        </div>
        <div className="pt-2 space-y-2">
          <p className="text-xl font-extrabold">Jasa Pengiriman</p>
          <div className="grid items-start gap-2 md:flex lg:grid xl:flex">
            {/* delivery type */}
            <label
              htmlFor={htmlForModalInstant}
              className="hidden"
              ref={labelModalInstantRef}
            />
            <div className="w-full form-control">
              <label className="label">
                <span className="label-text after:content-['*'] after:ml-2 after:text-red-500">
                  Pilih Type Pengiriman
                </span>
              </label>
              <select
                className="w-full overflow-hidden capitalize select select-bordered max-w-none"
                onChange={e => {
                  getDelivery(e.target.value);
                }}
              >
                <option value={"0"}>Pilih Type Pengiriman</option>
                <option value={"1"}>Ambil Ditempat</option>
                {expeditions.map((row, idx) => (
                  <option key={idx} value={row} className="capitalize">
                    {row}
                  </option>
                ))}
              </select>
              {fieldError.deliveryType && (
                <span className="mx-4 mt-2 text-xs text-red-500">
                  *Pilih Type Pengiriman
                </span>
              )}
              {isRateInstant && (
                <div className="flex items-center m-2">
                  <label
                    htmlFor={htmlForModalInstant}
                    className="flex items-center gap-2 text-sm transition-all duration-300 cursor-pointer "
                  >
                    <p className="text-brand hover:text-yellow-500">
                      Lihat Titik Koordinat
                    </p>
                  </label>
                </div>
              )}
              {isOnTheSpot && (
                <div className="m-2">
                  {isNote ? (
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor={htmlForModal}
                        className="flex items-center gap-2 transition-all duration-300 cursor-pointer "
                      >
                        <p className="text-brand hover:text-yellow-500">
                          Ubah Catatan :
                        </p>
                        <p className="text-sm opacity-75">{isNote}</p>
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor={htmlForModal}
                        className="flex items-center gap-2 transition-all duration-300 cursor-pointer"
                      >
                        <p className="text-brand hover:text-yellow-500 after:content-['*'] after:ml-2 after:text-red-500">
                          Catatan
                        </p>
                        <p className="text-sm opacity-75 border-b text-brand-muted/50 before:content-[':'] before:mr-2">
                          Nama Pemberi Barang
                        </p>
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* delivery service */}
            <div
              className={`w-full form-control ${
                isOnTheSpot && "opacity-60 relative"
              }`}
            >
              {isOnTheSpot && (
                <div className="absolute top-0 bottom-0 left-0 right-0" />
              )}
              <label className="flex items-center justify-between label">
                <span className="label-text after:content-['*'] after:ml-2 after:text-red-500">
                  Pilih Jasa Pengiriman
                </span>
                {notDeliverisSuport && (
                  <span className="mx-4 mt-2 text-xs font-bold text-red-500">
                    Jasa pengiriman tidak tersedia!
                  </span>
                )}
              </label>
              <select
                className="w-full overflow-hidden select select-bordered max-w-none"
                onChange={e => selectCourier(parseInt(e.target.value))}
              >
                {isDeliveries?.map((item, idx) => (
                  <option key={idx} value={idx}>
                    {`${item.logistic.name} - (${MoneyFormat(
                      item.total_price,
                    )})`}{" "}
                    estimasi{" "}
                    {item.min_day == item.max_day
                      ? item.max_day
                      : item.min_day + " - " + item.max_day}{" "}
                    Hari
                  </option>
                ))}
              </select>
              {fieldError.delivery && (
                <span className="mx-4 mt-2 text-xs text-red-500">
                  *Pilih Jasa Pengiriman
                </span>
              )}
              <div className="flex items-center justify-between w-full px-2">
                {!isOnTheSpot && (
                  <React.Fragment>
                    <label className="flex-row-reverse gap-2 cursor-pointer label max-w-max">
                      {isDelivery && isDelivery.must_use_insurance && (
                        <span className="text-xs text-red-500">
                          *Asuransi diperlukan
                        </span>
                      )}
                      <span className="mx-2 label-text">
                        Asuransi Pengiriman
                      </span>
                      <input
                        type="checkbox"
                        className="rounded-sm checkbox checkbox-success checkbox-sm"
                        checked={
                          (isDelivery && isDelivery.must_use_insurance) ||
                          isInsurance
                        }
                        onChange={e => setIsInsurance(e.target.checked)}
                        disabled={isDelivery && isDelivery.must_use_insurance}
                      />
                    </label>
                    <p className="font-extrabold">
                      {isDelivery
                        ? MoneyFormat(isDelivery?.insurance_fee)
                        : "Rp. -"}
                    </p>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* payment method */}
        <div className="pt-2 space-y-2">
          <div className="w-full form-control">
            <label className="label">
              <span className="label-text after:content-['*'] after:ml-2 after:text-red-500">
                Metode Pembayaran
              </span>
            </label>
            <select
              className="w-full overflow-hidden select select-bordered max-w-none"
              onChange={e => selectPayment(parseInt(e.target.value))}
            >
              <option value={"0"}>Pilih Metode Pembayaran</option>
              {payments?.map((item, idx) => (
                <option
                  key={idx}
                  value={item.id}
                >{`${item.name} - ${item.group}`}</option>
              ))}
            </select>
            {fieldError.payment && (
              <span className="mx-4 mt-2 text-xs text-red-500">
                *Pilih Metode Pembayaran
              </span>
            )}
          </div>

          {/* <Card variant="border" className="flex items-center ">
            <label
              htmlFor="payments"
              className="flex items-center justify-between w-full cursor-pointer"
            >
              <div className="flex items-center justify-between gap-4 min-h-6">
                <div className="w-8">
                  <Image src="/assets/images/payment/bca.png" alt="product" />
                </div>
                <p className="font-bold">BCA Virtual Account</p>
              </div>
              <AiOutlineRight className="text-xl min-w-max" />
            </label>
          </Card> */}
        </div>
      </Card>
      <ModalAddressSelect
        htmlFor="selectAddres"
        getCheckout={getCheckout}
        getDelivery={getDelivery}
      />
      <ModalPaymentsCheckout
        htmlFor="payments"
        payment={payments}
        getCheckout={getCheckout}
      />
      <ModalCheckoutPickUp setIsNote={setIsNote} htmlFor={htmlForModal} />
      {address.length > 0 && (
        <ModalMapCheckoutInstant
          htmlFor={htmlForModalInstant}
          address={address.find(item => item.is_default)!}
          getRate={handleRate}
        />
      )}
    </div>
  );
};
