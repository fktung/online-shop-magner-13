import { Image } from "@/components/utility";
import { MEMBERSHIP_REFERRAL, STATUS_MEMBERSHIP } from "@/constant/account";
import { ApiAxios } from "@/helpers/axios";
import { MoneyFormat } from "@/helpers/common";
import { IMembershipRewards } from "@/types";
import React, { useEffect, useState } from "react";

export const MembershipRewards = () => {
  const [isPage, setIsPage] = useState("");
  const [isLimit, setIsLimit] = useState("");

  const [isMembershipRewards, setIsMembershipRewards] = useState<
    IMembershipRewards[]
  >([]);

  const getMembershipRewards = async (page: string = isPage) => {
    try {
      const response = await ApiAxios.get(`/membership/rewards?page=${page}`);
      const data = response.data.data;
      setIsMembershipRewards(data);
    } catch (error: any) {
      console.log("getMembershipSummary", error);
    }
  };

  useEffect(() => {
    getMembershipRewards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMembershipRewards && isMembershipRewards?.length < 1) {
    return (
      <div className="flex items-center justify-center h-56">
        <p className="text-2xl font-bold">Belum ada Reward</p>
      </div>
    );
  }

  return (
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
              Item Dibeli
            </th>
            <th scope="col" className="px-6 py-3">
              Komisi
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {isMembershipRewards.map((row, idx) => (
            <tr className="border-b dark:border-gray-700" key={idx}>
              <th
                scope="row"
                className="flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap"
              >
                <p className="font-bold">{row.user_referral.name}</p>
              </th>
              <td className="px-6 py-4">{row.level}</td>
              <td className="px-6 py-4">{row.order_item.qty}</td>
              <td className="px-6 py-4">{MoneyFormat(row.amount)}</td>
              <td className="px-6 py-4">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
