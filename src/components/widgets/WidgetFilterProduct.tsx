import React, { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { TInputForm } from "../input";
import { ApiAxios } from "@/helpers/axios";
import { IPagination, IProducts } from "@/types";
import { ButtonBlack } from "../button";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/constant/routes";
import { useProduct } from "@/hooks/hookProduct";

interface IWidgetFilterProductProps {
  inputs: TInputForm;
  setInputs: (props: TInputForm) => void;
  handleChange: (props: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  filterPrice: (props: string) => void;
  setisProducts: (props: IProducts[]) => void;
  setisPagination: (props: IPagination) => void;
  isLimit: string;
  setIsPage: (props: string) => void;
}

export const WidgetFilterProduct = ({
  inputs,
  setInputs,
  handleChange,
  handleSubmit,
  filterPrice,
  setisProducts,
  setisPagination,
  isLimit,
}: IWidgetFilterProductProps) => {
  const router = useRouter();
  const query = useSearchParams();
  const { setKeySearch } = useProduct();
  const [isShowWidget, SetIsShowWidget] = useState(false);
  const handleOpenWidget = () => {
    SetIsShowWidget(!isShowWidget);
    filterPrice("");
  };
  const resetFilter = async () => {
    if (query.get("search")) {
      router.push(ROUTES.PRODUCTS);
      return;
    }
    try {
      router.replace(ROUTES.PRODUCTS);
      const response = await ApiAxios.get(
        `/products?page=${"1"}&limit=${isLimit}`
      );
      const data = await response.data;
      setisProducts(data.data);
      setisPagination(data.metadata);
    } catch (error: any) {
      console.log("resetFilter", error);
    }
  };
  const handleResetFilter = () => {
    setInputs({});
    filterPrice("");
    SetIsShowWidget(false);
    resetFilter();
    setKeySearch("");
  };
  return (
    <div className="relative">
      <div className="flex justify-between p-2 font-semibold max-w-[17rem]">
        <p className="hidden xl:block">Filter</p>
        <p className="cursor-pointer xl:hidden" onClick={handleOpenWidget}>
          Filter
        </p>
        <button className="text-red-500" onClick={handleResetFilter}>
          Reset
        </button>
      </div>
      <div
        className={`absolute mt-2 xl:static px-4 xl:py-4 rounded-lg shadow-xl w-full max-w-[17rem] bg-white dark:bg-dark dark:shadow-zinc-800 overflow-hidden transition-all duration-200 z-20 ${
          isShowWidget ? "h-80 xl:h-full py-4 xl:py-0" : "h-0 xl:h-full"
        }`}
      >
        {/* <div className="flex items-center justify-between font-bold">
          <h4>Kategory</h4>
          <i>
            <AiOutlineDown />
          </i>
        </div> */}
        {/* <div className="p-2 ml-2 space-y-2">
          <p>Perawatan Motor</p>
          <p>Perawatan Mobil</p>
          <p>Perawatan Rumah</p>
          <p>Perawatan Furniture</p>
        </div> */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between font-bold">
            <h4>Kategory</h4>
            <i>
              <AiOutlineDown />
            </i>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-2 pr-4 ml-2 space-y-4">
              <div className="w-full form-control">
                <label className="input-group input-group-sm">
                  <span>RP</span>
                  <input
                    type="text"
                    name="pmin"
                    value={inputs.pmin || ""}
                    onChange={handleChange}
                    placeholder="Minimum"
                    className="w-full input input-bordered input-sm focus:outline-none"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="input-group input-group-sm">
                  <span>RP</span>
                  <input
                    type="text"
                    name="pmax"
                    value={inputs.pmax || ""}
                    onChange={handleChange}
                    placeholder="Maxsimal"
                    className="w-full input input-bordered input-sm focus:outline-none"
                  />
                </label>
              </div>
              <ButtonBlack type="submit" className="w-full">
                Filter harga
              </ButtonBlack>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
