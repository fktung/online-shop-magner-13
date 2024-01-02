import React from "react";
import { ITEMS_JUMBOTRON } from "@/constant/home";
import { CardImageTitleSmall } from "../card";

export const HeaderUtilityJumbotron = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 my-4 overflow-auto transition-all duration-300 bg-gray-100 rounded-lg no-scrollbar lg:h-max h-44 lg:gap-10 sm:grid-cols-2 lg:grid-cols-4 dark:bg-dark-components">
      {ITEMS_JUMBOTRON.map((item, idx) => (
        <CardImageTitleSmall key={idx} data={item} />
      ))}
    </div>
  );
};
