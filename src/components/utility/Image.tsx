/* eslint-disable @next/next/no-img-element */
import React from "react";

interface IProps {
  src: string;
  alt: string;
  className?: string;
}

export const Image: React.FC<IProps> = props => {
  const { src, alt, className } = props;
  return (
    <>
      <img src={src} alt={alt} className={`${className || "w-full h-full"}`} />
    </>
  );
};
