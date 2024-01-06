"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";
import { ButtonBlack } from "../button";
import { TEMPLATE_TEXT } from "@/constant/templateTextShare";
import { REGISTER_REFERRAL } from "@/constant/account";
import { useAuth } from "@/hooks/auth";
import axios from "axios";
import { LOCAL_STORAGE } from "@/constant/layout";

type TModalShareSosmedProps = {
  htmlFor: string;
};

export const ModalShareSosmed = (props: TModalShareSosmedProps) => {
  const { isReferral_code } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [isLinkRef, setIsLinkRef] = useState("");
  const [isTemplate, setIsTemplate] = useState("");

  const templateLocal = localStorage.getItem(LOCAL_STORAGE.templateText);
  const getHost = async () => {
    const response = await axios.get("/api/host");
    const linkRef = response.data.host + REGISTER_REFERRAL + isReferral_code;
    setIsLinkRef(linkRef);
    if (templateLocal) {
      setIsTemplate(
        templateLocal.replaceAll("[LINK_REFERRAL]", `[${linkRef}]`)
      );
      return;
    }
    localStorage.setItem(
      LOCAL_STORAGE.templateText,
      TEMPLATE_TEXT + "[LINK_REFERRAL]"
    );
    setIsTemplate(TEMPLATE_TEXT + `[${linkRef}]`);
  };

  useEffect(() => {
    getHost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateLocal, isReferral_code]);

  const handleEditText = () => {
    if (isEdit) {
      localStorage.setItem(
        LOCAL_STORAGE.templateText,
        isTemplate.replaceAll(`[${isLinkRef}]`, "[LINK_REFERRAL]")
      );
    }
    setIsEdit((e) => !e);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsTemplate(e.target.value);
  };

  return (
    <Modal htmlFor={props.htmlFor}>
      <h3 className="text-xl font-extrabold sm:text-2xl">
        Bagikan Link Referral
      </h3>

      <div className="grid gap-4 mt-4">
        <div>
          <p className="font-extrabold text-left">Template Text</p>
          <p className="text-xs text-left">
            <span className="text-red-500">Note: Jangan di Edit </span>{" "}
            <span className="font-black">{`[${isLinkRef}]`}</span>
          </p>
          <textarea
            className={`w-full mt-1 textarea textarea-bordered ${
              !isEdit && "bg-black/10"
            }`}
            placeholder="Bio"
            rows={8}
            defaultValue={isTemplate}
            readOnly={!isEdit}
            onChange={handleChangeText}
          />
          <div className="text-right">
            <ButtonBlack onClick={handleEditText}>
              {isEdit ? "Simpan" : "Edit"}
            </ButtonBlack>
          </div>
        </div>
        <p className="font-extrabold">Share :</p>
        <div className="flex justify-center gap-2">
          <WhatsappShareButton
            url={isTemplate.replaceAll(`[${isLinkRef}]`, isLinkRef)}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <FacebookShareButton
            url={isLinkRef}
            quote="Magner Care"
            hashtag="#magnercare"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
      </div>
    </Modal>
  );
};
