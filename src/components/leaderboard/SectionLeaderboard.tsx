import React from "react";
import { IconCalendar } from "../icons/IconCalendar";
import { TableLeaderboard, Top3Leaderboard } from "./util";
import { ITopMembership } from "@/types/tTopMembership";
import { SeasonRange } from "@/helpers/common";

interface ISectionLeaderboardProps {
  data: ITopMembership;
}

export const SectionLeaderboard = (props: ISectionLeaderboardProps) => {
  const { data } = props;

  return (
    <div className="overflow-hidden border rounded-xl">
      <div className="justify-between px-2 py-2 xs:flex sm:px-4 bg-brand">
        <h3 className="font-black">Periode</h3>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <IconCalendar />
          <div className="flex gap-1">
            {SeasonRange(data.season.start, data.season.end)
              .split(" ")
              .map((item, i) => (
                <span key={i} className="inline-block">
                  {item}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div className="px-2 min-h-16 sm:px-4">
        <Top3Leaderboard topTen={data.top_ten} />
        <TableLeaderboard topTen={data.top_ten} myRank={data.my_rank} />
      </div>
    </div>
  );
};
