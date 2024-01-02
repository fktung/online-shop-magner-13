/* eslint-disable react/jsx-key */
import { IconTop1, IconTop2, IconTop3 } from "@/components/icons/leaderboard";
import { Image } from "@/components/utility";
import { LEADERBOARD } from "@/constant/leaderboard";
import { CensorCommission, MoneyFormat } from "@/helpers/common";
import { TTopTen } from "@/types/tTopMembership";
import React from "react";

interface ITop3LeaderboardProps {
  topTen: TTopTen[];
}

export const Top3Leaderboard = (props: ITop3LeaderboardProps) => {
  const { topTen } = props;
  const iconsTop3 = [
    { content: <IconTop1 /> },
    { content: <IconTop2 /> },
    { content: <IconTop3 /> },
  ];

  return (
    <div className="grid gap-4 my-4 xs:grid-cols-2 sm:flex sm:justify-center place-items-center sm:place-items-end">
      {topTen.map(
        (item, idx) =>
          idx < 3 && (
            <div
              key={idx}
              className={`${idx === 0 && "xs:col-span-2 sm:pb-20"} ${
                idx === 1 && "sm:order-first"
              }`}
            >
              <div className="mx-auto overflow-hidden rounded-full w-28 h-28">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_URL_CDN +
                    (item.img ? "/" + item.img : "/asset/noProfile.png")
                  }
                  alt="Status Membership"
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <div className="my-2 font-black text-center">
                <p className="capitalize">
                  {item.name.split("").map((t, i) =>
                    i < 2 ? (
                      <span key={i}>{t}</span>
                    ) : i < 11 ? (
                      <span key={i} className="inline-block">
                        *
                      </span>
                    ) : null,
                  )}
                </p>
                <p>{CensorCommission(MoneyFormat(Number(item.omset)))}</p>
              </div>
              <div className="w-36">{iconsTop3[idx].content}</div>
            </div>
          ),
      )}
    </div>
  );
};
