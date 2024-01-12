"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navbar } from ".";
import { usePathname } from "next/navigation";
import { VideoHeaderHome } from "../video/VideoHeaderHome";
import { IconsDownScroll } from "../icons";

export const LayoutHeader = () => {
  const [isOutHeader, setIsOutHeader] = useState(false);
  const pathName = usePathname();
  const divHeaderHomeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleScroll() {
    const currentYOffset = window.pageYOffset;
    let heightHeaderHome = 700;
    if (divHeaderHomeRef.current) {
      heightHeaderHome = divHeaderHomeRef.current.clientHeight;
    }
    const outHeader =
      (pathName === "/" ? heightHeaderHome : 200) < currentYOffset;
    setIsOutHeader(outHeader);
  }
  return (
    <header>
      <div className={`w-full z-10 transition-all duration-300`}>
        <div
          className={`w-full transition-all duration-1000 ease-in-out body-font fixed
        ${
          isOutHeader
            ? "-top-0 bg-white dark:bg-dark-components shadow-lg z-20"
            : "bg-transparent -top-40 -z-10"
        }`}
        >
          <Navbar className=" text-brand-black" />
        </div>
      </div>
      {pathName === "/" ? (
        <div className="relative text-white" ref={divHeaderHomeRef}>
          <Navbar className="absolute top-0 left-0 right-0 z-20" />
          <VideoHeaderHome />
          <div className="absolute left-0 right-0 z-20 font-bold text-center md:text-xl lg:text-3xl bottom-10">
            <div className="flex justify-center my-4">
              <IconsDownScroll />
            </div>
          </div>
        </div>
      ) : (
        <Navbar className=" text-brand-black" />
      )}
    </header>
  );
};
