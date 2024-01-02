export type TDate_at = {
  created_at: string;
  updated_at: string;
};

export type TOrderItems = {
  id: number;
  img: string;
  name: string;
  price: number;
  qty: number;
  amount: number;
  note: string | null;
};

export interface IPaymentOrder {
  id: number;
  name: string;
  provider: string;
  code: string;
  fee: number;
  status: string;
  expired_at: string;
  action: {
    bank_code: string;
    account_number: string;
    channel_code?: string;
    id?: string;
    qr_string?: string;
    type?: string;
  };
  callback: any;
  audit_trail: TDate_at;
  payment: {
    id: 1;
    name: string;
    group: string;
    img: string;
    fee_flat: number;
    fee_percentage: number;
    min_amount: number;
    max_amount: number;
    how_to_pay: IHow_to_pay[] | null;
  };
}

export interface IHow_to_pay {
  name: string;
  header: THow_to_payHeader[];
}

export type THow_to_payHeader = {
  name: string;
  content: string[];
};

export type TPayload = {
  origin: {
    lat: string;
    lng: string;
    area_id: number;
    suburb_id: number;
  };
  courier: {
    max_day: number;
    min_day: number;
    rate_id: number;
    rate_name: string;
    rate_type: string;
    logistic_name: string;
    logistic_logo_url: string;
  };
  coverage: string;
  consignee: {
    name: string;
    phone_number: string;
  };
  consigner: {
    name: string;
    phone_number: string;
  };
  destination: {
    lat: string;
    lng: string;
    address: string;
    area_id: number;
    city_id: number;
    postcode: string;
    area_name: string;
    city_name: string;
    direction: string;
    suburb_id: number;
    country_id: number;
    province_id: number;
    suburb_name: string;
    country_name: string;
    province_name: string;
  };
  external_id: string;
  payment_type: string;
};

export interface IShipping extends TPayload {
  audit_trail: TDate_at;
  id: number;
  reference_id: string | null;
  is_cod: boolean;
  fee: number;
  is_insurance: boolean;
  insurance_fee: number;
  tracking_logs: any;
  // payload: ;
}

export type TOrderLog = {
  audit_trail: TDate_at;
  description: string;
  id: number;
  status: string;
};

export interface IOrder {
  id: string;
  invoice: string;
  amount: number;
  status: string;
  total_amount: number;
  audit_trail: TDate_at;
  order_items: TOrderItems[];
  order_logs: TOrderLog[];
  payment: IPaymentOrder;
  payment_fee: number;
  shipping: IShipping;
  shipping_fee: number;
}

export interface IMyOrder {
  id: string;
  invoice: string;
  amount: number;
  payment_fee: number;
  shipping_fee: number;
  total_amount: number;
  status: string;
  audit_trail: TDate_at;
  order_items: TOrderItems[];
}

type TStatusTracking = {
  code: number;
  description: string;
  name: string;
};

export interface IStatusTracking {
  status: TStatusTracking;
}
