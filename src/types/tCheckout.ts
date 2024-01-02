export interface IDelivery {
  courier_hash: string;
  total_price: number;
  insurance_fee: number;
  must_use_insurance: boolean;
}

export type TLogistic = {
  code: string;
  company_name: string;
  id: number;
  logo_url: string;
  name: string;
};

export type TRate = {
  description: string;
  full_description: string;
  id: number;
  is_hubless: boolean;
  name: string;
  type: string;
};

export interface IDeliveries extends IDelivery {
  insurance_fee: number;
  max_day?: number;
  min_day?: number;
  must_use_insurance: boolean;
  logistic: TLogistic;
  rate: TRate;
}

export interface IFieldError {
  deliveryType: boolean;
  delivery: boolean;
  payment: boolean;
}
