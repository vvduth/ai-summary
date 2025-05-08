"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { NavigationControls } from "./NavigationControls";

const parseSection = (section: string) => {
  const [title, ...content] = section.split("\n");

  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: String[] = [];
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
    <Card>
      <CardHeader>
        <CardTitle>{sections[currentSection].title}</CardTitle>
      </CardHeader>
      <CardContent>
        {JSON.stringify(sections[currentSection].points)}
        <NavigationControls
          currentSection={currentSection}
          totalSections={sections.length}
          onSectionSelect={setCurrentSection}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </CardContent>
    </Card>
  );
};

export default SummaryViewer;
