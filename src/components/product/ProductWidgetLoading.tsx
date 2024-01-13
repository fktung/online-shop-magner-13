import React from "react";
import Skeleton from "react-loading-skeleton";

export const ProductWidgetLoading = () => {
  return (
    <div
      className={`w-full p-4 mx-1 my-4 relative rounded-lg shadow-md cursor-pointer sm:mx-2 dark:shadow-brand-muted slider-card xs:min-w-[11rem] sm:max-w-[12rem]`}
    >
      <div className="h-24 mx-auto sm:h-36">
        <Skeleton className="h-full" />
      </div>
      <div className="my-4">
        <Skeleton className="max-w-[8rem]" />
        <Skeleton />
      </div>
      <div className="flex justify-end">
        <div className="h-full text-xs">
          <Skeleton className="ml-auto min-w-[4rem]" />
        </div>
      </div>
    </div>
  );
};
