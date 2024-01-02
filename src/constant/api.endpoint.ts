export const DOMAIN_API = {
  magner: process.env.NEXT_PUBLIC_API_APP,
};

export const ENDPOINT = {
  balance: {
    DEFAULT: "/balance",
    commission: "/balance/commission",
    commissionSummary: "/balance/commission",
    withdraw: "/balance/withdraw",
  },
  user: {
    ip: "/user/ip",
    referral: "/user/referral",
    referralCheck: "/user/referral/check",
    countCart: "/user/count-cart",
  },
  cart: {
    DEFAULT: "/carts",
    toggle: "/carts/toggle",
    selected: "/carts/selected",
  },
  products: {
    DEFAULT: "/products",
  },
  flashSale: {
    DEFAULT: "/flash-sale",
  },
  authUser: {
    register: "/auth/user/register",
    registerCheck: "/auth/user/register/check",
  },
  coinReedem: {
    DEFAULT: "/coin-reedem",
  },
  coinRewards: {
    DEFAULT: "/coin-reward",
  },
};
