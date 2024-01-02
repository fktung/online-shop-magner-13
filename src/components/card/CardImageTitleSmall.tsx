import React from "react";
import { Image } from "../utility";
import { TItemsJumbotron } from "@/constant/home";
import { t } from "i18next";
import { Capitalize } from "@/helpers/common";

interface IProps {
  data: TItemsJumbotron;
}

export const CardImageTitleSmall = (props: IProps) => {
  const { image, title } = props.data;
  return (
    <div className="flex items-center gap-4 p-3 transition-all duration-300 bg-white rounded dark:bg-dark">
      <div className="overflow-hidden rounded">
        <Image src={image} alt={t(`${title}`)} />
      </div>
      <div>
        <p className="text-xl font-bold">{Capitalize(t(`${title}`))}</p>
      </div>
    </div>
  );
};
