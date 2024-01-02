import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { t } from "i18next";
import { useRouter } from "next/router";
import { IArea, ICoordinat, IRegion } from "@/types";
import { TInputForm } from "../input";
import { ApiAxios } from "@/helpers/axios";
import { WidgetWilayahSekectAddres } from "../widgets";

interface IProps {
  htmlFor: string;
  getCoordinat: (props: number) => void;
  // setIsCoordinat: (props: ICoordinat) => void;
  // toggleModal?: () => void;
  // getCheckout: () => void;
}
export const ModalWilayahAddress = (props: IProps) => {
  const { getCoordinat } = props;
  const router = useRouter();
  const myClose = useRef<HTMLLabelElement | null>(null);

  const [isProvince, setIsProvince] = useState<IRegion[]>([]);
  const [isProvinceFil, setIsProvinceFil] = useState<IRegion[]>([]);
  const [isProvinceOpen, setIsProvinceOpen] = useState(false);
  const [isProvinceName, setIsProvinceName] =
    useState<string>("Pilih Province");

  const [isCities, setIsCities] = useState<IRegion[]>([]);
  const [isCitiesFil, setIsCitiesFil] = useState<IRegion[]>([]);
  const [isCitiesOpen, setIsCitiesOpen] = useState(false);
  const [isCitiesName, setIsCitiesName] = useState<string>(
    "Pilih Kota/Kabupaten",
  );

  const [isSuburbs, setIsSuburbs] = useState<IRegion[]>([]);
  const [isSuburbsFil, setIsSuburbsFil] = useState<IRegion[]>([]);
  const [isSuburbsOpen, setIsSuburbsOpen] = useState(false);
  const [isSuburbsName, setIsSuburbsName] = useState<string>("Pilih Kecamatan");

  const [isAreas, setIsAreas] = useState<IArea[]>([]);
  const [isAreasFil, setIsAreasFil] = useState<IArea[]>([]);
  const [isAreasOpen, setIsAreasOpen] = useState(false);
  const [isAreasName, setIsAreasName] = useState<string>("Pilih Desa");

  const resetWilayah = () => {
    setIsProvinceName("Pilih Province");
    setIsCities([]);
    setIsCitiesName("Pilih Kota/Kabupaten");
    setIsSuburbs([]);
    setIsSuburbsName("Pilih Kecamatan");
    setIsAreas([]);
    setIsAreasName("Pilih Desa");
  };

  const closeSelectAll = () => {
    setIsProvinceOpen(false);
    setIsCitiesOpen(false);
    setIsSuburbsOpen(false);
    setIsAreasOpen(false);
  };

  const getProvince = async () => {
    try {
      const respont = await ApiAxios.get("/regions/province");
      const data = await respont.data.data;
      setIsProvince(Object.values(data));
      setIsProvinceFil(Object.values(data));
    } catch (error) {
      console.log("getProvince", error);
    }
  };
  const getCities = async (idx: number) => {
    try {
      const respont = await ApiAxios.get(`/regions/province/${idx}/cities`);
      const data = await respont.data.data;
      setIsCities(Object.values(data));
      setIsCitiesFil(Object.values(data));
    } catch (error) {
      console.log("getCities", error);
    }
  };
  const getSuburbs = async (idx: number) => {
    try {
      const respont = await ApiAxios.get(`/regions/city/${idx}/suburbs`);
      const data = await respont.data.data;
      setIsSuburbs(Object.values(data));
      setIsSuburbsFil(Object.values(data));
    } catch (error) {
      console.log("getSuburbs", error);
    }
  };
  const getAreas = async (idx: number) => {
    try {
      const respont = await ApiAxios.get(`/regions/suburb/${idx}/areas`);
      const data = await respont.data.data;
      setIsAreas(Object.values(data));
      setIsAreasFil(Object.values(data));
    } catch (error) {
      console.log("getAreas", error);
    }
  };

  useEffect(() => {
    if (isProvince.length === 0) {
      getProvince();
      return;
    }
  }, [isProvince]);

  const filterInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.toLocaleLowerCase() === "province") {
      setIsProvinceFil(
        isProvince.filter(item =>
          item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
        ),
      );
      return;
    }
    if (name.toLocaleLowerCase() === "cities") {
      setIsCitiesFil(
        isCities.filter(item =>
          item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
        ),
      );
      return;
    }
    if (name.toLocaleLowerCase() === "suburbs") {
      setIsSuburbsFil(
        isSuburbs.filter(item =>
          item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
        ),
      );
      return;
    }
    if (name.toLocaleLowerCase() === "areas") {
      setIsAreasFil(
        isAreas.filter(item =>
          item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
        ),
      );
      return;
    }
  };
  return (
    <Modal htmlFor={props.htmlFor} className="w-11/12 max-w-2xl">
      <label ref={myClose} htmlFor={props.htmlFor} className="hidden"></label>
      <div className="min-h-[80vh]">
        <div className="absolute top-6 left-6">
          <button className="font-bold text-red-500" onClick={resetWilayah}>
            Atur Ulang
          </button>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold">Pilih Wilayah</h3>
        </div>

        {/* province */}
        <WidgetWilayahSekectAddres
          isName={isProvinceName}
          isOpen={isProvinceOpen}
          setIsOpen={() => {
            closeSelectAll();
            setIsProvinceOpen(true);
          }}
          inputName="Province"
          filterInput={filterInput}
        >
          <ul className="list-reset">
            {isProvinceFil.length > 0 &&
              isProvinceFil.map((item, idx) => (
                <li key={idx}>
                  <button
                    className="block w-full p-2 text-left text-black cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setIsProvinceName(item.name);
                      setIsProvinceOpen(!isProvinceOpen);
                      getCities(item.id);
                      setIsCities([]);
                      setIsSuburbs([]);
                      setIsAreas([]);
                    }}
                  >
                    <p>{item.name}</p>
                  </button>
                </li>
              ))}
          </ul>
        </WidgetWilayahSekectAddres>

        {/* cities */}
        {isCities.length > 0 && (
          <WidgetWilayahSekectAddres
            isName={isCitiesName}
            isOpen={isCitiesOpen}
            setIsOpen={() => {
              closeSelectAll();
              setIsCitiesOpen(true);
            }}
            inputName="cities"
            filterInput={filterInput}
          >
            <ul className="list-reset">
              {isCitiesFil.length > 0 &&
                isCitiesFil.map((item, idx) => (
                  <li key={idx}>
                    <button
                      className="block w-full p-2 text-left text-black cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setIsCitiesName(item.name);
                        setIsCitiesOpen(!isCitiesOpen);
                        getSuburbs(item.id);
                      }}
                    >
                      <p>{item.name}</p>
                    </button>
                  </li>
                ))}
            </ul>
          </WidgetWilayahSekectAddres>
        )}

        {/* subdistrict */}
        {isSuburbs.length > 0 && (
          <WidgetWilayahSekectAddres
            isName={isSuburbsName}
            isOpen={isSuburbsOpen}
            setIsOpen={() => {
              closeSelectAll();
              setIsSuburbsOpen(true);
            }}
            inputName="Suburbs"
            filterInput={filterInput}
          >
            <ul className="list-reset">
              {isSuburbsFil.length > 0 &&
                isSuburbsFil.map((item, idx) => (
                  <li key={idx}>
                    <button
                      className="block w-full p-2 text-left text-black cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setIsSuburbsName(item.name);
                        setIsSuburbsOpen(!isSuburbsOpen);
                        getAreas(item.id);
                      }}
                    >
                      <p>{item.name}</p>
                    </button>
                  </li>
                ))}
            </ul>
          </WidgetWilayahSekectAddres>
        )}

        {/* areas */}
        {isAreas.length > 0 && (
          <WidgetWilayahSekectAddres
            isName={isAreasName}
            isOpen={isAreasOpen}
            setIsOpen={() => {
              closeSelectAll();
              setIsAreasOpen(true);
            }}
            inputName="Areas"
            filterInput={filterInput}
          >
            <ul className="list-reset">
              {isAreasFil.length > 0 &&
                isAreasFil.map((item, idx) => (
                  <li key={idx}>
                    <button
                      className="block w-full p-2 text-left text-black cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setIsAreasName(item.name);
                        setIsAreasOpen(!isAreasOpen);
                        if (myClose.current instanceof HTMLElement) {
                          myClose.current.click();
                        }
                        getCoordinat(item.id);
                      }}
                    >
                      <p>{item.name}</p>
                    </button>
                  </li>
                ))}
            </ul>
          </WidgetWilayahSekectAddres>
        )}
      </div>
    </Modal>
  );
};
