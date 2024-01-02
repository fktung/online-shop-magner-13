/* eslint-disable @next/next/no-img-element */
import { ROUTES } from "@/constant/routes";
import { Capitalize } from "@/helpers/common";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/hooks/user";
import Link from "next/link";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Image } from "../utility";

interface IProps {
  variants?: boolean;
}

export const WidgetUserInfoMembershipV2 = (props: IProps) => {
  const { variants } = props;
  const { isMembership, isStatusMembership, isAvatar } = useUser();
  const { isName } = useAuth();

  return (
    <div className={"justify-center gap-4"}>
      <div className="flex items-center w-full max-w-lg gap-2 p-2 mx-auto mb-2 border rounded-lg">
        <div className="overflow-hidden rounded-full min-w-max">
          <img
            src={`${process.env.NEXT_PUBLIC_URL_CDN}${
              isAvatar ? "/" + isAvatar : "/asset/noProfile.png"
            }`}
            alt="Profile"
            className="w-12 h-12"
          />
        </div>
        <div className="space-y-1 overflow-hidden">
          <p className="text-lg font-bold truncate text-ellipsis ...">
            {isName}
          </p>
          {isMembership && isStatusMembership === "active" && (
            <div className="flex items-center gap-2">
              <div>
                <Image
                  src={"/assets/icons/diamondOn.png"}
                  alt="Status Membership"
                />
              </div>
              <p className="text-xs font-bold opacity-80">
                Member {Capitalize(isStatusMembership || "")}
              </p>
            </div>
          )}
        </div>
      </div>
      {isMembership && isStatusMembership === "active" ? null : (
        <Link
          href={
            isStatusMembership
              ? ROUTES.MEMBERSHIP_WAITING
              : ROUTES.MEMBERSHIP_REGISTER
          }
        >
          <div className="flex items-center max-w-lg gap-2 px-2 py-4 mx-auto my-2 bg-gray-100 dark:bg-dark-components rounded-xl">
            <div>
              <Image
                src={
                  isMembership && isStatusMembership === "active"
                    ? "/assets/icons/diamondOn.png"
                    : "/assets/icons/diamondOff.png"
                }
                alt="Status Membership"
              />
            </div>
            <p className="font-bold">Gabung Membership</p>
            <span className="ml-auto">
              <AiOutlineRight />
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};
