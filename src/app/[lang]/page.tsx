"use client";
import {
  AutomotiveCare,
  SliderBanner,
  SliderFlashSale,
} from "@/components/section/home";
import { Layout } from "@/components/layout";

export default function Home() {
  return (
    <Layout className="overflow-hidden">
      <SliderBanner />
      <SliderFlashSale />
      <div className="my-20">
        <AutomotiveCare />
      </div>
    </Layout>
  );
}
