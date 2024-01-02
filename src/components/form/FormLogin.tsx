import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React, { ChangeEvent, useState } from "react";
import { ButtonBlack } from "../button";
import { t } from "i18next";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import { InputForm, TInputForm } from "../input";
import { useLayout } from "@/hooks/layouts";
import { deleteCookie, setCookie } from "cookies-next";
import { ROUTES } from "@/constant/routes";
import { ApiAxios } from "@/helpers/axios";
import Swal from "sweetalert2";
import axios from "axios";

export const FormLogin = () => {
  const router = useRouter();
  const { isPreviousUrl, setIsPhone } = useAuth();
  const { setIsSuccess, setIsMessage, setIsloading, isLoading, setIsError } =
    useLayout();
  const [inputs, setInputs] = useState<TInputForm>({});
  const [showPasswd, setShowPasswd] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isHandleError, setIsHandleError] = useState<any>({ phone: "" });
  const [isValidPhone, setIsValidPhone] = useState(true);
  const { path }: any = router.query;

  const phoneNumberRegex = /^(0)[1-9]{1}[0-9]+$/;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs(values => ({ ...values, [name]: value }));
    if (name === "phone") {
      const isValidPhoneNumber = phoneNumberRegex.test(value);
      setIsValidPhone(isValidPhoneNumber);
      if (!isValidPhoneNumber) {
        setIsHandleError({
          ...isHandleError,
          phone: "Format diawali dengan angka 0",
        });
        return;
      }
      const { phone, ...isHandleErrorNew } = isHandleError;
      setIsHandleError(isHandleErrorNew);
    }
  };

  const handleShowPasswd = () => {
    setShowPasswd(!showPasswd);
  };

  const reVerify = async () => {
    try {
      const response = await ApiAxios.post("/auth/user/confirm/reconfirm", {
        phone: inputs.phone,
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
        setIsError(true);
        setIsMessage(err.message);
      }
    }
  };

  const getDataIp = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    // setIP(res.data.IPv4)
    return res.data.IPv4;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const callBackUrl = path ? path : isPreviousUrl;
    e.preventDefault();
    if (!isValidPhone) {
      setIsError(true);
      setIsMessage("Format Number salah");
      return;
    }
    if (!inputs.phone) {
      setIsError(true);
      setIsMessage("Nomer Tidak Boleh Kosong!");
      return;
    }
    if (!inputs.password) {
      setIsError(true);
      setIsMessage("Password Tidak Boleh Kosong!");
      return;
    }
    setIsloading(true);
    let optionCookie: { maxAge?: number } = {};
    if (isRememberMe) {
      optionCookie.maxAge = 60 * 60 * 24 * 7;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_APP}/auth/user/login`,
        inputs,
      );
      const data = await res.data.data;
      // const ip = await getDataIp();
      // const resIp = await ApiAxios.post(
      //   `/user/ip`,
      //   {
      //     ip_address: ip,
      //     id: data.id,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${data.token}`,
      //     },
      //   },
      // );
      // if (resIp.status !== 201) {
      //   console.log("error Post Ip", resIp);
      //   return;
      // }
      setIsSuccess(true);
      setIsMessage("Berhasil Login");
      setIsloading(false);
      deleteCookie("_ref_code");
      setCookie("_MToken", data.token, optionCookie);
      // getAuthMe();
      router.push(callBackUrl || ROUTES.ACCOUNT);
      // router.reload();
      // router.replace(ROUTES.ACCOUNT);
    } catch (error: any) {
      const err = error.response?.data;
      console.log("err catch", error);
      setIsloading(false);
      if (err?.message) {
        setIsError(true);
        setIsMessage(err.message);
      }
      if (err?.status_code === 406) {
        Swal.fire({
          title: "Akun Anda Belum di Aktivasi!",
          text: "Aktivasi Sekarang",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, Aktivasi",
        }).then(result => {
          if (result.isConfirmed) {
            reVerify();
          }
        });
        return;
      }
      if (err?.errors) {
        const valErr: any = [...Object.values(err.errors)];
        console.log(valErr);
        setIsError(true);
        setIsMessage(valErr[0]);
        setIsloading(false);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="font-bold">
            {t("pages.login.whatsappOrEmail")}
          </label>
          <InputForm
            type="text"
            name="phone"
            value={inputs.phone || ""}
            onChange={handleChange}
            placeholder="0812345678"
          />
        </div>
        <div>
          <label className="font-bold">{t("pages.login.password")}</label>
          <InputForm
            type={showPasswd ? "text" : "password"}
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
            placeholder="*********"
          >
            <div className="absolute top-0 bottom-0 flex items-center right-3">
              <button type="button" onClick={handleShowPasswd}>
                {showPasswd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </InputForm>
        </div>
        <div className="flex items-center justify-between">
          <div className="form-control max-w-max">
            <label className="flex-row-reverse cursor-pointer label">
              <span className="mx-2 label-text dark:text-brand-light">
                {t("pages.login.rememberMe")}
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-warning checkbox-sm"
                onChange={e => setIsRememberMe(e.target.checked)}
              />
            </label>
          </div>
          <div className="text-sm text-brand">
            <Link href={"/forgot-password"}>
              {t("pages.login.forgotPassword")}
            </Link>
          </div>
        </div>
        <div className="my-5">
          <ButtonBlack className="w-full" type="submit">
            <p>{isLoading ? t("common.loading") : t("pages.login.label")}</p>
          </ButtonBlack>
        </div>
        <div className="my-5">
          <p className="text-sm text-center">
            {t("pages.login.notHaveAccount")}
            <span className="mx-2 transition-all duration-300 text-brand hover:text-yellow-600">
              <Link href={"/register"}>{t("pages.register.now")}</Link>
            </span>
          </p>
        </div>
        {/* <div className="my-5">
          <p className="text-sm text-center">{t("pages.login.description")}</p>
        </div> */}
      </form>
    </div>
  );
};
