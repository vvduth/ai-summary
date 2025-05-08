import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  sections: {
    title: string;
    points: string[];
  }[];
  currentSection: number;
}
const ProgressBar = ({ sections, currentSection }: Props) => {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-20
    bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-sky-50/10"
    >
      <div className="px-4 flex gap-1.5">
        {sections.map((section, index) => (
          <div
            key={index}
          className="h-1.5 flex-1/2 rounded-full overflow-hidden bg-sky-500/10"
          >
            <div
            key={index}
            className={cn(
              "h-full bg-linear-to-r from-gray-500 to-sky-600  transition-all duration-500",
              index === currentSection
                ? "w-full"
                : currentSection > index
                ? "w-full opacity-10"
                : "w-0"
            )}
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
