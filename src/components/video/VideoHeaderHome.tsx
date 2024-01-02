import React from "react";

export const VideoHeaderHome = () => {
  return (
    <div className="relative grid items-start pt-16 overflow-hidden bg-black sm:pt-20 xl:pt-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="z-10 object-cover object-center w-full max-h-screen"
      >
        <source
          src={`${process.env.NEXT_PUBLIC_URL_CDN}/videos/magner.mp4`}
          type="video/mp4"
        />
      </video>
    </div>
  );
};
