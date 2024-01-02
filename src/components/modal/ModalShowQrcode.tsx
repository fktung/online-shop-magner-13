import React, { useMemo } from "react";
import { QRCode } from "react-qrcode-logo";
import { Modal } from "./Modal";
import { ButtonBlack } from "../button";
import { REGISTER_REFERRAL } from "@/constant/account";
import { useAuth } from "@/hooks/auth";

type TModalShowQrcodeProps = {
  htmlFor: string;
};

export const ModalShowQrcode = (props: TModalShowQrcodeProps) => {
  const { isReferral_code, isName } = useAuth();
  const downloadCode = () => {
    const canvas: any = document.getElementById("QR");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${isName} - ${isReferral_code}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const linkQRCode = useMemo(() => {
    return window.location.host + REGISTER_REFERRAL + isReferral_code;
  }, [isReferral_code]);

  return (
    <Modal htmlFor={props.htmlFor} className="grid place-items-center">
      <h3 className="text-xl font-extrabold sm:text-2xl">QR Code</h3>
      <QRCode
        value={linkQRCode}
        size={230}
        logoImage="/assets/icons/logo-magner.svg"
        logoHeight={40}
        logoWidth={30}
        logoOpacity={1}
        enableCORS={true}
        bgColor="#ffffff"
        eyeRadius={10} // radius of the promocode eye
        id={"QR"}
      />
      <p className="text-xs">{linkQRCode}</p>
      <div className="my-2 text-center">
        <ButtonBlack type="button" onClick={() => downloadCode()}>
          Download QR Code
        </ButtonBlack>
      </div>
    </Modal>
  );
};
