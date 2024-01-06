import { Pagination } from "@/components/pagination";
import { ApiAxios } from "@/helpers/axios";
import { MoneyFormat } from "@/helpers/common";
import { IBalance, IPagination, TBalanceCommission } from "@/types";
import React, { useEffect, useState } from "react";

export const MembershipCommissionSummary = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPage, setIsPage] = useState("1");
  const [isLimit, setIsLimit] = useState("10");
  const [isPagination, setIsPagination] = useState<IPagination>();
  const [isBalancesCommission, setIsBalancesCommission] =
    useState<IBalance[]>();
  const [isCommission, setIsCommission] = useState<TBalanceCommission>({
    total_withdraw: "0",
    pending_commission: "0",
    total_commission: "0",
  });

  const getBalanceCommission = async (page: string = isPage) => {
    try {
      const response = await ApiAxios.get(
        `balance/commission?page=${page}&limit=${isLimit}`,
      );
      const data = response.data;
      setIsBalancesCommission(data.data);
      setIsPagination(data.metadata);
      setIsPage(data.metadata.current_page);
    } catch (error: any) {
      console.log("getBalanceCommission", error);
    }
  };

  const getCommission = async () => {
    setIsLoading(true);
    try {
      const response = await ApiAxios.get("/balance/commission/summary");
      const data = response.data.data;
      setIsCommission(data);
      getBalanceCommission();
    } catch (error) {
      console.log("getCommission", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCommission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pb-4">
      {/* <div className="flex flex-col items-center justify-between gap-6 p-4 overflow-hidden bg-gray-100 rounded-lg dark:bg-dark-components md:flex-row sm:p-6 "></div> */}
      <div className="flex flex-wrap justify-around gap-4 p-4 my-4 overflow-hidden text-lg font-black text-center bg-gray-100 rounded-lg dark:bg-dark-components md:flex-row">
        <div className="min-w-[180px]">
          <p>Total Komisi</p>
          <p className="text-2xl">
            {MoneyFormat(+isCommission.total_commission)}
          </p>
        </div>
        <div className="min-w-[180px]">
          <p>Komisi Pending</p>
          <p className="text-2xl">
            {MoneyFormat(+isCommission.pending_commission)}
          </p>
        </div>
        <div className="min-w-[180px]">
          <p>Komisi Sudah Ditarik</p>
          <p className="text-2xl">
            {MoneyFormat(+isCommission.total_withdraw)}
          </p>
        </div>
      </div>

      <div className="relative my-6 overflow-hidden overflow-x-auto no-scrollbar rounded-xl">
        <h3 className="m-2 text-xl font-black">Riwayat komisi</h3>
        <table className="w-full text-sm text-left text-brand-muted dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-dark-components">
            <tr>
              <th scope="col" className="px-6 py-3">
                Reference
              </th>
              <th scope="col" className="px-6 py-3">
                Total Transaksi
              </th>
              <th scope="col" className="px-6 py-3">
                Before
              </th>
              <th scope="col" className="px-6 py-3">
                After
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {isBalancesCommission?.map((row, idx) => (
              <tr className="border-b dark:border-gray-700" key={idx}>
                <td className="px-6 py-4">{row.reference}</td>
                <td className="px-6 py-4 ">
                  <span className="min-w-max">{MoneyFormat(row.amount)}</span>
                </td>
                <td className="px-6 py-4 ">
                  <span className="min-w-max">{MoneyFormat(row.before)}</span>
                </td>
                <td className="px-6 py-4 ">
                  <span className="min-w-max">{MoneyFormat(row.after)}</span>
                </td>
                <td className="px-6 py-4">{row.withdraw?.status ?? ""}</td>
                <td className="px-6 py-4 capitalize">{row.type}</td>
                <td className="px-6 py-4">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mx-auto mt-4 scale-75">
        <Pagination
          total_pages={isPagination?.total_pages || 0}
          getIsPage={getBalanceCommission}
        />
      </div>
    </div>
  );
};
