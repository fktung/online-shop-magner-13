import { TInputForm } from "@/components/input";
import { ApiAxios } from "@/helpers/axios";
import { IAccountBank } from "@/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { LoadingLoadData } from "../../loading";

export const SectionAccountBank = () => {
  const [isAccountBank, setIsAccountBank] = useState<IAccountBank>();
  const [isEdit, setIsEdit] = useState(false);
  const [inputs, setInputs] = useState<TInputForm>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs(values => ({ ...values, [name]: value }));
  };
  const onEdit = () => {
    setIsEdit(!isEdit);
  };

  const onCancel = () => {
    setIsEdit(!isEdit);
    // setInputs();
  };

  const getAccountBank = async () => {
    try {
      const response = await ApiAxios.get(`/membership`);
      const data = response.data.data;
      setInputs(data);
    } catch (error: any) {
      console.log("getAccountBank", error);
    }
  };

  useEffect(() => {
    getAccountBank();
  }, []);

  if (!inputs) {
    return <LoadingLoadData />;
  }

  return (
    <div className="mx-auto w-full max-w-[320px] sm:max-w-max lg:max-w-full">
      <div className="flex justify-between px-3 py-2">
        <div className="pb-2 min-w-max">
          <h3 className="text-xl font-bold">Akun Bank</h3>
        </div>
        <div className="justify-end hidden w-full gap-4 md:flex">
          {/* {isEdit ? (
            <div className="flex justify-end w-full gap-4">
              <button
                onClick={onCancel}
                className="px-6 font-semibold text-center transition-all duration-300 border border-black rounded-md w-36 hover:bg-zinc-100 dark:border-white"
              >
                Batal
              </button>
              <button
                onClick={onEdit}
                className="px-6 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md w-36 hover:bg-zinc-800"
              >
                Simpan
              </button>
            </div>
          ) : (
            <button
              onClick={onEdit}
              className="px-6 font-semibold text-center transition-all duration-300 border border-black rounded-md w-36 hover:bg-zinc-100 dark:border-white"
            >
              Ubah
            </button>
          )} */}

          {/* <button className="px-6 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md w-36 hover:bg-zinc-800">
                btn2
              </button> */}
        </div>
      </div>
      <div className="items-start sm:p-4 xl:flex">
        <div className="grid w-full min-w-full gap-8 xl:min-w-min">
          <div className="items-center sm:flex sm:gap-8">
            <p className="min-w-[11rem] sm:text-right">Nama Pemilik Rekening</p>
            <input
              type="text"
              name="owner"
              value={inputs.owner || ""}
              className={`w-full px-4 py-3 rounded-xl bg-transparent ${
                isEdit ? "border" : ""
              }`}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
          <div className="items-center sm:flex sm:gap-8">
            <p className="min-w-[11rem] sm:text-right">Nama Bank</p>
            <input
              type="text"
              name="bank_name"
              value={inputs.bank_name || ""}
              className={`w-full px-4 py-3 rounded-xl bg-transparent ${
                isEdit ? "border" : ""
              }`}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
          <div className="items-center sm:flex sm:gap-8">
            <p className="min-w-[11rem] sm:text-right">Nomor Rekening</p>
            <input
              type="text"
              name="account_number"
              value={inputs.account_number || ""}
              className={`w-full px-4 py-3 rounded-xl bg-transparent ${
                isEdit ? "border" : ""
              }`}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end min-h-[2rem] w-full gap-4 my-4 md:hidden">
        {/* {isEdit ? (
          <div className="flex justify-end w-full gap-4">
            <button
              onClick={onEdit}
              className="px-6 font-semibold text-center transition-all duration-300 border border-black rounded-md w-36 hover:bg-zinc-100 dark:border-white"
            >
              Batal
            </button>
            <button
              onClick={onEdit}
              className="px-6 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md w-36 hover:bg-zinc-800"
            >
              Simpan
            </button>
          </div>
        ) : (
          <button
            onClick={onEdit}
            className="px-6 font-semibold text-center transition-all duration-300 border border-black rounded-md w-36 hover:bg-zinc-100 dark:border-white"
          >
            Ubah
          </button>
        )} */}
      </div>
    </div>
  );
};
