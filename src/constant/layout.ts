import { ROUTES } from "./routes";

export type TSubMenu = {
  item: string;
  link: string;
};

export type TMenuLink = {
  idx?: number;
  label: string;
  path: string;
  link: string | TSubMenu[];
};

export const MENU: TMenuLink[] = [
  // {
  //   idx: 1,
  //   label: "layout.menu.automotive.title",
  //   path: "#",
  //   link: [
  //     {
  //       item: "Perawatan Mobil",
  //       link: ROUTES.PRODUCTS,
  //     },
  //     {
  //       item: "Perawatan Motor",
  //       link: ROUTES.PRODUCTS,
  //     },
  //   ],
  // },
  {
    idx: 1,
    label: "layout.menu.automotive.title",
    path: "/home",
    link: ROUTES.PRODUCTS,
  },
  {
    idx: 2,
    label: "layout.footer.information.aboutUs",
    path: "/about-us",
    link: ROUTES.ABOUT_US,
  },
  { idx: 3, label: "layout.menu.itemSearch", path: "/home", link: "#" },
  { idx: 4, label: "layout.menu.helpCenter", path: "/test2", link: "#" },
];

export const LOCAL_STORAGE = {
  templateText: "template-text-v2",
};
