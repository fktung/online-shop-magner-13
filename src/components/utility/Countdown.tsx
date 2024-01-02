import React, { useEffect, useRef, useState } from "react";
interface IProps {
  seconds: number;
}

export const Countdown = ({ seconds }: IProps) => {
  const [isCountdown, setIsCountdown] = useState(seconds);
  const timeId: any = useRef();
  useEffect(() => {
    timeId.current = setInterval(() => {
      setIsCountdown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timeId.current);
  }, []);
  useEffect(() => {
    if (isCountdown <= 0) {
      clearInterval(timeId.current);
    }
  }, [isCountdown]);
  return <>{isCountdown} Detik</>;
};
