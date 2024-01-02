"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ButtonBlack } from "../button";
import Link from "next/link";
import { t } from "i18next";
import { InputForm, TInputForm } from "../input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
import { useLayout } from "@/hooks/layouts";
import axios from "axios";
import { useAuth } from "@/hooks/auth";
import { ROUTES } from "@/constant/routes";
import { Capitalize } from "@/helpers/common";
import { ApiAxios } from "@/helpers/axios";
import { setCookie, getCookie } from "cookies-next";
import { ENDPOINT } from "@/constant/api.endpoint";

export const FormRegister = () => {
  const router = useRouter();
  const { setIsPhone } = useAuth();
  const { setIsError, setIsSuccess, setIsMessage, isLoading, setIsloading } =
    useLayout();
  const [inputs, setInputs] = useState<TInputForm>({});
  const [showPasswd, setShowPasswd] = useState(false);
  const [showPasswdKonfr, setShowPasswdKonfr] = useState(false);
  const [isKonfrmPassword, setIsKonfrmPassword] = useState<boolean>(true);
  const [isHandleError, setIsHandleError] = useState<any>({ phone: "" });
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isAgree, setIsAgree] = useState(false);
  const [isRefCodeCookie, setIsRefCodeCookie] = useState(false);
  const refQuery = router.query.referral || getCookie("_ref_code");

  const phoneNumberRegex = /^(8)[1-9]{1}[0-9]+$/;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs(values => ({ ...values, [name]: value }));
    if (name === "konfrmPassword") {
      setIsKonfrmPassword(inputs.password === value);
    }
    if (name === "password") {
      setIsKonfrmPassword(inputs.konfrmPassword === value);
    }
    if (name === "phone") {
      const isValidPhoneNumber = phoneNumberRegex.test(value);
      setIsValidPhone(isValidPhoneNumber);
      if (!isValidPhoneNumber) {
        setIsHandleError({
          ...isHandleError,
          phone: "Format diawali dengan angka 8",
        });
        return;
      }
      const { phone, ...isHandleErrorNew } = isHandleError;
      setIsHandleError(isHandleErrorNew);
    }
    setIsHandleError((e: any) => {
      return { ...e, [name]: undefined };
    });
  };

  const reVerify = async () => {
    setIsloading(true);
    try {
      const response = await ApiAxios.post("/auth/user/confirm/reconfirm", {
        phone: `0${inputs.phone}`,
      });

      const data = await response.data;
      setIsSuccess(true);
      setIsMessage(data.message);
      setIsloading(false);
      setIsPhone({
        verification: false,
        number: inputs.phone,
      });
      localStorage.setItem("hashPhone", data.data);
      router.push("/verification");
    } catch (error: any) {
      setIsloading(false);
      console.log("Error Register", error);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      if (error.response.data) {
        const err = await error.response.data;
        setIsHandleError(err.errors);
        setIsError(true);
        setIsMessage(err.message);
      }
    }
  };

  const postRegister = async () => {
    const dataRegister = { ...inputs, phone: `0${inputs.phone}` };
    setIsloading(true);
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_APP + "/auth/user/register",
        dataRegister,
      );
      const data = await res.data;
      setIsSuccess(true);
      setIsMessage(data.message);
      setIsloading(false);
      setInputs({});
      setIsPhone({
        verification: false,
        number: dataRegister.phone,
      });
      localStorage.setItem("hashPhone", data.data);
      router.push("/verification");
    } catch (error: any) {
      console.log("Error Register", error);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      const err = await error.response.data;
      if (err) {
        setIsHandleError(err.errors);
        setIsError(true);
        setIsMessage(
          (err.message as string).replace(
            "Invalid referral code",
            "Referral Code Tidak Di Temukan",
          ),
        );
      }
      if (err.status_code === 406) {
        reVerify();
      }
      setIsloading(false);
      if (err.status_code === 409) {
        router.push(ROUTES.LOGIN);
      }
    }
  };

  const handleSubmit = async (el: FormEvent<HTMLFormElement>) => {
    el.preventDefault();
    if (!isKonfrmPassword) {
      setIsError(true);
      setIsMessage("Password not Match");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    if (!isValidPhone) {
      setIsError(true);
      setIsMessage("Format Number salah");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    if (!inputs.phone) {
      setIsHandleError({
        ...isHandleError,
        phone: "Masukan Nomer WA",
      });
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    if (!inputs.referral) {
      setIsHandleError({
        ...isHandleError,
        referral: "Code Referral tidak boleh kosong!",
      });
      setIsError(true);
      setIsMessage("Silahkan Mengisi Referral atau Hub CS Kami");
      return;
    }
    postRegister();
  };

  useEffect(() => {
    if (refQuery && typeof refQuery === "string") {
      setInputs({ referral: refQuery });
      setCookie("_ref_code", refQuery, { maxAge: 60 * 60 * 24 * 7 });
      setIsRefCodeCookie(true);
    }
  }, [refQuery]);

  const handleShowPasswd = () => {
    setShowPasswd(!showPasswd);
  };
  const handleShowPasswdKonfr = () => {
    setShowPasswdKonfr(!showPasswdKonfr);
  };

  const handleCheckReferral = async () => {
    const msgError = "Kode Referral Tidak Terdaftar!";
    try {
      const response = await ApiAxios.post(
        `${ENDPOINT.authUser.registerCheck}?referral=${inputs.referral}`,
      );
      if (!response.data.data) {
        setIsHandleError((e: any) => {
          return { ...e, referral: msgError };
        });
        setIsError(true);
        setIsMessage(msgError);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.register.fullName")}
          </label>
          <InputForm
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
            placeholder="Nama lengkap"
          >
            {isHandleError?.name && (
              <span className="text-xs text-red-500">
                {Capitalize(isHandleError?.name.replace(/([A-Z])/g, " $1"))}
              </span>
            )}
          </InputForm>
        </div>
        {/* <div>
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.register.email")}
          </label>
          <InputForm
            type="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
            placeholder="Email anda"
          >
            {isHandleError?.email && (
              <span className="text-xs text-red-500">
                {Capitalize(isHandleError?.email.replace(/([A-Z])/g, " $1"))}
              </span>
            )}
          </InputForm>
        </div> */}
        <div>
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.register.phoneNumber")}
          </label>
          <InputForm
            type="text"
            name="phone"
            value={inputs.phone || ""}
            onChange={handleChange}
            placeholder="812345678"
            className={`pl-14 ${!isValidPhone ? "border border-red-500" : ""}`}
          >
            <div
              className={`absolute top-0 grid h-12 px-2 border rounded-lg rounded-r-none bg-zinc-200 place-items-center ${
                !isValidPhone && "border-red-500 border-r-0"
              }`}
            >
              +62
            </div>
            {isHandleError?.phone && (
              <span className="text-xs text-red-500">
                {Capitalize(isHandleError?.phone.replace(/([A-Z])/g, " $1"))}
              </span>
            )}
          </InputForm>
        </div>
        <div>
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.register.password")}
          </label>
          <InputForm
            type={showPasswd ? "text" : "password"}
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          >
            <div className="absolute flex items-center top-4 right-3">
              <button type="button" onClick={handleShowPasswd}>
                {showPasswd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
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
            {t("pages.register.confrPassword")}
          </label>
          <InputForm
            className={
              inputs.konfrmPassword && !isKonfrmPassword ? "border-red-600" : ""
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
                {showPasswdKonfr ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </InputForm>
        </div>
        <div>
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            Kode Referral
          </label>
          <InputForm
            type="text"
            name="referral"
            value={inputs.referral || ""}
            onChange={handleChange}
            disabled={isRefCodeCookie}
            onBlur={handleCheckReferral}
            className={`${
              isHandleError?.referral && "outline outline-1 outline-red-500"
            } ${isRefCodeCookie ? "text-zinc-700" : ""}`}
          >
            {isHandleError?.referral && (
              <span className="text-xs text-red-500">
                {Capitalize(isHandleError?.referral.replace(/([A-Z])/g, " $1"))}
              </span>
            )}
          </InputForm>
        </div>

        <div className="flex items-center justify-between">
          <div className="form-control max-w-max">
            <label className="flex-row-reverse cursor-pointer label">
              <p className="mx-2 label-text dark:text-brand-light">
                Dengan mendaftar, saya menyetujui
                <Link
                  href={ROUTES.TNC}
                  target="_blank"
                  className="ml-1 text-brand"
                >
                  Syarat dan Ketentuan
                </Link>{" "}
                serta{" "}
                <Link
                  href={ROUTES.POLICY_N_PRIVACY}
                  target="_blank"
                  className="ml-1 text-brand"
                >
                  Kebijakan Privasi
                </Link>
              </p>
              <input
                type="checkbox"
                className="checkbox checkbox-warning checkbox-sm"
                onChange={e => setIsAgree(e.target.checked)}
              />
            </label>
          </div>
        </div>
        <div className="my-5">
          <ButtonBlack
            className={`w-full ${!isAgree && "cursor-not-allowed"}`}
            type="submit"
            disabled={isLoading || !isAgree}
          >
            <p>{isLoading ? t("common.loading") : t("pages.register.label")}</p>
          </ButtonBlack>
        </div>
        <div className="my-5">
          <p className="text-sm text-center">
            {t("pages.register.alreadyHaveAccount")}
            <span className="mx-2 transition-all duration-300 text-brand hover:text-yellow-600">
              <Link href={"/login"}>{t("pages.login.label")}</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};
