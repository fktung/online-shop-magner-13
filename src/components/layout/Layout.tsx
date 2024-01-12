"use client";
import React, { ReactNode } from "react";
import { MenuMobileBottom, MenuSidebar } from "./menu";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export interface ILayout {
  children: ReactNode;
  auth?: boolean;
  className?: string;
}

export const Layout: React.FC<ILayout> = (props) => {
  const { children, auth, className } = props;
  return (
    <main className="relative">
      <MenuSidebar />
      <Navbar />
      <div
        className={`w-full px-4 m-4 mx-auto md:px-8 md:my-8 max-w-8xl ${className}`}
      >
        {children}
      </div>
      <MenuMobileBottom />
      <div className="min-h-screen"></div>
      <Footer />
    </main>
  );
};
