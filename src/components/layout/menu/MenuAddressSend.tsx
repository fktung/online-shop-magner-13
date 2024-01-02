import { IconOutlineDown } from "@/components/icons";
import { ADDRESS } from "@/constant/account";
import { ROUTES } from "@/constant/routes";
import { useLayout } from "@/hooks/layouts";
import { t } from "i18next";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

export const MenuAddressSend = () => {
  const { isDarcMode, setDarcMode, theme } = useLayout();

  useEffect(() => {
    const Html = document.documentElement;
    if (theme) {
      Html.setAttribute("data-theme", theme);
    }
  }, [isDarcMode, theme]);

  const handleDarkMode = () => {
    setDarcMode(!isDarcMode);
  };
  return (
    <div className="flex items-center min-w-max ">
      <div className="mx-2 form-control">
        <label className="gap-4 cursor-pointer label">
          <span className="label-text">Dark Mode</span>
          <input
            type="checkbox"
            className="toggle toggle-warning"
            onChange={handleDarkMode}
            checked={theme === "dark"}
          />
        </label>
      </div>
      <i className="mt-1 mr-2 text-xl">
        <CiLocationOn />
      </i>
      <p>{t("common.sendTo")} : </p>
      <label htmlFor="addressNav" className="cursor-pointer">
        <div className="flex items-center gap-1 py-4">
          <p className="mx-2 text-brand">{t("common.address")}</p>
          <IconOutlineDown />
        </div>
      </label>
      <input type="checkbox" id="addressNav" className="modal-toggle" />
      <div className="modal">
        <div className="w-11/12 max-w-2xl modal-box no-scrollbar">
          <div className="relative">
            <h3 className="text-xl font-extrabold text-center">
              Pilih Alamat Pengiriman
            </h3>
            <label
              className="absolute top-0 bottom-0 flex items-center text-4xl -right-3"
              htmlFor="addressNav"
            >
              <IoIosClose />
            </label>
          </div>
          <div className="mt-4 mb-2">
            <Link href={ROUTES.ADDRESS_ADD}>
              <button className="w-full px-6 py-2 font-semibold text-center transition-all duration-300 border border-black rounded-md dark:border-white hover:bg-zinc-100 hover:text-zinc-900">
                Tambah
              </button>
            </Link>
          </div>
          <div className="mt-4 overflow-y-auto max-h-[28rem] no-scrollbar">
            {ADDRESS.map((item, idx) => (
              <div key={idx} className="my-4">
                <div className="items-center p-4 border md:flex rounded-xl">
                  <div className="grid w-full gap-3">
                    <p>
                      <span className="font-bold">{item.name}</span> -{" "}
                      {item.receiver}
                    </p>
                    <p>{item.fullAddress}</p>
                    <Link className="text-brand" href={"#"}>
                      Ubah Alamat
                    </Link>
                  </div>
                  <div className="mx-auto my-4 w-full max-w-[15rem] flex justify-center md:justify-end items-center">
                    {item.is_default ? null : (
                      <button className="px-4 py-3 text-white transition-all duration-300 bg-black rounded-xl hover:bg-brand-muted dark:border dark:border-white">
                        Pilih Alamat
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="addressNav" />
      </div>
    </div>
  );
};
