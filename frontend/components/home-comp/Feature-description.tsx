"use client";

import "./custom-styles/2-feature-description.css";
import React, { useRef } from "react";
import useVisibility from "@/lib/visibility-detector";
import Image, { StaticImageData } from "next/image";
import newsimg from "@/assets/Home/FeatureDescription/news.png";
import headstartimg from "@/assets/Home/FeatureDescription/headstart.png";
import researchimg from "@/assets/Home/FeatureDescription/research.png";

interface Feature {
  image: {
    src: StaticImageData;
    alt: string;
  };
  design: string;
  heading: string;
  description: string;
  buttonText: string;
  animation: string[]; // [slideInClass, slideOutClass]
}

export function FeatureDescription() {
  const featuresData: Feature[] = [
    {
      image: {
        src: headstartimg,
        alt: "Feature Image 1",
      },
      design: "md:flex-row",
      heading: "Head-starter",
      description:
        "Got a problem statement? Just share it, and our AI will gather relevant information—ranging from news to financials—and deliver a customized roadmap to guide you through solving your specific challenge.",
      buttonText: "Learn More",
      animation: ["slide-in-right", "slide-out-left"],
    },
    {
      image: {
        src: newsimg,
        alt: "Feature Image 2",
      },
      design: "md:flex-row-reverse",
      heading: "News Buddy",
      description:
        "Find the news you’re looking for in seconds. We quickly gather the most relevant stories, saving you hours of searching and helping you turn headlines into meaningful research for your reports.",
      buttonText: "Explore",
      animation: ["slide-in-left", "slide-out-right"],
    },
    {
      image: {
        src: researchimg,
        alt: "Feature Image 3",
      },
      design: "md:flex-row",
      heading: "Smarter Research",
      description:
        "Read reports the faster and smarter way. Get the crux that matters from annual reports, company websites, and other sources, delivering detailed data and research to strengthen your reports and elevate their relevance.",
      buttonText: "Discover",
      animation: ["slide-in-right", "slide-out-left"],
    },
  ];

  return (
    <section className="w-[90%] mx-auto my-32 rounded-2xl px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="mb-24 text-6xl font-bold text-center">What's on the table!</div>
      <div className="space-y-12 overflow-hidden">
        {featuresData.map((feature, index) => {
          const ref = useRef<HTMLDivElement | null>(null);
          const isVisible = useVisibility(ref, 0);

          return (
            <div
              ref={ref}
              key={index}
              className={`feature-animation ${isVisible ? feature.animation[0] : feature.animation[1]} flex flex-col ${feature.design} justify-between items-center mx-auto max-w-6xl min-h-[300px] rounded-2xl overflow-hidden bg-gradient-to-r from-purple-400 to-purple-200 shadow-lg`}
            >
              <div className="flex-1 relative w-full md:w-1/2 hidden sm:block">
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt}
                  className="rounded-l-2xl h-[400px] w-[400px] mx-auto"
                />
              </div>
              <div className="flex-1 p-8 md:p-12 lg:p-16 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-[#3b3b3b] mb-4">
                  {feature.heading}
                </h2>
                <p className="text-md md:text-xl text-[#3b3b3b]/90 mb-6">
                  {feature.description}
                </p>
                <button className="bg-white text-xl text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300">
                  {feature.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


