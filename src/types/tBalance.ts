import { TDate_at } from "./tOrder";

export interface IBalance {
  id: number;
  reference: string;
  type: string;
  amount: number;
  before: number;
  after: number;
  description: string;
  audit_trail: TDate_at;
  withdraw: TWithdraw;
  reward: any;
}

type TWithdraw = {
  id: number;
  status: string;
  amount: number;
  file: string;
};

export type TBalanceCommission = {
  total_withdraw: string;
  pending_commission: string;
  total_commission: string;
};
