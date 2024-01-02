import React, { ChangeEvent, FormEvent, useState } from "react";
import { ButtonBlack } from "../button";
import Link from "next/link";
import { t } from "i18next";
import { InputForm, TInputForm } from "../input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
import { MapCoordinateForm } from "../maps";

interface IKoordinatJson {
  address_components: any[];
  formatted_address: string;
}
export const FormVerifUser = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState<TInputForm>({});
  const [isShowKoordinat, setIsShowKoordinat] = useState<IKoordinatJson>({
    address_components: [],
    formatted_address: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setInputs(values => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (el: FormEvent<HTMLFormElement>) => {
    el.preventDefault();
    setInputs({});
    router.push("/verification");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="my-6">
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.verifcation.user.form.recipientName")}
          </label>
          <InputForm
            type="text"
            name="fullName"
            value={inputs.fullName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="my-6">
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.verifcation.user.form.recipientPhoneNumber")}
          </label>
          <InputForm
            type="text"
            name="phoneMunber"
            value={inputs.phoneMunber || ""}
            onChange={handleChange}
          />
        </div>
        <div className="my-6">
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.verifcation.user.form.placeLabel")}
          </label>
          <InputForm
            type="text"
            name="placeLabel"
            value={inputs.placeLabel || ""}
            onChange={handleChange}
          />
        </div>
        <div className="my-6">
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.verifcation.user.form.province")}
          </label>
          <div className="w-full my-2 form-control">
            <select
              name="province"
              onChange={handleChange}
              className="focus:outline-none border-zinc-200 focus:border-brand select"
            >
              <option>Pilih {t("pages.verifcation.user.form.province")}</option>
              <option>Bali</option>
              <option>Jawa Timur</option>
              <option>Jawa Tengah</option>
              <option>Jawa Barat</option>
            </select>
            <label className="hidden label">
              <span className="label-text-alt">Alt label</span>
            </label>
          </div>
        </div>
        <div className="my-6">
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.verifcation.user.form.countyTown")}
          </label>
          <div className="w-full my-2 form-control">
            <select
              name="countyTown"
              onChange={handleChange}
              className="focus:outline-none border-zinc-200 focus:border-brand select"
            >
              <option>
                Pilih {t("pages.verifcation.user.form.countyTown")}
              </option>
              <option>Bali</option>
              <option>Jawa Timur</option>
              <option>Jawa Tengah</option>
              <option>Jawa Barat</option>
            </select>
            <label className="hidden label">
              <span className="label-text-alt">Alt label</span>
            </label>
          </div>
        </div>
        <div className="my-6">
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.verifcation.user.form.subdistrict")}
          </label>
          <div className="w-full my-2 form-control">
            <select
              name="subdistrict"
              onChange={handleChange}
              className="focus:outline-none border-zinc-200 focus:border-brand select"
            >
              <option>
                Pilih {t("pages.verifcation.user.form.subdistrict")}
              </option>
              <option>Bali</option>
              <option>Jawa Timur</option>
              <option>Jawa Tengah</option>
              <option>Jawa Barat</option>
            </select>
            <label className="hidden label">
              <span className="label-text-alt">Alt label</span>
            </label>
          </div>
        </div>
        <div className="my-6">
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.verifcation.user.form.village")}
          </label>
          <div className="w-full my-2 form-control">
            <select
              name="village"
              onChange={handleChange}
              className="focus:outline-none border-zinc-200 focus:border-brand select"
            >
              <option>Pilih {t("pages.verifcation.user.form.village")}</option>
              <option>Bali</option>
              <option>Jawa Timur</option>
              <option>Jawa Tengah</option>
              <option>Jawa Barat</option>
            </select>
            <label className="hidden label">
              <span className="label-text-alt">Alt label</span>
            </label>
          </div>
        </div>
        <div className="my-6">
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.verifcation.user.form.address")}
          </label>
          <div className="form-control">
            <textarea
              className="h-24 textarea textarea-bordered"
              placeholder="tulis jalan, perusahaan, nomor, rt/rw"
            ></textarea>
            <label className="hidden label">
              <span className="label-text-alt">Your bio</span>
            </label>
          </div>
        </div>
        <div className="my-6">
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.verifcation.user.form.coordinate")}
          </label>
          <div className="relative h-60">
            {/* <div className="absolute top-0 bottom-0 left-0 right-0 z-10 cursor-pointer"></div> */}
            {/* <label
                    htmlFor="modalKoordinatForm"
                    className="absolute top-0 bottom-0 left-0 right-0 z-10 cursor-pointer"
                  /> */}
            <MapCoordinateForm />
          </div>
        </div>
        <div className="my-6">
          <label className="font-bold text-brand-muted dark:text-zinc-200">
            {t("pages.verifcation.user.form.notes")}
          </label>
          <InputForm
            type="text"
            name="notes"
            value={inputs.notes || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center gap-3 my-5">
          <Link
            href={"/verification/success"}
            className="w-full px-6 py-2 font-semibold text-center transition-all duration-300 border border-black rounded-md hover:bg-zinc-100 dark:border-white"
          >
            <button>Lewati</button>
          </Link>
          <Link
            href={"/verification/success"}
            className="w-full px-6 py-2 font-semibold text-center text-white transition-all duration-300 bg-black rounded-md hover:bg-zinc-800"
          >
            <button>selesai</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
