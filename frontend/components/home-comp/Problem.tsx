"use client";

import React, { useRef } from "react";
import useVisibility from "@/lib/visibility-detector";
import { ResponsiveRadar } from "@nivo/radar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "./custom-styles/4-problem.css"; 

export function Problem() {
  // Data for the radar chart
  const data = [
    { id: "A", role: "Market Research Assistant", likelihood: 97 },
    { id: "B", role: "Statistician", likelihood: 95 },
    { id: "C", role: "Research Analyst", likelihood: 94 },
    { id: "D", role: "Market Analyst", likelihood: 60 },
    { id: "E", role: "Customer Insights Manager", likelihood: 71 },
  ];

  const formattedData = data.map((d) => ({
    id: d.id,
    likelihood: d.likelihood,
    fullRole: d.role,
  }));

  const theme = {
    textColor: "#333",
    fontSize: 12,
    axis: {
      domain: {
        line: {
          stroke: "#777777",
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: "#777777",
          strokeWidth: 1,
        },
        text: {
          fontSize: 12,
          fill: "#333333",
        },
      },
    },
  };

  // Visibility detection
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useVisibility(ref, 0.2);

  return (
    <Card
      ref={ref} // Attach the ref for visibility detection
      className={`w-[90%] lg:w-full max-w-6xl mb-10 mx-auto overflow-x-hidden shadow-2xl bg-purple-300/20 backdrop-blur-lg 
        ${isVisible ? "fade-in" : "fade-out"}`}
    >
      <div className="flex flex-col lg:flex-row justify-center items-center min-h-[600px]">
        <div className="flex-1 p-6">
          <h2 className="text-center text-3xl font-bold mb-2">AI in Research</h2>
          <p className="mx-auto text-sm text-muted-foreground mb-4 w-[80%]">
            This graph illustrates the likelihood of AI automating various market research tasks, highlighting its role in enhancing efficiency and productivity.
          </p>
          <div className="w-[80%] mx-auto py-4 aspect-[4/3] bg-muted rounded-lg">
            <ResponsiveRadar
              data={formattedData}
              keys={["likelihood"]}
              indexBy="id"
              maxValue="auto"
              margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
              curve="linearClosed"
              borderWidth={2}
              borderColor={{ from: "color" }}
              gridShape="circular"
              gridLabelOffset={30}
              theme={theme}
              colors={{ datum: "color", scheme: "nivo" }}
              fill={[{ match: "*", id: "gradientC" }]}
              defs={[
                {
                  id: "gradientC",
                  type: "linearGradient",
                  colors: [
                    { offset: 0, color: "#3B82F6" },
                    { offset: 100, color: "#8B5CF6" },
                  ],
                },
              ]}
              enableDots={true}
              dotSize={8}
              dotColor={{ theme: "background" }}
              dotBorderWidth={2}
              dotBorderColor={{ from: "color" }}
              enableDotLabel={true}
              dotLabel="id"
              dotLabelYOffset={-12}
              tooltip={({ indexValue }) => {
                const role = data.find((d) => d.id === indexValue);
                return (
                  <div className="p-2 bg-white shadow-lg rounded-lg text-gray-800">
                    <strong>{role.role}</strong>
                    <br />
                    Likelihood: {role.likelihood}%
                  </div>
                );
              }}
              legends={[
                {
                  anchor: "top-left",
                  direction: "column",
                  translateX: -50,
                  translateY: -40,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: "#999",
                  symbolSize: 12,
                  symbolShape: "circle",
                },
              ]}
            />
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-center">
          <h2 className="text-xl md:text-5xl font-bold mb-4">
            How AI is Shaping the Future of Market Research
          </h2>
          <p className="text-sm md:text-xl text-muted-foreground mb-4">
            AI is set to transform market research by taking on routine tasks such as data cleaning and advanced analysis, allowing professionals to focus on more strategic and creative endeavors. As AI capabilities expand, it is expected to significantly enhance efficiency and accuracy across the industry, making research processes faster and more insightful.
          </p>
          <Button className="p-2 md:p-6 text-sm md:text-lg w-fit bg-purple-500 hover:bg-purple-700">Know more</Button>
        </div>
      </div>
    </Card>
  );
}

export default Problem;

