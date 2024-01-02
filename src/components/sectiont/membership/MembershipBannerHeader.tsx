import { Image } from "@/components/utility";
import { Capitalize, FormatNumber, MoneyFormat } from "@/helpers/common";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/hooks/user";
import { IMembershipSummary } from "@/types";
import React, { useState } from "react";

interface IMembershipBannerHeaderProps {
  membershipSummary?: IMembershipSummary;
}

export const MembershipBannerHeader = (props: IMembershipBannerHeaderProps) => {
  const { membershipSummary } = props;
  const { isName } = useAuth();
  const { isStatusMembership, isAvatar, isMembership } = useUser();
  return (
    <div className="flex flex-col items-center justify-between gap-6 p-4 bg-gray-100 rounded-lg dark:bg-dark-components md:flex-row sm:p-6 ">
      <div className="grid items-center gap-4 mx-auto place-items-center sm:flex max-w-max md:mx-0">
        <Image
          src={
            process.env.NEXT_PUBLIC_URL_CDN +
            (isAvatar ? "/" + isAvatar : "/asset/noProfile.png")
          }
          alt="Status Membership"
          className="w-20 h-20 rounded-full"
        />
        <div className="text-center">
          <p className="text-xl font-black">{isName}</p>
          {isMembership && isStatusMembership === "active" && (
            <div className="flex items-center gap-2">
              <Image
                src={"/assets/icons/diamondOn.png"}
                alt="Status Membership"
                className="w-5"
              />
              <p className="text-xs font-bold opacity-80">
                Member {Capitalize(isStatusMembership || "")}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-around mx-auto text-xs text-center md:text-sm sm:flex-row gap-y-6 max-w-max md:mx-0">
        <div className="px-6">
          <p className="text-brand-muted">Pengikut Refferal</p>
          {membershipSummary ? (
            <p className="font-bold">
              {FormatNumber(membershipSummary?.referral_count)}
            </p>
          ) : (
            <div className="h-4 col-span-2 mt-1 rounded-full bg-slate-500 animate-pulse"></div>
          )}
        </div>
        <div className="px-6 sm:border-x">
          <p className="text-brand-muted">Total Pembelian</p>
          {membershipSummary ? (
            <p className="font-bold">
              {MoneyFormat(membershipSummary?.reward_amount)}
            </p>
          ) : (
            <div className="h-4 col-span-2 mt-1 rounded-full bg-slate-500 animate-pulse"></div>
          )}
        </div>
        <div className="px-6">
          <p className="text-brand-muted">Total Transaksi</p>
          {membershipSummary ? (
            <p className="font-bold">
              {FormatNumber(membershipSummary?.reward_total)}
            </p>
          ) : (
            <div className="h-4 col-span-2 mt-1 rounded-full bg-slate-500 animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
};
