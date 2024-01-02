import Link from "next/link";
import React from "react";

export const Copyright = () => {
  return (
    <div className="text-xs md:text-sm md:text-start">
      <p className="text-brand-dark leading-7 lg:leading-[27px] lg:text-15px">
        ©&nbsp;Copyright 2023&nbsp;
        <Link
          className="transition-colors duration-200 ease-in-out text-brand-dark hover:text-brand"
          href="https://magnercare.com"
        >
          PT Magner International Group
        </Link>
        &nbsp; All rights reserved
      </p>
      <p className="text-brand-dark leading-7 lg:leading-[27px] lg:text-15px">
        Powered by{" "}
        <Link href={"https://bbizengine.com/"} target="_blank">
          BBIZ Engine
        </Link>
      </p>
    </div>
  );
};
