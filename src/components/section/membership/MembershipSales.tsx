import { Pagination } from "@/components/pagination";
import { ApiAxios } from "@/helpers/axios";
import { MoneyFormat } from "@/helpers/common";
import { IMembershipRewards, IPagination } from "@/types";
import React, { useEffect, useState } from "react";

export const MembershipSales = () => {
  const [isPage, setIsPage] = useState("1");
  const [isLimit, setIsLimit] = useState("10");
  const [isPagination, setIsPagination] = useState<IPagination>();

  const [isMembershipRewardsSales, setIsMembershipRewardsSales] = useState<
    IMembershipRewards[]
  >([]);

  const getMembershipRewards = async (page: string = isPage) => {
    try {
      const response = await ApiAxios.get(
        `/membership/rewards/sales?page=${page}&limit=${isLimit}`,
      );
      const data = response.data.data;
      setIsMembershipRewardsSales(data);
      setIsPagination(response.data.metadata);
      setIsPage(response.data.metadata.current_page);
    } catch (error: any) {
      console.log("getMembershipSummary", error);
    }
  };

  useEffect(() => {
    getMembershipRewards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMembershipRewardsSales && isMembershipRewardsSales?.length < 1) {
    return (
      <div className="flex items-center justify-center h-56">
        <p className="text-2xl font-bold">Belum ada Reward Total Sales</p>
      </div>
    );
  }

  return (
    <div className="my-4 border-t">
      <div className="flex items-center justify-between mx-2 my-4">
        <p className="text-2xl font-black">Total Sales</p>
        <p>
          Halaman {isPage} Tampil{" "}
          {isMembershipRewardsSales.reduce((n, i) => i.order_item.qty + n, 0)}{" "}
          Item Dibeli
        </p>
      </div>
      <div className="relative my-4 overflow-hidden overflow-x-auto no-scrollbar rounded-xl">
        <table className="w-full text-sm text-left text-brand-muted dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-dark-components">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name Produk
              </th>
              <th scope="col" className="px-6 py-3">
                Item Dibeli
              </th>
              <th scope="col" className="px-6 py-3">
                Total Transaksi
              </th>
              <th scope="col" className="px-6 py-3">
                Komisi
              </th>
              <th scope="col" className="px-6 py-3">
                Status Komisi
              </th>
            </tr>
          </thead>
          <tbody>
            {isMembershipRewardsSales.map((row, idx) => (
              <tr className="border-b dark:border-gray-700" key={idx}>
                <th
                  scope="row"
                  className="flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap"
                >
                  <p className="font-bold">{row.order_item.name}</p>
                </th>
                <td className="px-6 py-4">
                  <p className="space-x-2">
                    <span>{row.order_item.qty}</span>
                    <span className="text-xs text-brand">
                      {row.order_item.price * row.order_item.qty !==
                        row.order_item.amount && "Flash Sale"}
                    </span>
                  </p>
                </td>
                <td className="px-6 py-4">
                  {MoneyFormat(row.order_item.amount)}
                </td>
                <td className="px-6 py-4">{MoneyFormat(row.amount)}</td>
                <td className="px-6 py-4">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mx-auto mt-4 scale-75">
        <Pagination
          total_pages={isPagination?.total_pages || 0}
          getIsPage={getMembershipRewards}
        />
      </div>
    </div>
  );
};
