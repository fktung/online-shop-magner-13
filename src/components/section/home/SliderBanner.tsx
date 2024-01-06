"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ISliderBanner } from "@/types/tSliderBanner";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { Image } from "@/components/utility";
import { ApiAxios } from "@/helpers/axios";

type TImagesProps = {
  original: string;
  thumbnail: string;
};

export const SliderBanner = () => {
  const [isSliderBanner, setIsSliderBanner] = useState<ISliderBanner[]>([]);

  const getSlideBanner = async () => {
    try {
      const response = await ApiAxios.get(`/slider-banner`);
      const data = response.data.data;
      setIsSliderBanner(data);
    } catch (error) {
      console.log("getSlideBanner", error);
    }
  };

  useEffect(() => {
    getSlideBanner();
  }, []);

  const customSlider = useRef<Slider | null>(null);
  // const images = useMemo(() => {
  //   let img: TImagesProps[] = [];
  //   data.map((row, idx) => {
  //     img.push({
  //       original: process.env.NEXT_PUBLIC_URL_CDN + "/" + row.img,
  //       thumbnail: process.env.NEXT_PUBLIC_URL_CDN + "/" + row.img,
  //     });
  //   });
  //   return img;
  // }, [data]);
  const sliderPrev = () => {
    customSlider.current?.slickPrev();
  };
  const sliderNext = () => {
    customSlider.current?.slickNext();
  };

  const settings: Settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 10000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (isSliderBanner.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <Slider {...settings} ref={customSlider}>
        {isSliderBanner.map((row, idx) => (
          <div key={idx} className="">
            {row.link !== "" ? (
              <Link href={row.link} target="">
                <Image
                  alt={row.name}
                  src={process.env.NEXT_PUBLIC_URL_CDN + "/" + row.img}
                  className="object-cover object-center w-full h-full"
                />
              </Link>
            ) : (
              <Image
                alt={row.name}
                src={process.env.NEXT_PUBLIC_URL_CDN + "/" + row.img}
                className="object-cover object-center w-full h-full"
              />
            )}
          </div>
        ))}
      </Slider>
      <button
        onClick={sliderPrev}
        className="absolute top-0 bottom-0 left-0 text-4xl group"
      >
        <BsChevronCompactLeft className="transition-all duration-300 group-hover:scale-125 group-hover:opacity-100 opacity-70" />
      </button>
      <button
        onClick={sliderNext}
        className="absolute top-0 bottom-0 right-0 text-4xl group"
      >
        <BsChevronCompactRight className="transition-all duration-300 group-hover:scale-125 group-hover:opacity-100 opacity-70" />
      </button>
    </div>
  );
};
