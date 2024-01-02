import React from "react";
import { MenuIcon } from "../menu";
import { IconsSosmed } from "@/components/icons";

export const FooterSosmed = () => {
  return (
    <div className="pb-10 mb-4 border-b sm:pb-0 col-span-full sm:col-span-1 md:col-span-3 sm:border-b-0 border-border-three sm:mb-0">
      <div className="flex flex-col gap-4 text-center sm:text-left max-w-[300px] mx-auto sm:ml-0 sm:mr-0 pb-6 sm:pb-5">
        <div className="flex justify-center sm:justify-start">
          <MenuIcon />
        </div>
        <p className="text-brand-muted text-sm leading-7 lg:leading-[27px] lg:text-15px">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eum
          officiis, impedit veniam quasi ea harum aperiam at nihil pariatur
          magnam eaque quis, maiores beatae voluptatum, velit ab odio
          consequuntur?
        </p>
      </div>
      <IconsSosmed />
    </div>
  );
};
