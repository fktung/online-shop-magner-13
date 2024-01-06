import React, { ReactNode, useEffect } from "react";
import { MenuSidebar } from "./menu";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Roboto } from "next/font/google";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import { ROUTES } from "@/constant/routes";

export interface ILayout {
  children: ReactNode;
  auth?: boolean;
}

export const Layout: React.FC<ILayout> = (props) => {
  const { children, auth } = props;
  const { isAuth, isPreviousUrl, setIsPreviousUrl } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth && !isAuth) {
      setIsPreviousUrl(router.asPath);
      router.push(ROUTES.LOGIN);
    }
  }, [isAuth, router, auth, setIsPreviousUrl]);
  return (
    <main className="relative">
      <MenuSidebar />
      <Navbar />
      <div className="w-full px-4 m-4 mx-auto md:px-8 md:my-8 max-w-8xl">
        {children}
      </div>
      <Footer />
    </main>
  );
};
