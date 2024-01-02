import { ApiAxios } from "@/helpers/axios";
import { Capitalize, MoneyFormat } from "@/helpers/common";
import { IMembershipRewardsOrder } from "@/types";
import React, { useEffect, useState } from "react";

export const MembershipOrder = () => {
  const [isRewardOrder, setIsRewardOrder] = useState<IMembershipRewardsOrder[]>(
    [],
  );
  const [isPage, setIsPage] = useState("");
  const [isLimit, setIsLimit] = useState("");

  const getMembershipItems = async (page: string = isPage) => {
    try {
      const response = await ApiAxios.get(
        `membership/rewards/order?page=${page}`,
      );
      const data = response.data.data;
      setIsRewardOrder(data);
    } catch (error: any) {
      console.log("getMembershipItems", error);
    }
  };

  useEffect(() => {
    getMembershipItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative my-6 overflow-hidden overflow-x-auto no-scrollbar rounded-xl">
      <table className="w-full text-sm text-left text-brand-muted dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-dark-components">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Invoice
            </th>
            <th scope="col" className="px-6 py-3">
              Item Beli
            </th>
            <th scope="col" className="px-6 py-3">
              Total Transaksi
            </th>
          </tr>
        </thead>
        <tbody>
          {isRewardOrder.map((row, idx) => (
            <tr className="border-b dark:border-gray-700" key={idx}>
              <th
                scope="row"
                className="flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap"
              >
                <p className="font-bold">{Capitalize(row.name)}</p>
              </th>
              <td className="px-6 py-4">{row.invoice}</td>
              <td className="px-6 py-4">{row.qty}</td>
              <td className="px-6 py-4">{MoneyFormat(row.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
