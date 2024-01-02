import React, { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import Link from "next/link";
import { ADDRESS } from "@/constant/account";
import { ROUTES } from "@/constant/routes";
import { IAddress } from "@/types";
import { ApiAxios } from "@/helpers/axios";
import { useLayout } from "@/hooks/layouts";
import { useQuery } from "@/hooks/query";
import { useRouter } from "next/router";
interface IProps {
  htmlFor: string;
  toggleModal?: () => void;
  getCheckout: () => void;
  getDelivery?: (el: string) => void;
}
export const ModalAddressSelect = (props: IProps) => {
  const { getCheckout, getDelivery } = props;
  const router = useRouter();
  const { setIsIdAddress } = useQuery();
  const { setIsSuccess, setIsError, setIsMessage } = useLayout();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isAddresses, setAddresses] = useState<IAddress[]>([]);
  const myClose = useRef<HTMLLabelElement | null>(null);

  const handleSetAddressDefault = async (data: IAddress) => {
    const { id, destination, name, phone, receiver } = data;
    try {
      const response = await ApiAxios.patch(`/address/${id}`, {
        address: destination.address,
        area_id: destination.area_id,
        direction: destination.direction,
        lat: destination.lat,
        lng: destination.lng,
        name,
        phone,
        receiver,
        is_default: true,
      });
      const data = response.data;
      setIsSuccess(true);
      setIsMessage(data.message);
      getCheckout();
      getAddress();
    } catch (error: any) {
      console.log("handleSetAddressDefault", error);
      setIsError(true);
      setIsMessage("error");
    }
    if (myClose.current instanceof HTMLElement) {
      myClose.current.click();
    }
  };

  const getAddress = async () => {
    setIsloading(true);
    try {
      const respont = await ApiAxios.get(`/address`);
      const data = await respont.data.data;
      setAddresses(data);
      setIsloading(false);
    } catch (error) {
      console.log("getAddress", error);
      setIsloading(false);
    }
  };
  useEffect(() => {
    getAddress();
  }, []);

  const handleEdit = (el: string) => {
    setIsIdAddress(el);
    router.push(ROUTES.ADDRESS_EDIT);
  };

  return (
    <Modal htmlFor={props.htmlFor} className="w-11/12 max-w-2xl">
      <div className="text-center">
        <h3 className="text-lg font-bold">Pilih Addres</h3>
      </div>
      <label ref={myClose} htmlFor={props.htmlFor} className="hidden">
        Cancle
      </label>
      <div className="my-4">
        <div className="mt-4 mb-2">
          <Link href={ROUTES.ADDRESS_ADD}>
            <button className="w-full px-6 py-2 font-semibold text-center transition-all duration-300 border border-black rounded-md dark:border-white hover:bg-zinc-100 hover:text-zinc-900">
              Tambah
            </button>
          </Link>
        </div>
        <div className="mt-4 overflow-y-auto max-h-[28rem] no-scrollbar">
          {isAddresses.map((item, idx) => (
            <div key={idx} className="my-4">
              <div className="relative items-center p-4 overflow-hidden border rounded-lg md:flex">
                {item.is_default && (
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-brand" />
                )}
                <div className="grid w-full gap-3">
                  <p>
                    <span className="font-bold">{item.name}</span> -{" "}
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
                    {item.destination.postcode}, {item.destination.country_name}
                  </p>
                  <button
                    className="text-left transition-all duration-300 text-brand hover:text-yellow-500"
                    onClick={() => handleEdit(item.id.toString())}
                  >
                    Ubah Alamat
                  </button>
                </div>
                <div className="mx-auto my-4 w-full max-w-[15rem] flex justify-center md:justify-end items-center">
                  {item.is_default ? null : (
                    <button
                      className="px-4 py-3 text-white transition-all duration-300 bg-black rounded-xl hover:bg-brand-muted dark:border dark:border-white"
                      onClick={() => {
                        handleSetAddressDefault(item);
                        getDelivery && getDelivery("0");
                      }}
                    >
                      Pilih Alamat
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
