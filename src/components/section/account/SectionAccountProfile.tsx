import { ButtonBlack } from "@/components/button";
import { Layout, LayoutDashboard, LayoutV2 } from "@/components/layout";
import { LoadingLoadData } from "@/components/loading";
import { Image } from "@/components/utility";
import { ApiAxios } from "@/helpers/axios";
import { useAuth } from "@/hooks/auth";
import { useLayout } from "@/hooks/layouts";
import { useUser } from "@/hooks/user";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { RiFileCopyLine } from "react-icons/ri";

export const SectionAccountProfile = () => {
  const { isName, isEmail, isPhone, isReferral_code } = useAuth();
  const { isStatusMembership, isAvatar, setIsAvatar } = useUser();
  const { setIsSuccess, setIsMessage, setIsError } = useLayout();
  const [isCopy, setIsCopy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | undefined>(undefined);
  const [isErrFile, setIsErrFile] = useState<{ error: string } | undefined>();
  const [photo, setPhoto] = useState<File>();
  const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsErrFile(undefined);
      const selectedFile = e.target.files[0];
      const typeImg = selectedFile.type.split("/")[1];
      const validationType = ["jpg", "jpeg", "png", "webp"].includes(typeImg);
      if (!validationType) {
        setIsErrFile({ error: "File yang anda upload bukan gambar !" });
      }
      setPreviewImg(URL.createObjectURL(selectedFile));
      setPhoto(selectedFile);
      // setInputs(values => ({ ...values, files: selectedFile }));
    }
  };

  const saveAvatar = async () => {
    if (isErrFile?.error) {
      setIsError(true);
      setIsMessage(isErrFile.error);
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", isName);
    if (photo) {
      formData.append("file", photo);
    }
    try {
      const response = await ApiAxios.patch(`/auth/user/me`, formData);
      const data = response.data.data;
      setIsAvatar(data.avatar);
      setIsLoading(false);
      setIsSuccess(true);
      setIsMessage("Update Avatar successfully");
      setPreviewImg(undefined);
    } catch (error: any) {
      console.log("saveAvatar", error);
      setIsError(true);
      setIsMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    const { origin } = window.location;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(origin + "/register?referral=" + isReferral_code)
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
    // setIsSuccess(true);
    // setIsMessage("Copy Clipboard");
    // setIsCopy(true);
  };
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 grid items-center">
          <LoadingLoadData />
        </div>
      )}
      <div className="flex justify-between px-3 py-2">
        <div className="pb-2 min-w-max">
          <h3 className="text-xl font-bold">Profil Saya</h3>
        </div>
      </div>
      <div className="items-start sm:p-4 xl:flex">
        <div className="grid w-full min-w-full gap-8 xl:min-w-min">
          <div className="mx:-4 sm:mx-8 sm:flex sm:gap-8">
            <p className="min-w-[7rem] sm:text-right">Nama Lengkap</p>
            <h5 className="font-bold">{isName}</h5>
          </div>
          {isEmail && (
            <div className="mx:-4 sm:mx-8 sm:flex sm:gap-8">
              <p className="min-w-[7rem] sm:text-right">Email</p>
              <h5 className="font-bold">{isEmail}</h5>
            </div>
          )}
          <div className="mx:-4 sm:mx-8 sm:flex sm:gap-8">
            <p className="min-w-[7rem] sm:text-right">Nomer HP</p>
            <h5 className="font-bold">{isPhone.number}</h5>
          </div>
          {isStatusMembership === "active" && (
            <div className="mx:-4 sm:mx-8 sm:flex sm:gap-8">
              <p className="min-w-[7rem] sm:text-right">Nomer Referral</p>
              <div className="flex items-center justify-between w-full">
                <h5 className="">
                  {window.location.host +
                    "/register?referral=" +
                    isReferral_code}
                </h5>
                <div
                  className={`${isCopy && "tooltip tooltip-open"}`}
                  data-tip="Tersalin"
                >
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-brand"
                  >
                    <RiFileCopyLine className="text-xl" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full max-w-xs pt-8 mx-auto my-8 border-t border-l-0 xl:pt-0 xl:mx-0 xl:my-0 xl:border-t-0 xl:border-l border-brand-muted">
          <div
            className={`w-32 h-32 mx-auto overflow-hidden rounded-md ${
              isErrFile?.error && "outline outline-2 outline-red-500"
            }`}
          >
            <Image
              src={
                previewImg
                  ? previewImg
                  : process.env.NEXT_PUBLIC_URL_CDN +
                    (isAvatar ? "/" + isAvatar : "/asset/noProfile.png")
              }
              alt="Profile"
            />
          </div>
          {isErrFile?.error && (
            <p className="mt-2 text-xs text-center text-red-500">
              {isErrFile.error}
            </p>
          )}
          <div className="flex justify-center my-4">
            <label className="px-6 btn btn-outline">
              Pilih Gambar
              <input
                type="file"
                className="hidden"
                name="avatar"
                onChange={onSelectImage}
              />
            </label>
          </div>
          <div className="flex justify-center">
            <div className="min-w-max">
              <p>Ukuran Gambar Maks : 1mb</p>
              <p>Format Gambar : JPG, PNG</p>
            </div>
          </div>
          <div className="h-8 mt-6 text-right">
            {previewImg && (
              <ButtonBlack onClick={saveAvatar}>Simpan</ButtonBlack>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
