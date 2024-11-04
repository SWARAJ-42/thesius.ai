import React from "react";
import {
  FaRobot,
  FaChartLine,
  FaNewspaper,
  FaBrain,
  FaRocket,
  FaCog,
  FaDatabase,
  FaLightbulb,
  FaMicrochip,
  FaGlobe,
} from "react-icons/fa";
import { Button } from "../ui/button";
import "./custom-styles/1-hero-style.css";

const icons = [
  { component: FaRobot, position: "left-[10%] top-[20%]" },
  { component: FaChartLine, position: "left-[30%] top-[50%]" },
  { component: FaNewspaper, position: "left-[60%] top-[30%]" },
  { component: FaBrain, position: "left-[80%] top-[60%]" },
  { component: FaRocket, position: "left-[15%] top-[40%]" },
  { component: FaCog, position: "left-[50%] top-[70%]" },
  { component: FaDatabase, position: "left-[70%] top-[10%]" },
  { component: FaLightbulb, position: "left-[85%] top-[40%]" },
  { component: FaMicrochip, position: "left-[40%] top-[20%]" },
  { component: FaGlobe, position: "left-[20%] top-[60%]" },
];

const Hero = () => {
  return (
    <div className="mt-[100px] relative h-[70vh] flex flex-col justify-center items-center overflow-hidden">
      {icons.map(({ component: Icon, position }, index) => (
        <Icon
          key={index}
          className={`-z-[1] animate-bounce-slow fixed text-6xl text-purple-600 opacity-20 animate-float ${position}`}
        />
      ))}

      <div className="scale-in-center w-[80%] md:w-[40%] flex flex-col justify-center items-center z-10">
        <div className="my-4 text-4xl md:text-6xl text-center font-bold text-[#2b2b2b]">
          Cut through the noise — AI brings you the right information fast
        </div>
        <div className="py-4 text-lg text-center font-bold text-[#4b4b4b]">
          Research shouldn’t slow you down. Our platform finds the essential
          business data you need in moments, whether it’s breaking news or deep
          financials. You get the right information faster, freeing up your time
          for real, impactful work.
        </div>
      </div>

      <div className="flex my-3 z-10">
        <Button className="mx-3 px-8 py-8 text-md md:text-2xl text-white text-center font-semibold bg-purple-500 hover:bg-purple-700 rounded-lg shadow-lg">
          Get Started
        </Button>
        <Button className="mx-3 px-8 py-8 text-md md:text-2xl text-white text-center font-semibold bg-purple-500 hover:bg-purple-700 rounded-lg shadow-lg">
          Watch Demo
        </Button>
      </div>
    </div>
  );
};

export default Hero;

