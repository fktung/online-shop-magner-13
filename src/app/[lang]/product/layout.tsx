"use client";
import { Layout } from "@/components/layout";
import React, { ReactNode } from "react";

const LayoutProduct = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default LayoutProduct;
