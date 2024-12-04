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
      heading: "Project-Ready Research",
      description:
        "Working on a big idea? Share your vision, and our AI will find the most relevant research and guide you step-by-step — from essential studies to practical resources. See exactly how each paper supports your project, helping you bring your ideas to life with clarity and confidence",
      buttonText: "Get Started",
      animation: ["slide-in-right", "slide-out-left"],
    },
    {
      image: {
        src: headstartimg,
        alt: "Feature Image 1",
      },
      design: "md:flex-row-reverse",
      heading: "Smart Discovery",
      description:
        "Enter your query, and we instantly connect you with the most relevant research papers, complete with a concise overview to get you started faster. ",
      buttonText: "Get Started",
      animation: ["slide-in-left", "slide-out-right"],
    },
    {
      image: {
        src: newsimg,
        alt: "Feature Image 2",
      },
      design: "md:flex-row",
      heading: "Dig Deeper",
      description: "Select multiple research papers from your results and dive deeper into them with follow-up questions. Our AI guides you through further exploration, uncovering more insights from each paper to support your research",
      buttonText: "Get Started",
      animation: ["slide-in-right", "slide-out-left"],
    },
    {
      image: {
        src: researchimg,
        alt: "Feature Image 3",
      },
      design: "md:flex-row-reverse",
      heading: "Paper Exploration",
      description: "Select any research paper to view detailed information such as citations, key findings, and many more. Engage directly with the paper, ask questions, and explore additional insights to support your work",
      buttonText: "Get Started",
      animation: ["slide-in-left", "slide-out-eight"],
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
              className={`feature-animation ${isVisible ? feature.animation[0] : feature.animation[1]} flex flex-col ${feature.design} px-10 justify-between items-center mx-auto max-w-6xl min-h-[300px] rounded-2xl overflow-hidden bg-gradient-to-r backdrop-blur-sm from-green-500/30 to-green-200/30 shadow-lg`}
            >
              <div className="flex-1 relative w-full hidden sm:block px-4">
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt}
                  className="rounded-xl h-[270px] mx-auto"
                />
              </div>
              <div className="flex-1 p-8 md:p-12 lg:p-16 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-[#3b3b3b] mb-4">
                  {feature.heading}
                </h2>
                <p className="text-md md:text-xl text-[#3b3b3b]/90 mb-6">
                  {feature.description}
                </p>
                <button className="bg-white text-xl text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-colors duration-300">
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


