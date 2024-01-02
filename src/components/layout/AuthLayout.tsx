import { IconCorporate } from "@/components/icons";
import { Footer } from "@/components/layout";
import { useLayout } from "@/hooks/layouts";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";
import { MenuMobileBottom } from "./menu";

interface IProps {
  children: ReactNode;
}

export const AuthLayout = (props: IProps) => {
  return (
    <div className="relative grid gap-8 pt-10 place-items-center">
      <MenuMobileBottom />
      <Link href={"/"}>
        <IconCorporate />
      </Link>
      <div className="min-h-[80vh] grid place-items-center">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};
