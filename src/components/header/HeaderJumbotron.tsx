/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Image } from "../utility";

export const HeaderJumbotron = () => {
  return (
    <div className="">
      <div className="h-[26rem] rounded-lg overflow-hidden shadow-lg">
        <Image src={`/assets/images/Jumbotron.png`} alt="Jumbotron" />
      </div>
    </div>
  );
};
