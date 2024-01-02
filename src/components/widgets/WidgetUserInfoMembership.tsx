/* eslint-disable @next/next/no-img-element */
import { ROUTES } from "@/constant/routes";
import { Capitalize } from "@/helpers/common";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/hooks/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";

interface IProps {
  variants?: boolean;
}

export const WidgetUserInfoMembership = (props: IProps) => {
  const { variants } = props;
  const { isMembership, isStatusMembership } = useUser();
  const { isName } = useAuth();

  return (
    <div className={"justify-center gap-4 sm:flex lg:block"}>
      <div className="flex items-center gap-2 p-2 mb-2 border rounded-lg">
        <div className="overflow-hidden rounded-full">
          <img
            src="https://avatars.githubusercontent.com/u/97165289"
            alt="Profile"
            className="w-10"
          />
        </div>
        <p className="text-lg font-bold">{isName}</p>
      </div>
      {isMembership && isStatusMembership === "active" ? (
        <Link href={ROUTES.MEMBERSHIP}>
          <div className="flex items-center gap-2 px-2 py-4 my-2 bg-gray-100 dark:bg-dark-components rounded-xl">
            <div>
              <Image
                src={"/assets/icons/diamondOn.png"}
                alt="Status Membership"
                width={30}
                height={30}
              />
            </div>
            <p className="font-bold">
              Membership {Capitalize(isStatusMembership || "")}
            </p>
            <span className="ml-auto">
              <AiOutlineRight />
            </span>
          </div>
        </Link>
      ) : (
        <Link href={ROUTES.MEMBERSHIP_REGISTER}>
          <div className="flex items-center gap-2 px-2 py-4 my-2 bg-gray-100 dark:bg-dark-components rounded-xl">
            <div>
              <Image
                src={
                  isMembership && isStatusMembership === "active"
                    ? "/assets/icons/diamondOn.png"
                    : "/assets/icons/diamondOff.png"
                }
                alt="Status Membership"
                width={30}
                height={30}
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
