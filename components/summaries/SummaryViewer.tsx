import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const parseSection = (section: string) => {
  const [title, content] = section.split("\n");
  return {
    title: title,
    content: content,
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
  const sections = content
    .split("\n# ")
    .map((section, index) => section.trim())
    .filter(Boolean)
    .map(parseSection);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>{JSON.stringify(sections)}</CardContent>
    </Card>
  );
};

export default SummaryViewer;
