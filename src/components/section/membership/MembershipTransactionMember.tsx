import { InputForm } from "@/components/input";
import { Pagination } from "@/components/pagination";
import { ApiAxios } from "@/helpers/axios";
import { Capitalize, MoneyFormat } from "@/helpers/common";
import { IMembershipRewardsOrder, IPagination } from "@/types";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

export const MembershipTransactionMember = () => {
  const [isRewardOrder, setIsRewardOrder] = useState<IMembershipRewardsOrder[]>(
    [],
  );
  const [isPage, setIsPage] = useState("1");
  const [isLimit, setIsLimit] = useState("10");
  const [isPagination, setIsPagination] = useState<IPagination>();
  const [isSearch, setIsSearch] = useState<string>();

  const getMembershipItems = async (page: string = isPage) => {
    const search = isSearch ? `&keyword=${isSearch}` : "";
    try {
      const response = await ApiAxios.get(
        `membership/rewards/order?page=${page}&limit=${isLimit}${search}`,
      );
      const data = response.data.data;
      setIsRewardOrder(data);
      setIsPagination(response.data.metadata);
      setIsPage(response.data.metadata.current_page);
    } catch (error: any) {
      console.log("getMembershipItems", error);
    }
  };

  useEffect(() => {
    getMembershipItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getMembershipItems();
  };

  return (
    <div className="my-4 border-t">
      <div className="flex items-center justify-between mx-2 my-4">
        <p className="text-2xl font-black">Transaksi Member</p>
        <div className="grid place-items-center">
          <form onSubmit={handleSearch}>
            <InputForm
              name="search"
              value={isSearch as string}
              onChange={e => setIsSearch(e.target.value)}
              className="input-sm"
              type="text"
              placeholder="Search"
            >
              <button
                type="submit"
                className="absolute top-0 bottom-0 right-0 px-3"
              >
                <IoSearch />
              </button>
            </InputForm>
          </form>
        </div>
      </div>
      <div className="relative my-6 overflow-hidden overflow-x-auto no-scrollbar rounded-xl">
        <table className="w-full text-sm text-left text-brand-muted dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-dark-components">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Level
              </th>
              <th scope="col" className="px-6 py-3">
                Item Beli
              </th>
              <th scope="col" className="px-6 py-3">
                Harga Item
              </th>
              <th scope="col" className="px-6 py-3">
                Komisi
              </th>
              <th scope="col" className="px-6 py-3">
                Status Order
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
                <td className="px-6 py-4">{row.level}</td>
                <td className="px-6 py-4">{row.qty}</td>
                <td className="px-6 py-4">{MoneyFormat(row.price)}</td>
                <td className="px-6 py-4">{MoneyFormat(row.amount)}</td>
                <td className="px-6 py-4">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isRewardOrder && isRewardOrder?.length < 1 && (
          <div className="flex items-center justify-center my-4">
            <p className="text-2xl font-bold">
              Belum ada Reward Member Transaksi
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center mx-auto mt-4 scale-75">
        <Pagination
          total_pages={isPagination?.total_pages || 0}
          getIsPage={getMembershipItems}
        />
      </div>
    </div>
  );
};
