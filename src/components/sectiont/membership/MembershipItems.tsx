import { Image } from "@/components/utility";
import { MEMBERSHIP_PRODUCT } from "@/constant/account";
import { ApiAxios } from "@/helpers/axios";
import { MoneyFormat } from "@/helpers/common";
import { IMembershipItems } from "@/types";
import React, { useEffect, useState } from "react";

export const MembershipItems = () => {
  const [isItems, setIsItems] = useState<IMembershipItems[]>([]);
  const [isOrderBy, setIsOrderBy] = useState("total%7Ccount");
  const getMembershipItems = async () => {
    try {
      const response = await ApiAxios.get(`membership/items?ob=${isOrderBy}`);
      const data = response.data.data;
      setIsItems(data);
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
              Harga
            </th>
            <th scope="col" className="px-6 py-3">
              Item Beli
            </th>
            <th scope="col" className="px-6 py-3">
              Total Komisi
            </th>
          </tr>
        </thead>
        <tbody>
          {isItems.map((row, idx) => (
            <tr className="border-b dark:border-gray-700" key={idx}>
              <th
                scope="row"
                className="flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap"
              >
                <div className="overflow-hidden rounded-full min-w-max">
                  <Image
                    src="/assets/images/product/product1.png"
                    alt="Product"
                    className="w-10"
                  />
                </div>
                {row.name}
              </th>
              <td className="px-6 py-4">{MoneyFormat(parseInt(row.total))}</td>
              <td className="px-6 py-4">{row.count}</td>
              <td className="px-6 py-4">
                {MoneyFormat(parseInt(row.total) * parseInt(row.count))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
