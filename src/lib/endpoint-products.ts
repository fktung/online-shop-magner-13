import { ENDPOINT } from "@/constant/api.endpoint";
import { ApiAxios } from "@/helpers/axios";
import { IProducts } from "@/types";

export const getProducts = async (query?: any): Promise<IProducts[]> => {
  console.log("query", query);
  try {
    const response = await ApiAxios.get(`${ENDPOINT.products.DEFAULT}`);
    const data = await response.data;
    return data.data;
  } catch (error: any) {
    console.log("getProducts", error);
    return error;
  }
};
