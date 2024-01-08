import { ProductWidgetLoading } from "@/components/product/widget/ProductWidgetLoading";
import { ROUTES } from "@/constant/routes";
import { useQuery } from "@/hooks/query";
import { getProducts } from "@/lib/endpoint-products";
import Link from "next/link";
import React from "react";

async function ProductsPage() {
  const data = await getProducts();
  return (
    <div>
      <div>
        <Link href={ROUTES.HOME}>Kembali</Link>
      </div>
      {data.map((row, idx) => (
        <p key={idx}>{row.name}</p>
      ))}
      <ProductWidgetLoading />
    </div>
  );
}

export default ProductsPage;
