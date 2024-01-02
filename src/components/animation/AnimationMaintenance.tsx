import React from "react";
import animationData from "../../animations/maintenance.json";
import Lottie from "react-lottie";
import { IconCorporate } from "../icons";

export const AnimationMaintenance = () => {
  const defaultOption = {
    autoplay: true,
    loop: true,
    animationData,
  };
  return (
    <div className="h-screen sm:my-0">
      <div className="absolute top-0 left-0 right-0 grid my-4 place-items-center">
        <IconCorporate />
      </div>
      <Lottie options={defaultOption} />
    </div>
  );
};
