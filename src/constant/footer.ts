import { ROUTES } from "./routes";

export const FOOTER = {
  payment: [
    {
      id: 1,
      path: "#",
      image: `${process.env.NEXT_PUBLIC_URL_CDN}/asset/bank-logo/qris.png`,
      name: "payment-master-card",
      width: 34,
      height: 20,
    },
    {
      id: 2,
      path: "#",
      image: `${process.env.NEXT_PUBLIC_URL_CDN}/asset/bank-logo/bni.png`,
      name: "payment-visa",
      width: 50,
      height: 20,
    },
    {
      id: 3,
      path: "#",
      image: `${process.env.NEXT_PUBLIC_URL_CDN}/asset/bank-logo/bri.png`,
      name: "payment-paypal",
      width: 76,
      height: 20,
    },
    {
      id: 4,
      path: "#",
      image: `${process.env.NEXT_PUBLIC_URL_CDN}/asset/bank-logo/mandiri.png`,
      name: "payment-jcb",
      width: 26,
      height: 20,
    },
    {
      id: 5,
      path: "#",
      image: `${process.env.NEXT_PUBLIC_URL_CDN}/asset/bank-logo/cimb.png`,
      name: "payment-skrill",
      width: 39,
      height: 20,
    },
  ],
  collaborate: [
    {
      path: "#",
      image: `${process.env.NEXT_PUBLIC_URL_CDN}/asset/collaborate/B-logo.svg`,
      name: "BBIZ Enggin",
    },
    {
      path: "#",
      image: `${process.env.NEXT_PUBLIC_URL_CDN}/asset/collaborate/ISO.svg`,
      name: "ISO 9001",
    },
    {
      path: "#",
      image: `${process.env.NEXT_PUBLIC_URL_CDN}/asset/collaborate/apli.svg`,
      name: "Asosiasi Penjualan Langsung Indonesia",
    },
    {
      path: "#",
      image: `${process.env.NEXT_PUBLIC_URL_CDN}/asset/collaborate/kadinda-ja-tim.webp`,
      name: "kabinda jatim",
    },
  ],
  widgetsLink: [
    {
      id: 1,
      widgetTitle: "layout.footer.information.title",
      lists: [
        {
          id: 1,
          title: "layout.footer.information.aboutUs",
          path: "/about-us",
        },
        {
          id: 2,
          title: "layout.footer.information.tnc",
          path: "/tnc",
        },
        {
          id: 3,
          title: "layout.footer.information.polNPriv",
          path: "/policy-and-privacy",
        },
        {
          id: 4,
          title: "layout.footer.information.returnPolicy",
          path: "/return-policy",
        },
      ],
    },
    {
      id: 2,
      widgetTitle: "layout.footer.customerService.title",
      lists: [
        {
          id: 1,
          title: "layout.footer.customerService.dashboard",
          path: ROUTES.MEMBERSHIP,
        },
        {
          id: 2,
          title: "layout.footer.customerService.myProfile",
          path: ROUTES.ACCOUNT,
        },
        {
          id: 3,
          title: "layout.footer.customerService.myOrder",
          path: ROUTES.ACCOUNT_MY_ORDER,
        },
      ],
    },
  ],
};

export const SOSIAL = [
  {
    id: 1,
    url: "https://facebook.com/magnercare",
    image: "/assets/icons/social/facebook.svg",
    name: "facebook",
    width: 20,
    height: 20,
  },
  {
    id: 2,
    url: "https://twitter.com/magnercare",
    image: "/assets/icons/social/twitter.svg",
    name: "twitter",
    width: 20,
    height: 20,
  },
  {
    id: 3,
    url: "https://instagram.com/magnercare",
    image: "/assets/icons/social/instagram.svg",
    name: "instagram",
    width: 20,
    height: 20,
  },
  {
    id: 4,
    url: "https://youtube.com/@magnercare",
    image: "/assets/icons/social/youtube.svg",
    name: "youtube",
    width: 20,
    height: 20,
  },
];
