import { TFlashSale } from "./tProduct";

export interface IItemCart {
  id: number;
  img: string;
  is_checked: number;
  name: string;
  note: string | null;
  price: number;
  qty: number;
  slug: string;
  stock: number;
  subtotal: string;
  flash_sale: TFlashSale | null;
}
