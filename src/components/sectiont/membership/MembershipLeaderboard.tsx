import {
  SectionLeaderboard,
  SectionRewardLeaderboard,
  SectionRewardTnc,
} from "@/components/leaderboard";
import { LoadingLoadData } from "@/components/loading";
import { MEMBERSHIP_MENU_TAB_LEADERBOARD } from "@/constant/membership";
import { ApiAxios } from "@/helpers/axios";
import { SeasonRange } from "@/helpers/common";
import { ITopMembership } from "@/types/tTopMembership";
import React, { useEffect, useMemo, useState } from "react";

interface ITabMenuLeaderboard {
  id: number;
  label: string;
  isActive: boolean;
}

export const MembershipLeaderboard = ({ loadData }: { loadData: boolean }) => {
  const [isTopMembership, setIsTopMembership] = useState<ITopMembership>();
  const [isTabMenuLeaderBoard, setIsTabMenuLeaderBoard] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(false);

  const getTopMembership = async () => {
    try {
      const response = await ApiAxios.get("/membership/top-membership");
      setIsTopMembership(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("getTopMembership", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loadData) {
      setIsLoading(true);
      getTopMembership();
      setIsTabMenuLeaderBoard(tabMenuLeaderboard ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData]);

  const tabMenuLeaderboard = useMemo(() => {
    const tabMenu: ITabMenuLeaderboard[] = [];
    MEMBERSHIP_MENU_TAB_LEADERBOARD.map((item, idx) => {
      if (idx === 0) {
        const { isActive, ...other } = item;
        tabMenu.push({ ...other, isActive: true });
      } else {
        tabMenu.push(item);
      }
    });
    return tabMenu;
  }, []);

  const handleTabMenuLeaderboard = (row: number) => {
    const tabMenu: ITabMenuLeaderboard[] = [];
    MEMBERSHIP_MENU_TAB_LEADERBOARD.map((row, idx) => {
      tabMenu.push({ ...row });
    });
    tabMenu[row].isActive = true;
    setIsTabMenuLeaderBoard(tabMenu);
  };

  return (
    <div className="relative mt-4 min-h-[6rem]">
      {isTopMembership ? (
        <div className="grid gap-4">
          <div className="mx-auto tabs max-w-max">
            {isTabMenuLeaderBoard?.map((item, idx) => (
              <button
                key={idx}
                className={`tab tab-lifted ${item.isActive && "tab-active"}`}
                onClick={() => handleTabMenuLeaderboard(idx)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div
            className={`${
              !(isTabMenuLeaderBoard && isTabMenuLeaderBoard[0].isActive) &&
              "hidden"
            }`}
          >
            <SectionLeaderboard data={isTopMembership} />
          </div>
          <div
            className={`${
              !(isTabMenuLeaderBoard && isTabMenuLeaderBoard[1].isActive) &&
              "hidden"
            }`}
          >
            <SectionRewardLeaderboard
              banner={isTopMembership.banner}
              reward={isTopMembership.reward}
            />
          </div>
          <div
            className={`${
              !(isTabMenuLeaderBoard && isTabMenuLeaderBoard[2].isActive) &&
              "hidden"
            }`}
          >
            <SectionRewardTnc data={isTopMembership.term_and_condition} />
          </div>
        </div>
      ) : isLoading ? (
        <div className="absolute top-0 bottom-0 left-0 right-0 grid items-center">
          <LoadingLoadData />
        </div>
      ) : (
        <div className="grid h-24 my-3 text-xl font-bold text-center place-items-center">
          <p>Belum Ada Data Leaderboard</p>
        </div>
      )}
    </div>
  );
};
