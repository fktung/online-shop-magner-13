import React from "react";
import Lottie from "react-lottie";
import animationData from "../../animations/comingSoon.json";

export const AnimationComingSoonSection = () => {
  const defaultOption = {
    autoplay: true,
    loop: true,
    animationData,
  };
  return (
    <div className="min-h-[50vh] grid place-items-center sm:my-0">
      <Lottie options={defaultOption} />
    </div>
  );
};
