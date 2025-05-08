"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { NavigationControls } from "./NavigationControls";
import ProgressBar from "./ProgressBar";
import ContentSection from "./ContentSection";

const parseSection = (section: string) => {
  const [title, ...content] = section.split("\n");

  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];
  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith(".")) {
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = "";
    } else {
      currentPoint += ` ${trimmedLine}`;
    }
  });

  if (currentPoint) {
    points.push(currentPoint.trim());
  }
  return {
    title: cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ),
  };
};

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flexcol gap-2 mb-6 sticky
    top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
      <h2 className="text-3xl lg:text-4xl font-bold text-center flex-initial
      items-center justify-center gap-2">{title}</h2>
    </div>
  )
}

const SummaryViewer = ({
  summary,
}: {
  summary: {
    role: string;
    content: string;
  };
}) => {
  const { role, content } = summary;
  const [currentSection, setCurrentSection] = useState(0);
  const sections = content
    .split("\n# ")
    .map((section, index) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const handleNext = () => {
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };
  return (
    <Card className="relative px-2
    h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px]
    overflow-hidden bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl
    border border-sky-500/10">
     <ProgressBar
      sections={sections}
      currentSection={currentSection}
     />
        <div className="h-full overflow-y-auto scrollbar-hide
        pt-12 sm:pt-16 pb-20 sm:pb-24">
          <div className="px-4 sm:px-6">
            <SectionTitle title={sections[currentSection]?.title || ''} />
            <ContentSection 
              title={sections[currentSection]?.title || ''}
              points={sections[currentSection]?.points || []}
            />
          </div>
        </div>
        <NavigationControls
          currentSection={currentSection}
          totalSections={sections.length}
          onSectionSelect={setCurrentSection}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      
    </Card>
  );
};

export default SummaryViewer;
