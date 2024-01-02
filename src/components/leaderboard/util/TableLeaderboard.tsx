import { LEADERBOARD } from "@/constant/leaderboard";
import { CensorCommission, MoneyFormat } from "@/helpers/common";
import { TMyRank, TTopTen } from "@/types/tTopMembership";
import React from "react";

interface ITableLeaderboardProps {
  topTen: TTopTen[];
  myRank?: TMyRank;
}

export const TableLeaderboard = (props: ITableLeaderboardProps) => {
  const { topTen, myRank } = props;

  return (
    <div className="overflow-hidden overflow-x-auto rounded-xl">
      <table className="w-full table-auto min-w-max">
        <thead className="bg-yellow-500">
          <tr>
            <th className="py-2">Rank</th>
            <th className="py-2">Name</th>
            <th className="py-2">Komisi</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {topTen.map(
            (item, idx) =>
              idx > 2 && (
                <tr key={idx} className="border-b">
                  <td className="py-2 mx-2">{idx + 1}</td>
                  <td className="py-2 mx-2">
                    <p className="capitalize">
                      {item.name
                        .split("")
                        .map((t, i) =>
                          i < 2 ? (
                            <span key={i}>{t}</span>
                          ) : i < 11 ? (
                            "*"
                          ) : null,
                        )}
                    </p>
                  </td>
                  <td className="py-2 mx-2">
                    {CensorCommission(MoneyFormat(Number(item.omset)))}
                  </td>
                </tr>
              ),
          )}
          {myRank && (
            <tr className="text-xl font-black bg-yellow-500 border-b">
              <td className="py-2 mx-4">{myRank.rank}</td>
              <td className="items-center justify-center gap-1 py-2 mx-4 sm:flex">
                <p>{myRank.name} </p>
                <span className="hidden sm:inline-block px-3 py-0.5 text-sm text-white bg-black rounded-md ">
                  Anda
                </span>
                <span className="block sm:hidden">
                  {MoneyFormat(Number(myRank.omset))}
                </span>
              </td>
              <td className="py-2 mx-4">
                <span className="hidden sm:inline-block">
                  {MoneyFormat(Number(myRank.omset))}
                </span>
                <span className="inline-block sm:hidden px-3 py-0.5 text-sm text-white bg-black rounded-md ">
                  Anda
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
