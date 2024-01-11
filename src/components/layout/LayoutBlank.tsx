"use client";
import React, { useEffect } from "react";
import { ILayout } from "./Layout";
import { useLayout } from "@/hooks/layouts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LayoutBlank = (props: ILayout) => {
  const {
    isSuccess,
    setIsSuccess,
    isMessage,
    setIsMessage,
    isError,
    setIsError,
  } = useLayout();
  useEffect(() => {
    if (isSuccess && isMessage !== "") {
      toast.success(isMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsSuccess(false);
      setIsMessage("");
    }

    if (isError && isMessage !== "") {
      toast.error(isMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsError(false);
      setIsMessage("");
      return;
    }
  }, [isSuccess, setIsSuccess, isMessage, setIsMessage, isError, setIsError]);
  return (
    <div>
      <ToastContainer />
      {props.children}
    </div>
  );
};
