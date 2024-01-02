import { TDate_at } from "./tOrder";

export interface IMembershipSummary {
  referral_count: number;
  reward_total: number;
  reward_amount: number;
}

export interface IMembershipReferral {
  name: string;
  lvl: string;
  phone: string;
  status: string;
  email: string;
  referral_parent: string | null;
  total: string;
}

type TAuditTrail = {
  created_at: string;
  updated_at: string;
};

type TOrderItem2 = {
  id: number;
  img: string;
  name: string;
  price: number;
  qty: number;
  amount: number;
};

export interface IMembershipOrders {
  id: number;
  invoice: string;
  amount: number;
  total_amount: number;
  status: string;
  audit_trail: TAuditTrail;
  order_item: TOrderItem2;
}

export interface IMembershipReferralGlobal {
  user_id: string;
  name: string;
  phone: string;
  level: string;
  order_amount: string;
  order_count: string;
  order_item_qty: string;
}

type TOrderItem = {
  img: string;
  name: string;
  price: number;
  amount: number;
  qty: number;
  order?: {
    invoice: string;
  };
};

export interface IMembershipRewards {
  id: number;
  level: number;
  amount: number;
  status: string;
  audit_trail: TDate_at;
  order_item: TOrderItem;
  user_referral: {
    name: string;
  };
}
export interface IMembershipItems {
  img: string;
  name: string;
  count: string;
  total: string;
}

export interface IMembershipRewardsOrder {
  invoice: string;
  name: string;
  level: number;
  qty: number;
  price: number;
  amount: number;
  status: string;
}

export interface IAccountBank {
  id: number;
  nik: string;
  ktp: string;
  bank_name: string;
  owner: string;
  account_number: string;
  passbook: string;
  status: string;
  note: null;
  audit_trail: TDate_at;
}

export interface IReferrals {
  id: string;
  parent_id: string;
  name: string;
  lvl: string;
  phone: string;
  status: string;
  total: string;
}

export interface IReferralSummary {
  level: string;
  total_users: string;
  order_amount: string;
  total_order_count: string;
  total_order_item_qty: string;
}
