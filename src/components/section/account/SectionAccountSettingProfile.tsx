import { ButtonBlack } from "@/components/button";
import { InputForm, TInputForm } from "@/components/input";
import { ROUTES } from "@/constant/routes";
import { ApiAxios } from "@/helpers/axios";
import { useAuth } from "@/hooks/auth";
import { useLayout } from "@/hooks/layouts";
import { deleteCookie } from "cookies-next";
import { t } from "i18next";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";

export const SectionAccountSettingProfile = () => {
  const router = useRouter();
  const { isName, setIsName, setIsLogout } = useAuth();
  const { setIsError, setIsMessage, setIsSuccess, setShowSidebar } =
    useLayout();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState<TInputForm>({});
  const [isHandleError, setisHandleError] = useState<any>();
  const [showPasswd, setShowPasswd] = useState(false);
  const [showPasswdNew, setShowPasswdNew] = useState(false);
  const [showPasswdKonfr, setShowPasswdKonfr] = useState(false);
  const [isKonfrmPassword, setIsKonfrmPassword] = useState<boolean>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "konfrmPassword") {
      setIsKonfrmPassword(inputs.password === value);
    }
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleShowPasswd = () => {
    setShowPasswd(!showPasswd);
  };

  const handleShowPasswdNew = () => {
    setShowPasswdNew(!showPasswdNew);
  };
  const handleShowPasswdKonfr = () => {
    setShowPasswdKonfr(!showPasswdKonfr);
  };

  useMemo(() => {
    if (!inputs.name) {
      const dataInputs = {
        target: {
          name: "name",
          value: isName,
        },
      };
      handleChange(dataInputs as ChangeEvent<HTMLInputElement>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.name, isName]);

  const handleSubmit = async (el: FormEvent<HTMLFormElement>) => {
    el.preventDefault();
    if (inputs.password || inputs.currentPassword) {
      if (inputs.password === "" && inputs.currentPassword === "") {
        setIsError(true);
        setIsMessage("Password Baru tidak Boleh Kosong");
        return;
      }
      if (!isKonfrmPassword) {
        setIsError(true);
        setIsMessage("Password not Match");
        return;
      }
      if (inputs.password.length < 8) {
        setIsError(true);
        setIsMessage("Minimum Password of 8 Characters");
        return;
      }
      if (inputs.password === inputs.currentPassword) {
        setIsError(true);
        setIsMessage("New password same as old password");
        return;
      }
    }
    setIsLoading(true);
    if (inputs.password) {
      Swal.fire({
        title: "Update Setting",
        text: "Apakah Anda Ingin Merubah Password ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then(result => {
        if (result.isConfirmed) {
          updateApprove();
        }
      });
      return;
    }
    updateApprove();
  };

  const updateApprove = async () => {
    try {
      const response = await ApiAxios.patch(`/auth/user/me`, inputs);
      const data = response.data;
      setIsSuccess(true);
      setIsMessage("Update " + data.message);
      setIsName(inputs.name);
      if (inputs.password) {
        handleLogout();
      }
      const { isName, ...allInput } = inputs;
      setInputs({ isName });
    } catch (error: any) {
      console.log("editAccount", error);
      setIsError(true);
      setIsMessage(error.response.data.message);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      await ApiAxios.post(`/auth/user/logout`);
      deleteCookie("_MToken");
      setIsLogout();
      localStorage.removeItem("_MToken");
      router.push(ROUTES.LOGIN);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 mx-auto rounded-lg shadow-lg lg:max-w-xl">
      <div className="flex justify-between px-3 py-2">
        <div className="pb-2 min-w-max">
          <h3 className="text-xl font-bold">Pengaturan Profile</h3>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="font-bold text-brand-muted dark:text-zinc-200">
              {t("pages.register.fullName")}
            </label>
            <InputForm
              type="text"
              name="name"
              value={inputs.name || isName}
              onChange={handleChange}
            >
              {isHandleError?.name && (
                <span className="text-xs text-red-500">
                  {isHandleError?.name}
                </span>
              )}
            </InputForm>
          </div>
          <div>
            <label className="font-bold text-brand-muted dark:text-zinc-200">
              {t("pages.register.password")} Lama
            </label>
            <InputForm
              type={showPasswd ? "text" : "password"}
              name="currentPassword"
              value={inputs.currentPassword || ""}
              onChange={handleChange}
            >
              <div className="absolute flex items-center top-4 right-3">
                <button type="button" onClick={handleShowPasswd}>
                  {showPasswd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              {isHandleError?.currentPassword && (
                <span className="text-xs text-red-500">
                  {isHandleError?.currentPassword}
                </span>
              )}
            </InputForm>
          </div>
          <div>
            <label className="font-bold text-brand-muted dark:text-zinc-200">
              Password Baru
            </label>
            <InputForm
              type={showPasswdNew ? "text" : "password"}
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
            >
              <div className="absolute flex items-center top-4 right-3">
                <button type="button" onClick={handleShowPasswdNew}>
                  {showPasswdNew ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              {isHandleError?.password && (
                <span className="text-xs text-red-500">
                  {isHandleError?.password}
                </span>
              )}
            </InputForm>
          </div>
          <div className="relative">
            <label className="font-bold text-brand-muted dark:text-zinc-200">
              Konfirmasi Password Baru
            </label>
            <InputForm
              className={
                inputs.konfrmPassword && !isKonfrmPassword
                  ? "border-red-600"
                  : ""
              }
              type={showPasswdKonfr ? "text" : "password"}
              name="konfrmPassword"
              value={inputs.konfrmPassword || ""}
              onChange={handleChange}
            >
              {!isKonfrmPassword && inputs.konfrmPassword && (
                <span className="text-xs text-red-500">Password not Match</span>
              )}
              <div className="absolute flex items-center top-4 right-3">
                <button type="button" onClick={handleShowPasswdKonfr}>
                  {showPasswdKonfr ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </button>
              </div>
            </InputForm>
          </div>
          <div className="my-5">
            <ButtonBlack
              className={`w-full ${isLoading && "cursor-not-allowed"}`}
              type={isLoading ? "button" : "submit"}
              disabled={isLoading}
            >
              <p>{isLoading ? t("common.loading") : "Update"}</p>
            </ButtonBlack>
          </div>
        </form>
      </div>
    </div>
  );
};
