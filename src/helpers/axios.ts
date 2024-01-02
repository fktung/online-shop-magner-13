import { DOMAIN_API } from "@/constant/api.endpoint";
import axios from "axios";
import { getCookie } from "cookies-next";

export const HeadersAuthoriz = () => {
  const token = getCookie("_MToken");
  // typeof window !== "undefined" ? localStorage.getItem("_MToken") : "";
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const token = getCookie("_MToken");
// typeof window !== "undefined" ? localStorage.getItem("_MToken") : "";

export const ApiAxios = axios.create({
  baseURL: DOMAIN_API.magner,
});
