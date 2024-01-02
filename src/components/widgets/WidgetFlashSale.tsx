import React, { useEffect, useRef, useState } from "react";
import { IconFlashSale } from "../icons";
import { TFlashSale } from "@/types";
import { MoneyFormat } from "@/helpers/common";
import { useLayout } from "@/hooks/layouts";
import { WidgetCountdownUnit } from "./WidgetCountdownUnit";

interface IWidgetFlashSaleProps {
  flashSale: TFlashSale[];
  getProductById: () => void;
}

export const WidgetFlashSale = (props: IWidgetFlashSaleProps) => {
  const { flashSale, getProductById } = props;
  const [isTensHours, setIsTensHours] = useState<number>(0);
  const [isUnitsHours, setIsUnitsHours] = useState<number>(0);
  const [isTensMinutes, setIsTensMinutes] = useState<number>(0);
  const [isUnitsMinutes, setIsUnitsMinutes] = useState<number>(0);
  const [isTensSeconds, setIsTensSeconds] = useState<number>(0);
  const [isUnitsSeconds, setIsUnitsSeconds] = useState<number>(0);
  const [isAnimation, setIsAnimation] = useState(true);

  let unitSeconds: string[];
  let unitMinutes: string[];
  let unitHours: string[];
  const interval = useRef<NodeJS.Timer | undefined>();

  const startTime = () => {
    const dateConvert = new Date(flashSale[0].end);
    const expired = dateConvert.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    const targetTimeExpired = expired;
    const targetTime = new Date(targetTimeExpired).getTime();
    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const screenWidth = window.innerWidth < 640 ? 16 : 20;

      if (distance <= 0) {
        getProductById();
        clearInterval(interval.current);
        setIsTensHours(0);
        setIsUnitsHours(0);
        setIsTensMinutes(0);
        setIsUnitsMinutes(0);
        setIsTensSeconds(0);
        setIsUnitsSeconds(0);
      } else {
        unitHours = hours.toString().split("");
        unitMinutes = minutes.toString().split("");
        unitSeconds = seconds.toString().split("");

        // setIsHours(hours);
        if (hours < 10) {
          setIsTensHours(0);
          setIsUnitsHours(Number(unitHours[0]) * screenWidth);
          if (unitHours[0] == "0" && distance >= 1000 * 60 * 60) {
            setTimeout(() => {
              setIsAnimation(false);
              setIsTensHours(6 * screenWidth);
              setIsUnitsHours(screenWidth * 10);
            }, 500);
          } else {
            setIsAnimation(true);
          }
        } else {
          setIsTensHours(Number(unitHours[0]) * screenWidth);
          setIsUnitsHours(Number(unitHours[1]) * screenWidth);
          if (unitHours[1] == "0" && minutes == 0 && seconds == 0) {
            setTimeout(() => {
              setIsAnimation(false);
              setIsUnitsHours(screenWidth * 10);
            }, 500);
          } else {
            setIsAnimation(true);
          }
        }

        // setIsMinutes(minutes);
        if (minutes < 10) {
          setIsTensMinutes(0);
          setIsUnitsMinutes(Number(unitMinutes[0]) * screenWidth);
          if (unitMinutes[0] == "0" && distance >= 1000 * 60 && seconds == 0) {
            setTimeout(() => {
              setIsAnimation(false);
              setIsTensMinutes(6 * screenWidth);
              setIsUnitsMinutes(screenWidth * 10);
            }, 500);
          } else {
            setIsAnimation(true);
          }
        } else {
          setIsTensMinutes(Number(unitMinutes[0]) * screenWidth);
          setIsUnitsMinutes(Number(unitMinutes[1]) * screenWidth);
          if (unitMinutes[1] == "0" && seconds == 0) {
            setTimeout(() => {
              setIsAnimation(false);
              setIsUnitsMinutes(screenWidth * 10);
            }, 500);
          } else {
            setIsAnimation(true);
          }
        }

        // setIsSeconds(seconds);
        if (seconds < 10) {
          setIsTensSeconds(0);
          setIsUnitsSeconds(Number(unitSeconds[0]) * screenWidth);
          if (unitSeconds[0] == "0") {
            setTimeout(() => {
              setIsAnimation(false);
              setIsTensSeconds(6 * screenWidth);
              setIsUnitsSeconds(screenWidth * 10);
            }, 500);
          } else {
            setIsAnimation(true);
          }
        } else {
          setIsTensSeconds(Number(unitSeconds[0]) * screenWidth);
          setIsUnitsSeconds(Number(unitSeconds[1]) * screenWidth);
          if (unitSeconds[1] == "0") {
            setTimeout(() => {
              setIsAnimation(false);
              setIsUnitsSeconds(screenWidth * 10);
            }, 500);
          } else {
            setIsAnimation(true);
          }
        }
      }
    }, 1000);
  };

  useEffect(() => {
    startTime();
    return () => {
      clearInterval(interval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(window.innerWidth);
  return (
    <div className="overflow-hidden rounded-md bg-zinc-100">
      <div className="items-center justify-between px-4 py-2 text-white xs:flex bg-brand ">
        <IconFlashSale />
        <div className="flex justify-end gap-2 text-xs sm:text-sm">
          <p className="font-black tracking-[0.15em] text-white">
            BERAKHIR DALAM
          </p>
          <div className="relative flex justify-end pl-3 pr-2 overflow-hidden text-white bg-black rounded-md">
            <div className="relative w-2.5">
              <WidgetCountdownUnit
                animation={isAnimation}
                position={isTensHours}
                className="right-1"
                unitNumber={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
              />
            </div>
            <div className="relative w-2.5">
              <WidgetCountdownUnit
                animation={isAnimation}
                position={isUnitsHours}
                className="right-1"
                unitNumber={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
              />
            </div>
            <div className="pr-1.5 font-black">:</div>
            <div className="relative w-2.5">
              <WidgetCountdownUnit
                animation={isAnimation}
                position={isTensMinutes}
                className="right-1"
                unitNumber={[0, 1, 2, 3, 4, 5, 0]}
              />
            </div>
            <div className="relative w-2.5">
              <WidgetCountdownUnit
                animation={isAnimation}
                position={isUnitsMinutes}
                className="right-1"
                unitNumber={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
              />
            </div>
            <div className="pr-1.5 font-black">:</div>
            <div className="relative w-2.5">
              <WidgetCountdownUnit
                animation={isAnimation}
                position={isTensSeconds}
                className="right-1"
                unitNumber={[0, 1, 2, 3, 4, 5, 0]}
              />
            </div>
            <div className="relative w-2.5">
              <WidgetCountdownUnit
                animation={isAnimation}
                position={isUnitsSeconds}
                className="right-1"
                unitNumber={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 p-4">
        <p className="font-extrabold line-through opacity-70">
          {MoneyFormat(flashSale[0].price)}
        </p>
        <p className="text-3xl font-extrabold">
          {MoneyFormat(flashSale[0].discount_price)}
        </p>
        <p className="text-xs bg-yellow-500 py-0.5 rounded-md px-1 font-black scale-110">
          {flashSale[0].discount}% off
        </p>
      </div>
    </div>
  );
};
