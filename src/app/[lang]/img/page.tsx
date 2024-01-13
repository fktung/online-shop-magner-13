/* eslint-disable @next/next/no-img-element */
"use client";
import { Layout } from "@/components/layout";
import { useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";

type TImageCropperProps = {
  imageURL: string;
  aspectRatio: number;
  positionX: 0 | 1;
};

const ImageCropper = ({
  imageURL,
  aspectRatio,
  positionX,
}: TImageCropperProps) => {
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    const cropImage = async () => {
      const inputImage = new Image();
      inputImage.crossOrigin = "Anonymous";
      inputImage.src = imageURL;

      await new Promise((resolve) => {
        inputImage.onload = resolve;
      });

      const inputWidth = inputImage.naturalWidth;
      const inputHeight = inputImage.naturalHeight;
      const inputImageAspectRatio = inputWidth / inputHeight;

      let outputWidth = inputWidth;
      let outputHeight = inputHeight;

      if (inputImageAspectRatio > aspectRatio) {
        outputWidth = inputHeight * aspectRatio;
      } else if (inputImageAspectRatio < aspectRatio) {
        outputHeight = inputWidth / aspectRatio;
      }

      const outputX = (outputWidth - inputWidth) * positionX;
      const outputY = (outputHeight - inputHeight) * 0.5;

      const outputImage = document.createElement("canvas");
      outputImage.width = outputWidth;
      outputImage.height = outputHeight;

      const ctx = outputImage.getContext("2d");
      ctx && ctx.drawImage(inputImage, outputX, outputY);

      setCroppedImage(outputImage);
    };

    cropImage();
  }, [imageURL, aspectRatio]);

  return (
    croppedImage && (
      <img
        src={croppedImage.toDataURL()}
        alt="Cropped"
        // className="object-cover object-center w-full h-full"
      />
    )
  );
};

// Example usage
const YourComponent = () => {
  const img =
    "https://sin1.contabostorage.com/10162138889b4438bab811ecee1a60ce:magner-dev/assets/OPSI%20DESAIN%20REWARD%202.webp";

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
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Layout>
      <div>
        <div className="w-full bg-red-300 relative">
          <Slider {...settings} ref={customSlider}>
            <div>
              <ImageCropper imageURL={img} aspectRatio={1 / 1} positionX={0} />
            </div>
            <div>
              <ImageCropper imageURL={img} aspectRatio={1 / 1} positionX={1} />
            </div>
          </Slider>
        </div>
        <div>
          <ImageCropper imageURL={img} aspectRatio={1 / 1} positionX={0} />
          <ImageCropper imageURL={img} aspectRatio={1 / 1} positionX={1} />
          <ImageCropper imageURL={img} aspectRatio={2 / 1} positionX={1} />
        </div>
      </div>
    </Layout>
  );
};

export default YourComponent;
