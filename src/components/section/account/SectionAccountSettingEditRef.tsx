import { ApiAxios } from "@/helpers/axios";
import { useAuth } from "@/hooks/auth";
import { useLayout } from "@/hooks/layouts";
import React, { ChangeEvent, useEffect, useState } from "react";

export const SectionAccountSettingEditRef = () => {
  const { isReferral_code, getMeCheck } = useAuth();
  const { setIsError, setIsSuccess, setIsMessage } = useLayout();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefferal, setIsRefferal] = useState("");
  const [isRefferalErr, setIsRefferalErr] = useState(false);
  const [isRefferalErrChar, setIsRefferalErrChar] = useState(false);
  const onEdit = () => {
    setIsEdit(!isEdit);
  };
  const onCancel = () => {
    setIsEdit(!isEdit);
    setIsRefferal(isReferral_code);
    setIsRefferalErr(false);
  };
  const updateRef = async () => {
    try {
      const response = await ApiAxios.patch(`/user/referral`, {
        referral_code: isRefferal,
      });
      setIsSuccess(true);
      setIsMessage(response.data.message);
      getMeCheck();
      setIsLoading(false);
      setIsEdit(false);
    } catch (error: any) {
      console.log("updateRef", error);
      setIsLoading(false);
    }
  };
  const pattern = /^[A-Z0-9]{6,12}$/;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsRefferal(e.target.value);
    const value = e.target.value;
    if (value.length >= 6 && value.length <= 12) {
      setIsRefferalErrChar(false);
    } else {
      setIsRefferalErrChar(true);
    }
    if (!pattern.test(value)) {
      setIsRefferalErr(true);
      return;
    }
    setIsRefferalErr(false);
  };
  const handleSave = async () => {
    if (!pattern.test(isRefferal)) {
      setIsRefferalErr(true);
      return;
    }
    if (isRefferal === isReferral_code) {
      setIsError(true);
      setIsMessage("Kode Refferal Sudah kamu pakai");
      return;
    }
    setIsLoading(true);
    try {
      const response = await ApiAxios.post(`/user/referral/check`, {
        referral_code: isRefferal,
      });
      if (response.data.data) {
        updateRef();
        return;
      }
      setIsError(true);
      setIsMessage("Kode Refferal Sudah di pakai");
      setIsLoading(false);
    } catch (error: any) {
      console.log("handleSave", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsRefferal(isReferral_code);
  }, [isReferral_code]);
  return (
    <div className="p-4 mx-auto rounded-lg shadow-lg lg:max-w-xl">
      <div className="flex items-center justify-between px-3 pb-4">
        <div className="min-w-max">
          <h3 className="text-xl font-bold">Kode Refferal</h3>
        </div>
        <div className="justify-end hidden w-full gap-4 xl:flex sm:flex lg:hidden">
          {isEdit ? (
            <div className="flex justify-end w-full gap-4">
              <button
                disabled={isLoading}
                onClick={onCancel}
                className="px-6 font-semibold text-center transition-all duration-300 border border-black rounded-md hover:bg-zinc-100 dark:border-white"
              >
                {isLoading ? (
                  <span className="loading loading-spinner text-warning"></span>
                ) : (
                  `Batal`
                )}
              </button>
              <button
                disabled={isLoading}
                onClick={handleSave}
                className="px-6 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md hover:bg-zinc-800"
              >
                {isLoading ? (
                  <span className="loading loading-spinner text-warning"></span>
                ) : (
                  `Simpan`
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={onEdit}
              className="px-6 font-semibold text-center transition-all duration-300 border border-black rounded-md w-36 hover:bg-zinc-100 dark:border-white"
            >
              Ubah
            </button>
          )}
        </div>
      </div>
      <div className="items-start sm:flex sm:gap-8">
        <p className="min-w-max xl:min-w-[8rem] pt-3 sm:text-right">
          Refferal :
        </p>
        <div className="w-full max-w-xs form-control">
          <input
            type="text"
            name="owner"
            value={isRefferal}
            className={`w-full px-4 py-3 rounded-xl bg-transparent ${
              isEdit ? "border" : ""
            }`}
            onChange={handleChange}
            disabled={!isEdit}
          />
          <label className="label">
            {isRefferalErr && (
              <span className="text-red-500 label-text-alt">
                Harus huruf besar A-Z kobinasi angka 0-9
                <br />
                {isRefferalErrChar && "Minim 6 - 12 character"}
              </span>
            )}
          </label>
        </div>
      </div>
      <div className="flex justify-end w-full gap-4 mt-4 xl:hidden sm:hidden lg:flex">
        {isEdit ? (
          <div className="flex justify-end w-full gap-4">
            <button
              disabled={isLoading}
              onClick={onCancel}
              className="px-6 font-semibold text-center transition-all duration-300 border border-black rounded-md hover:bg-zinc-100 dark:border-white"
            >
              {isLoading ? (
                <span className="loading loading-spinner text-warning"></span>
              ) : (
                `Batal`
              )}
            </button>
            <button
              disabled={isLoading}
              onClick={handleSave}
              className="px-6 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md hover:bg-zinc-800"
            >
              {isLoading ? (
                <span className="loading loading-spinner text-warning"></span>
              ) : (
                `Simpan`
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={onEdit}
            className="px-6 font-semibold text-center transition-all duration-300 border border-black rounded-md w-36 hover:bg-zinc-100 dark:border-white"
          >
            Ubah
          </button>
        )}
      </div>
    </div>
  );
};
