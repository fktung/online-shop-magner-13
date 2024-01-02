export interface ITopMembership {
  banner: string;
  season: TSeason;
  reward: TReward[];
  top_ten: TTopTen[];
  my_rank?: TMyRank;
  term_and_condition: string;
}

export type TReward = {
  no: string;
  img: string;
  name: string;
  minimum_comition: string;
};

export type TTopTen = {
  id: string;
  img: string | null;
  name: string;
  omset: string;
};

export type TMyRank = {
  rank: string;
  omset: string;
  name: string;
};

export type TSeason = {
  no: number;
  start: string;
  end: string;
};
