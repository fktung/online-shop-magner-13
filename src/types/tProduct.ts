import { TDate_at } from "./tOrder";

type TStokSku = {
  stock: number;
  sku: string;
};
type TCategory = {
  id: number;
  name: string;
};
interface ICategories extends TCategory {
  parent_id: number | null;
}
interface IVariants extends TStokSku {
  id: number;
  img: string;
  name: string;
  price: number;
}
export interface IProductDetailDescription extends TStokSku {
  id: number;
  name: string;
  price: number;
  variants: IVariants[];
  slug: string;
  imgs: string[];
  description: string;
  category: TCategory;
  sub_category: TCategory;
  sub_sub_category: TCategory;
  flash_sale: TFlashSale[];
}

export interface IProducts {
  id: number;
  name: string;
  price: number;
  slug: string;
  stock: number;
  imgs: string[];
  flash_sale: TFlashSale[];
  sold_amount?: string | null;
}

export interface TFlashSale {
  id: number;
  start: string;
  end: string;
  price: number;
  discount: number;
  margin_stock: number;
  discount_price: number;
  audit_trail: TDate_at;
}

export interface IProductsFlashSale extends TFlashSale {
  product: IProducts;
}
