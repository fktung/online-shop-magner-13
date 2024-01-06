"use client";
import { LayoutV2 } from "@/components/layout";
import {
  AutomotiveCare,
  SliderBanner,
  SliderFlashSale,
} from "@/components/section/home";

export default function Home() {
  return (
    <LayoutV2>
      <SliderBanner />

      <SliderFlashSale />
      <div className="my-20">
        <AutomotiveCare />
      </div>
    </LayoutV2>
  );
}
