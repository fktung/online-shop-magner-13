"use client";
import { LayoutV2 } from "@/components/layout";
import { IPagination } from "@/types";
import React, { ReactNode } from "react";

function LayoutProduct({ children }: { children: ReactNode }) {
  return <LayoutV2>{children}</LayoutV2>;
}

export default LayoutProduct;
