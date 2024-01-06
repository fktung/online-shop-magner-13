import { Image } from "@/components/utility";
import { Capitalize, FormatNumber, MoneyFormat } from "@/helpers/common";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/hooks/user";
import { IMembershipSummary } from "@/types";
import React from "react";
import { MembershipSectionEditRef } from "./MembershipSectionEditRef";

interface IMembershipBannerHeaderProps {
  membershipSummary?: IMembershipSummary;
}

export const MembershipBannerHeaderV2 = (
  props: IMembershipBannerHeaderProps,
) => {
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
          alt="Profile Image"
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
      {isMembership && (
        <div className="flex flex-wrap items-center justify-around mx-auto text-xs text-center md:text-sm sm:flex-row gap-y-6 md:mx-0">
          <MembershipSectionEditRef />
        </div>
      )}
    </div>
  );
};
