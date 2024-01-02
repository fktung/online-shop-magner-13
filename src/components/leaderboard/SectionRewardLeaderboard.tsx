import { TReward } from "@/types/tTopMembership";
import { Image } from "../utility";
import { MoneyFormat } from "@/helpers/common";

interface ISectionRewardLeaderboardProps {
  banner: string;
  reward: TReward[];
}

export const SectionRewardLeaderboard = (
  props: ISectionRewardLeaderboardProps,
) => {
  const { banner, reward } = props;
  return (
    <div className="overflow-hidden border rounded-xl">
      <div className="justify-between px-2 py-2 xs:flex sm:px-4 bg-brand">
        <h3 className="font-black">REWARD</h3>
        <div className="flex flex-wrap items-center gap-3 text-sm"></div>
      </div>
      <div className="px-2 py-2">
        <Image
          alt="Banner Reward"
          src={process.env.NEXT_PUBLIC_URL_CDN + "/" + banner}
        />
        <div className="grid gap-2 my-4 ">
          {reward.map((row, idx) => (
            <div
              key={idx}
              className="flex h-20 overflow-hidden border bg-fill-base border-brand rounded-xl"
            >
              <div
                className={`h-20 sm:min-w-36 grid place-items-center bg-brand relative`}
              >
                <div className="absolute top-0 -bottom-[1px] -right-[1px] w-10 bg-fill-base reward-item-list"></div>
                <div className="absolute -top-1 right-5 -bottom-[3px] w-2 rotate-[23deg] bg-brand rounded-full"></div>
                <p className="ml-5 mr-10 min-w-max">TOP {idx + 1}</p>
              </div>
              <div className="flex w-full gap-4 mx-auto md:ml-5 place-items-center">
                <Image
                  src={process.env.NEXT_PUBLIC_URL_CDN + "/" + row.img}
                  alt={row.no}
                  className="w-10 h-10 rounded-full sm:w-14 sm:h-14"
                />
                <div>
                  <p className="font-black">{row.name}</p>
                  <p>
                    Minimum komisi yang di dapat :{" "}
                    <span>{MoneyFormat(+row.minimum_comition)}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
