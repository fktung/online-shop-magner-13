import { WidgetQrcodeGenerate, WidgetShareSosmed } from "@/components/widgets";
import { REGISTER_REFERRAL } from "@/constant/account";
import { ApiAxios } from "@/helpers/axios";
import { Capitalize } from "@/helpers/common";
import { useAuth } from "@/hooks/auth";
import { useLayout } from "@/hooks/layouts";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import Swal from "sweetalert2";

export const MembershipSectionEditRef = () => {
  const { isReferral_code, getMeCheck, isReferral_edit } = useAuth();
  const { setIsError, setIsSuccess, setIsMessage } = useLayout();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReferral, setIsReferral] = useState("");
  const [isReferralErr, setIsReferralErr] = useState(false);
  const [isReferralErrChar, setIsReferralErrChar] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const codeNotMagner = () => {
    setIsError(true);
    setIsMessage(
      "Kode Referral Tidak Boleh Mengandung Unsur MAGNER / MAGNERCARE",
    );
  };

  const onCancel = () => {
    setIsEdit(!isEdit);
    setIsReferral(isReferral_code);
    setIsReferralErr(false);
  };
  const updateRef = async () => {
    try {
      const response = await ApiAxios.patch(`/user/referral`, {
        referral_code: isReferral,
      });
      setIsSuccess(true);
      setIsMessage(response.data.message);
      if (response.data.status_code === 200) {
        getMeCheck();
      }
      setIsLoading(false);
      setIsEdit(false);
    } catch (error: any) {
      console.log("updateRef", error.response.data.errors);
      codeNotMagner();
      setIsLoading(false);
    }
  };
  const pattern = /^[A-Z0-9]{6,12}$/;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsReferral(e.target.value.toLocaleUpperCase());
    const value = e.target.value.toLocaleUpperCase();
    if (value.length >= 6 && value.length <= 12) {
      setIsReferralErrChar(false);
    } else {
      setIsReferralErrChar(true);
    }
    if (!pattern.test(value)) {
      setIsReferralErr(true);
      return;
    }
    setIsReferralErr(false);
  };
  const handleSave = async () => {
    if (!pattern.test(isReferral)) {
      setIsReferralErr(true);
      return;
    }
    if (isReferral === isReferral_code) {
      setIsError(true);
      setIsMessage("Kode Referral Sudah kamu pakai");
      return;
    }
    if (isReferral.toUpperCase().includes("MAGNER")) {
      codeNotMagner();
      return;
    }
    setIsLoading(true);
    try {
      const response = await ApiAxios.post(`/user/referral/check`, {
        referral_code: isReferral,
      });
      if (response.data.data) {
        updateRef();
        return;
      }
      setIsError(true);
      setIsMessage("Kode Referral Sudah di pakai");
      setIsLoading(false);
    } catch (error: any) {
      console.log("handleSave", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsReferral(isReferral_code);
  }, [isReferral_code]);

  const handleCopy = () => {
    const { origin } = window.location;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(origin + REGISTER_REFERRAL + isReferral_code)
        .then(() => {
          // setIsSuccess(true);
          // setIsMessage("Berhasil menyalin ke clipboard");
          setIsCopy(true);
        })
        .catch(error => {
          setIsError(true);
          setIsMessage("Gagal menyalin ke clipboard");
          console.error("Error copying to clipboard:", error);
        });
    } else {
      setIsError(true);
      setIsMessage("Clipboard tidak didukung di browser ini");
    }
  };

  const handleConfrmEdit = () => {
    Swal.fire({
      title: `Kode Referral saat ini ${isReferral}`,
      text: Capitalize(
        "Kode Referral hanya bisa diubah 1 (Satu) kali saja. Mohon pikirkan dengan baik saat memilih kode Referral",
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Lanjut",
    }).then(result => {
      if (result.isConfirmed) {
        setIsEdit(!isEdit);
      }
    });
  };

  return (
    <div className="lg:max-w-xl">
      <div className="relative flex items-center sm:gap-4">
        <p className="min-w-max xl:min-w-[8rem] text-left text-base font-bold">
          Kode Referral :
        </p>
        <div className="w-full max-w-xs pl-2">
          <input
            type="text"
            name="owner"
            value={isReferral}
            className={`w-full px-2 py-1 mb-1 rounded-md focus:outline-none ${
              isEdit ? "border border-black" : "bg-transparent"
            }`}
            onChange={handleChange}
            disabled={!isEdit}
          />
        </div>
      </div>
      <label className="w-full pt-2">
        <p className="text-xs text-left break-words">
          <span className="inline-block mr-2 font-bold">Link Referral:</span>
          <br className="xs:hidden" />
          <span className="inline-block">
            {window.location.host + REGISTER_REFERRAL + isReferral}
          </span>
        </p>
      </label>
      {isReferralErr && (
        <label className="w-full label">
          <span className="mx-auto text-red-500 label-text-alt">
            Harus huruf besar A-Z kobinasi angka 0-9
            <br />
            {isReferralErrChar && "Minim 6 - 12 character"}
          </span>
        </label>
      )}
      <div className="flex flex-wrap justify-center w-full gap-4 mt-4 xs:justify-end">
        {isEdit ? (
          !isReferral_edit && (
            <>
              <button
                disabled={isLoading}
                onClick={onCancel}
                className="px-4 py-1 font-semibold text-center transition-all duration-300 border border-black rounded-md hover:bg-zinc-100 dark:border-white"
              >
                {isLoading ? (
                  <span className="loading loading-spinner text-warning"></span>
                ) : (
                  `Batal`
                )}
              </button>
              <button
                disabled={isLoading || isReferralErr}
                onClick={handleSave}
                className={`px-4 py-1 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md hover:bg-zinc-800 ${
                  isReferralErr && "cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <span className="loading loading-spinner text-warning"></span>
                ) : (
                  `Simpan`
                )}
              </button>
            </>
          )
        ) : (
          <>
            {!isReferral_edit && (
              <button
                onClick={handleConfrmEdit}
                className="px-4 py-1 font-semibold text-center transition-all duration-300 border border-black rounded-md hover:bg-zinc-100 dark:border-white"
              >
                Ubah
              </button>
            )}
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1 px-4 py-1 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md hover:bg-zinc-800 ${
                isCopy && "tooltip tooltip-open"
              }`}
              data-tip="Tersalin"
            >
              <FaRegCopy /> Salin
            </button>
            <WidgetShareSosmed />
            {isReferral_edit && <WidgetQrcodeGenerate />}
          </>
        )}
      </div>
    </div>
  );
};
