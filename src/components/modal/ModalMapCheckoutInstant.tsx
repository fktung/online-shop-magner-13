import React, { useRef, useState } from "react";
import { Modal } from "./Modal";
import { MapCoordinateForm } from "../maps";
import { IAddress, ICoordinat } from "@/types";
import { ApiAxios } from "@/helpers/axios";
import { useLayout } from "@/hooks/layouts";
import { ButtonBlack } from "../button";

type TModalMapCheckoutInstantProps = {
  htmlFor: string;
  address: IAddress;
  getRate: (name: string) => void;
};

export const ModalMapCheckoutInstant = (
  props: TModalMapCheckoutInstantProps
) => {
  const { htmlFor, address, getRate } = props;
  const [isAddress, setIsAddress] = useState<IAddress>();
  const closeModal = useRef<HTMLLabelElement | null>(null);
  const { setIsSuccess, setIsError, setIsMessage } = useLayout();
  const [isCoordinat, setIsCoordinat] = useState<ICoordinat>({
    lat: +address.destination.lat,
    lng: +address.destination.lng,
  });
  const [selectCoordinat, setSelectCoordinat] = useState<ICoordinat>({
    lat: +address.destination.lat,
    lng: +address.destination.lng,
  });

  const handleUpdateCoordinate = async () => {
    const { id, destination, name, phone, receiver, is_default } = address;
    if (
      selectCoordinat.lat == destination.lat &&
      selectCoordinat.lng == destination.lng
    ) {
      handleCloseModal();
      return;
    }
    try {
      await ApiAxios.patch(`/address/${id}`, {
        address: destination.address,
        area_id: destination.area_id,
        direction: destination.direction,
        lat: selectCoordinat.lat.toString(),
        lng: selectCoordinat.lng.toString(),
        name,
        phone,
        receiver,
        is_default,
      });
      handleCloseModal();
      setIsSuccess(true);
      setIsMessage("Titik Koordinat Berhasih Diupdate");
      getRate("instant");
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsMessage("error");
    }
  };

  const handleCloseModal = () => {
    if (closeModal.current instanceof HTMLElement) {
      closeModal.current.click();
    }
  };

  return (
    <Modal htmlFor={htmlFor} className="w-11/12 max-w-2xl">
      <div className="text-center">
        <label ref={closeModal} htmlFor={props.htmlFor} className="hidden" />
        <h3 className="text-lg font-bold">
          Apakah Titik Koordinat Sudah Benar
        </h3>
      </div>
      <div className={`my-4 h-96`}>
        <MapCoordinateForm
          setSelectCoordinat={setSelectCoordinat}
          setIsCoordinat={setIsCoordinat}
          coordinat={isCoordinat}
          markerShow={isCoordinat && true}
        />
      </div>
      <div>
        {selectCoordinat.lat == address.destination.lat &&
        selectCoordinat.lng == address.destination.lng ? (
          <ButtonBlack onClick={handleCloseModal}>Oke</ButtonBlack>
        ) : (
          <ButtonBlack onClick={handleUpdateCoordinate}>Simpan</ButtonBlack>
        )}
      </div>
    </Modal>
  );
};
