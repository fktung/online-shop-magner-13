import { SOSIAL } from "@/constant/footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const IconsSosmed = () => {
  return (
    <div className="flex items-center justify-center gap-6 px-4 md:justify-start text-brand-muted xs:py-4">
      {SOSIAL?.map((item, idx) => (
        <Link
          href={item.url}
          target="_blank"
          key={idx}
          className="text-2xl text-"
        >
          <Image
            src={item.image}
            alt={item.name}
            height={item.height}
            width={item.width}
            className="transform scale-85 md:scale-100"
          />
        </Link>
      ))}
    </div>
  );
};
