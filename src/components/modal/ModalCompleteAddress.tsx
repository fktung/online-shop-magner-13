import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { InputForm, TInputForm } from "../input";
import { t } from "i18next";
import { MapCoordinateForm } from "../maps";
import { ICoordinat, ICoordinatRegionDetail } from "@/types";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
} from "use-places-autocomplete";
import { ButtonBlack } from "../button";
import { useLayout } from "@/hooks/layouts";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";

interface IProps {
  htmlFor: string;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addResetInputs?: boolean;
  inputs: TInputForm;
  isCoordinat?: ICoordinat;
  setIsCoordinat: (props: ICoordinat) => void;
  isSaveAddress?: boolean;
  setIsSaveAddress?: (el: boolean) => void;
  setHandleError?: (e: any) => void;
  handleError?: any;
  isRegionDetail?: ICoordinatRegionDetail;
  // getCoordinat: (props: number) => void;
}

export const ModalCompleteAddress = (props: IProps) => {
  const {
    handleChange,
    addResetInputs,
    inputs,
    isCoordinat,
    setIsCoordinat,
    isSaveAddress,
    setIsSaveAddress,
    setHandleError,
    handleError,
    isRegionDetail,
  } = props;
  const { setIsMessage, setIsError } = useLayout();
  const [stepMap, setStepMap] = useState(false);
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);
  const [isAutocompleteNotMatch, setIsAutocompleteNotMatch] =
    useState<boolean>(false);
  const [selectCoordinat, setSelectCoordinat] = useState(isCoordinat);
  const [isPosCodeMatch, setIsPosCodeMatch] = useState<boolean>(true);
  const closeModal = useRef<HTMLLabelElement | null>(null);
  const {
    ready,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
    value,
  } = usePlacesAutocomplete({
    requestOptions: { region: "id", language: "id" },
  });

  useEffect(() => {
    setSelectCoordinat(isCoordinat);
  }, [isCoordinat]);

  const handleClick = async (
    dataAutocomplete: google.maps.places.AutocompletePrediction
  ) => {
    handleChange({
      target: {
        name: "address",
        value: dataAutocomplete.description,
      },
    } as ChangeEvent<HTMLInputElement>);
    const results = await getGeocode({ address: dataAutocomplete.description });
    const { lat, lng } = await getLatLng(results[0]);
    const zipCode = await getZipCode(results[0], true);
    setIsAutocompleteNotMatch(zipCode !== isRegionDetail?.postcode);
    setIsCoordinat({ lat, lng });
    clearSuggestions();
  };

  const chekHandleError = () => {
    let resultsError = false;
    if (!inputs.name) {
      setHandleError &&
        setHandleError((prev: any) => ({
          ...prev,
          name: "Label Harus di isi",
        }));
      resultsError = true;
    }
    if (!inputs.address) {
      setHandleError &&
        setHandleError((prev: any) => ({
          ...prev,
          address: "Alamat Harus di isi",
        }));
      resultsError = true;
    }
    if (!inputs.direction) {
      setHandleError &&
        setHandleError((prev: any) => ({
          ...prev,
          direction: "Detail Lainya Harus di isi",
        }));
      resultsError = true;
    }
    return resultsError;
  };

  const handleSubmit = () => {
    const check = chekHandleError();
    if (check) {
      setIsError(true);
      setIsMessage("lengkapi form yg kosong!");
      return;
    }
    if (isAutocompleteNotMatch) {
      setIsError(true);
      setIsMessage(
        "Alamat yang anda masukan tidak cocok dengan wilayah yang anda pilih!"
      );
      return;
    }
    if (!isPosCodeMatch) {
      Swal.fire({
        title: "Apakah Koordinat Sudah Sesuai?",
        text: "Koordinat tidak sesuai dengan sistem kami!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Sudah sesuai!",
        cancelButtonText: "Tidak Sesuai",
      }).then((result) => {
        if (result.isConfirmed) {
          approveZipCode();
        }
        return;
      });
    } else {
      approveZipCode();
    }
  };

  const approveZipCode = () => {
    selectCoordinat && setIsCoordinat(selectCoordinat);
    setIsSaveAddress && setIsSaveAddress(true);
    setStepMap(false);
    if (closeModal.current instanceof HTMLElement) {
      closeModal.current.click();
    }
  };

  const handleResetValueInput = () => {
    if (closeModal.current instanceof HTMLElement) {
      closeModal.current.click();
      setIsAutocompleteNotMatch(false);
    }
    if (addResetInputs && !isSaveAddress) {
      handleChange({
        target: {
          name: "address",
          value: "",
        },
      } as ChangeEvent<HTMLInputElement>);
      handleChange({
        target: {
          name: "direction",
          value: "",
        },
      } as ChangeEvent<HTMLInputElement>);
      handleChange({
        target: {
          name: "name",
          value: "",
        },
      } as ChangeEvent<HTMLInputElement>);
    }
  };

  const nextStep = () => {
    if (!inputs.address) {
      chekHandleError();
      return;
    }
    if (!inputs.direction) {
      chekHandleError();
      return;
    }
    if (!inputs.name) {
      chekHandleError();
      return;
    }
    handleSubmit();
    return;
    Swal.fire({
      title: "Apakah Alamat ini dipakai untuk Pengiriman Instant?",
      text: "Jika Anda mau menggunaka Pengiriman Instant Pilih Lanjut",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#000000",
      confirmButtonText: "Lewati Set-koordinat",
      cancelButtonText: "Iya, Lanjut",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit();
      } else {
        setStepMap(!stepMap);
      }
      return;
    });
  };

  return (
    <Modal htmlFor={props.htmlFor} className="w-11/12 max-w-2xl">
      <label ref={closeModal} htmlFor={props.htmlFor} className="hidden" />
      <div className="text-center">
        <h3 className="text-lg font-bold">Masukan Alamat Lengkap</h3>
      </div>
      <button
        onClick={handleResetValueInput}
        className="absolute cursor-pointer top-5 right-5"
      >
        <IoIosClose className="text-4xl" />
      </button>
      <div className="flex">
        <div
          className={`w-full  overflow-hidden ${
            !stepMap ? "max-w-full px-2" : "max-w-0"
          }`}
        >
          <div className="my-4">
            <div className="my-2 ">
              <div className="flex items-center justify-between">
                <p className="font-bold text-brand-muted dark:text-zinc-200">
                  {t("pages.verifcation.user.form.address")}
                </p>
                {data.length > 0 && isShowSuggestions && (
                  <button
                    className="relative min-w-[1rem] h-6 xs:flex items-center"
                    onClick={() => setIsShowSuggestions(false)}
                  >
                    <IoIosClose className="absolute top-0 bottom-0 text-3xl xs:inline xs:relative" />
                    <span className="hidden text-xs xs:inline">
                      Sembunyikan Suggestions
                    </span>
                  </button>
                )}
              </div>
              <div>
                <InputForm
                  type="text"
                  name="address"
                  value={inputs.address || ""}
                  disabled={!ready}
                  onChange={(e) => {
                    setValue(e.target.value);
                    handleChange(e);
                  }}
                  placeholder="misal (No rumah, detail jalan)"
                  className={
                    (handleError?.address || isAutocompleteNotMatch) &&
                    "ring-1 ring-red-400"
                  }
                >
                  {handleError?.address && (
                    <span className="text-xs text-red-500">
                      {handleError?.address}
                    </span>
                  )}
                  {isAutocompleteNotMatch && (
                    <span className="text-xs text-red-500">
                      Alamat anda tidak cocok dengan wilayah dipilih
                    </span>
                  )}
                  {isShowSuggestions && (
                    <div
                      className={`absolute z-50 bg-white left-0 right-0 my-2 rounded shadow-md transition-all duration-300 overflow-hidden ${
                        true ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="space-y-1 overflow-y-auto max-h-80">
                        {data.map((item, idx) => (
                          <button
                            key={idx}
                            className="w-full px-4 py-1 text-left transition-all duration-300 hover:bg-zinc-200"
                            onClick={() => handleClick(item)}
                          >
                            {item.description}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </InputForm>
              </div>
            </div>
          </div>
          <div className="my-4">
            <div className="my-2">
              <p className="font-bold text-brand-muted dark:text-zinc-200">
                Detail lainnya
              </p>
              <InputForm
                type="text"
                name="direction"
                value={inputs.direction || ""}
                onChange={handleChange}
                placeholder="misal (Contoh: Blok / Unit / Pagar coklat)"
                className={handleError?.direction && "ring-1 ring-red-400"}
              >
                {handleError?.direction && (
                  <span className="text-xs text-red-500">
                    {handleError?.direction}
                  </span>
                )}
              </InputForm>
            </div>
          </div>
          <div className="my-4">
            <div className="my-2">
              <p className="font-bold text-brand-muted dark:text-zinc-200">
                {t("pages.verifcation.user.form.placeLabel")}
              </p>
              <InputForm
                type="text"
                name="name"
                value={inputs.name || ""}
                onChange={handleChange}
                placeholder="misal (Rumah, Kantor, Kontrakan)"
                className={handleError?.name && "ring-1 ring-red-400"}
              >
                {handleError?.name && (
                  <span className="text-xs text-red-500">
                    {handleError?.name}
                  </span>
                )}
              </InputForm>
            </div>
          </div>
          <div className="flex justify-end">
            <ButtonBlack className="w-40" onClick={nextStep}>
              lanjut
            </ButtonBlack>
          </div>
        </div>

        {/* Maps Coordinat */}
        <div
          className={`w-full overflow-hidden ${
            stepMap ? "max-w-full relative" : "max-w-0"
          }`}
        >
          <div
            className={`my-4 h-96 ${
              !isPosCodeMatch && "border border-red-500"
            }`}
          >
            {!isPosCodeMatch && (
              <p
                className={`mx-auto text-xs text-center text-red-500 ${
                  stepMap && "absolute top-0 left-0 right-0"
                }`}
              >
                Koordinat tidak cocok dengan wilayah yg di pilih
              </p>
            )}
            <MapCoordinateForm
              setSelectCoordinat={setSelectCoordinat}
              setIsCoordinat={setIsCoordinat}
              coordinat={isCoordinat}
              markerShow={isCoordinat && true}
              isRegionDetail={isRegionDetail}
              setIsPosCodeMatch={setIsPosCodeMatch}
            />
          </div>
          <div className="flex justify-between my-4">
            <ButtonBlack
              className="w-40"
              onClick={() => {
                setStepMap(!stepMap);
              }}
            >
              Sebelumnya
            </ButtonBlack>
            <ButtonBlack
              onClick={handleSubmit}
              type={"button"}
              className={`w-40 ${
                inputs.address && inputs.name
                  ? ""
                  : "bg-zinc-700 hover:bg-zinc-700 cursor-not-allowed"
              }`}
            >
              Submit
            </ButtonBlack>
          </div>
        </div>
      </div>
    </Modal>
  );
};
