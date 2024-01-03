import React, { useEffect, useRef, useState } from "react";
import { MenuMobileBottom, MenuSidebar } from "./menu";
import { ILayout } from "./Layout";
import { Footer } from "./Footer";
import { VideoHeaderHome } from "../video/VideoHeaderHome";
import { NavbarV2 } from "./NavbarV2";
import { IconsDownScroll } from "../icons";
import { useAuth } from "@/hooks/auth";
import { ROUTES } from "@/constant/routes";
import { getCookie, deleteCookie } from "cookies-next";
import { ApiAxios } from "@/helpers/axios";
import { ModalSearchProduct } from "../modal";
import MapContainer from "../maps/MapContainer";
import { useRouter, usePathname } from "next/navigation";
// import MapContainer from "@/components/maps/MapContainer";

export const LayoutV2 = (props: ILayout) => {
  const { children, auth } = props;
  const divHeaderHomeRef = useRef<HTMLDivElement | null>(null);
  const token = getCookie("_MToken");
  ApiAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const router = useRouter();
  const pathName = usePathname();
  const { isAuth, setIsAuth, setIsPreviousUrl, getAuthMe } = useAuth();
  const [isOutHeader, setOutHeader] = useState(false);

  useEffect(() => {
    const tokenStorage = getCookie("_MToken");
    const checkAuthAndContinue = async () => {
      if ((auth && tokenStorage) || (!isAuth && tokenStorage)) {
        if (isAuth) return;
        const check = await getAuthMe();
        if (!check) {
          deleteCookie("_MToken");
        }
        return;
      }
      if (auth && (!isAuth || !tokenStorage)) {
        setIsAuth(false);
        setIsPreviousUrl(pathName);
        router.push(ROUTES.LOGIN + "?path=" + pathName);
        return;
      }
    };

    checkAuthAndContinue();
  }, [isAuth, router, auth, setIsPreviousUrl, getAuthMe, setIsAuth, pathName]);

  useEffect(() => {
    // if (
    //   new Date().getTime() > 1701410400000 &&
    //   new Date().getTime() < 1701417600000
    // ) {
    //   router.push("/maintenance");
    //   return;
    // }
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
    setOutHeader(outHeader);
  }
  return (
    <main className="relative overflow-hidden">
      <MenuSidebar />
      <MenuMobileBottom />
      <header className={`w-full z-10 transition-all duration-300`}>
        <div
          className={`w-full transition-all duration-1000 ease-in-out body-font fixed
        ${
          isOutHeader
            ? "-top-0 bg-white dark:bg-dark-components shadow-lg z-20"
            : "bg-transparent -top-40 -z-10"
        }`}
        >
          <NavbarV2 />
        </div>
      </header>
      {pathName === "/" ? (
        <div className="relative text-white" ref={divHeaderHomeRef}>
          <NavbarV2 className="absolute top-0 left-0 right-0 z-20" />
          <VideoHeaderHome />
          <div className="absolute left-0 right-0 z-20 font-bold text-center md:text-xl lg:text-3xl bottom-10">
            <div className="flex justify-center my-4">
              <IconsDownScroll />
            </div>
          </div>
        </div>
      ) : (
        <NavbarV2 />
      )}
      <ModalSearchProduct />
      <MapContainer>
        <div className="w-full px-4 m-4 mx-auto text-sm sm:text-base md:px-8 md:my-8 max-w-8xl">
          {children}
        </div>
      </MapContainer>
      <Footer />
    </main>
  );
};
