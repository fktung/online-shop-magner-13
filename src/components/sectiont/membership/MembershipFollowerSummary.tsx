import { ApiAxios } from "@/helpers/axios";
import { MoneyFormat } from "@/helpers/common";
import { IReferralSummary } from "@/types";
import React, { useEffect, useState } from "react";

export const MembershipFollowerSummary = () => {
  const [isSummary, setIsSummary] = useState<IReferralSummary[]>([]);
  const [isShowAllRow, setIsShowAllRow] = useState<number>(5);

  async function getReferralSummary() {
    try {
      const result = await ApiAxios.get("/membership/referrals/summary");
      const data = result.data.data;
      setIsSummary(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getReferralSummary();
  }, []);
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["getReferralSummary"],
  //   queryFn: getReferralSummary,
  // });
  // console.log(isLoading);
  // console.log(data);
  // console.log(error);
  return (
    <div className="py-2 border-t">
      <p className="pb-2 mx-2 text-xl font-black">Summary</p>
      <div className="w-full overflow-x-auto no-scrollbar">
        <table className="w-full text-sm text-left text-brand-muted dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-dark-components">
            <tr>
              <th scope="col" className="px-6 py-3">
                Level
              </th>
              <th scope="col" className="px-6 py-3">
                Total user
              </th>
              <th scope="col" className="px-6 py-3">
                Total Order
              </th>
              <th scope="col" className="px-6 py-3">
                Total Item Dibeli
              </th>
            </tr>
          </thead>
          <tbody className="relative">
            {isSummary.map(
              (row, idx) =>
                idx < isShowAllRow && (
                  <tr key={idx} className="border-b dark:border-gray-700">
                    <td className="px-6 py-4">
                      <p>Level {row.level}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{row.total_users} User</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{MoneyFormat(+row.order_amount)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{row.total_order_item_qty} Item</p>
                    </td>
                  </tr>
                ),
            )}
            {isSummary.length > isShowAllRow && (
              <tr>
                <td className="h-2">
                  <div className="absolute left-0 right-0 text-center -bottom-0 bg-gradient-to-t from-gray-200 to-transparent">
                    <button
                      className="transition-all duration-300 text-brand hover:text-black"
                      onClick={() => setIsShowAllRow(isSummary.length)}
                    >
                      Show More
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="text-gray-700 uppercase bg-gray-200 dark:bg-dark-components">
            <tr>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                {isSummary.reduce((total, num) => total + +num.total_users, 0)}{" "}
                User
              </th>
              <th scope="col" className="px-6 py-3">
                {MoneyFormat(
                  isSummary.reduce(
                    (total, num) => total + +num.order_amount,
                    0,
                  ),
                )}
              </th>
              <th scope="col" className="px-6 py-3">
                {isSummary.reduce(
                  (total, num) => total + +num.total_order_item_qty,
                  0,
                )}{" "}
                Item
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
