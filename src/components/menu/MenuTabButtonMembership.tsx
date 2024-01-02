import { MEMBERSHIP_MENU_TAB_BUTTON } from "@/constant/membership";
import { ROUTES } from "@/constant/routes";
import { FormatNumber, MoneyFormat } from "@/helpers/common";
import { IMembershipSummary } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

interface IProps {
  setTabButton: (props: boolean[]) => void;
  tabSelling: boolean[];
  membershipSummary?: IMembershipSummary;
}

export const MenuTabButtonMembership = (props: IProps) => {
  const router = useRouter();
  const { setTabButton, tabSelling, membershipSummary } = props;
  const [isSummary, setIsSummary] = useState<string[]>([]);

  const handelTabButton = (i: number) => {
    const newSetTab = [...tabSelling];
    newSetTab[i] = true;
    setTabButton(newSetTab);
  };

  useMemo(() => {
    if (membershipSummary) {
      setIsSummary([
        FormatNumber(membershipSummary.reward_total),
        FormatNumber(membershipSummary.referral_count),
        MoneyFormat(membershipSummary.reward_amount),
        "",
      ]);
    }
  }, [membershipSummary]);

  return (
    <div className="grid gap-4 px-2 mt-6 font-extrabold sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 tabs">
      {MEMBERSHIP_MENU_TAB_BUTTON.map((row, idx) => (
        <button
          key={idx}
          onClick={() => handelTabButton(idx)}
          className={`grid items-start w-full h-20 p-2 transition-all duration-300 border rounded-lg min-h-12 hover:ring-1 hover:shadow-xl shadow-brand ring-brand ${
            idx === 2 &&
            "order-first md:order-none lg:order-first xl:order-none sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1"
          }`}
        >
          <p className="">{row.label}</p>
          <p className="text-xl sm:text-2xl">{isSummary[idx]}</p>
        </button>
      ))}
    </div>
  );
};
