import React, { ReactNode, useState } from "react";
import { useLayout } from "@/hooks/layouts";
import { AiOutlineClose } from "react-icons/ai";
import { ButtonBlack } from "../button";
import { deleteCookie, setCookie } from "cookies-next";

type TModalNotificationUpdateFeatureProps = {
  htmlFor: string;
  data: { name: string; messages: ReactNode };
};

export const ModalNotificationUpdateFeature = (
  props: TModalNotificationUpdateFeatureProps
) => {
  const { htmlFor, data } = props;
  const { isModalNotif, setIsModalNotif } = useLayout();
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const notShowAgain = () => {
    if (isCheck) {
      const dataUpdate = {
        key: data.name.toLowerCase().replaceAll(" ", "_"),
        isRead: true,
      };
      setCookie("_notifUpdate", dataUpdate, { maxAge: 60 * 60 * 24 * 7 });
    }
    setIsModalNotif(false);
  };
  return (
    <div
      className={`fixed transition-all duration-500 right-0 left-0 bg-black/50 max-h-screen z-50 h-screen overflow-auto no-scrollbar ${
        isModalNotif ? "top-0 bg-black/30" : "-top-[120%] bg-black/0"
      }`}
    >
      <div className="pt-24">
        <div
          className="absolute top-0 bottom-0 left-0 right-0"
          onClick={() => setIsModalNotif(false)}
        />
        <div className="absolute left-0 right-0 w-full max-w-xl pb-20 mx-auto">
          <div className="grid gap-3 p-4 mx-4 overflow-hidden bg-white drop-shadow-center-50 rounded-xl">
            <div className="relative flex items-center justify-between mb-4 text-white">
              <div className="absolute bottom-0 scale-y-150 bg-black -left-4 -right-4 -top-2" />
              <div className="z-10 flex items-center justify-between w-full">
                <p className="text-xl font-black">{data.name}</p>
                <button
                  onClick={() => setIsModalNotif(false)}
                  className="w-8 h-8 ml-auto text-xl text-center transition-all duration-300 hover:text-2xl"
                >
                  <AiOutlineClose className="mx-auto" />
                </button>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.messages || "" }} />
            <div className="form-control">
              <label className="flex items-center gap-2 cursor-pointer max-w-max label">
                <input
                  type="checkbox"
                  checked={isCheck}
                  className="checkbox checkbox-warning checkbox-sm"
                  onChange={(e) => setIsCheck(e.target.checked)}
                />
                <span className="label-text">Jangan Tampilkan Lagi</span>
              </label>
              <div className="flex justify-end gap-4">
                <ButtonBlack onClick={notShowAgain}>Oke</ButtonBlack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
