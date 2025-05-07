import { ExternalLink, FileText } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import DownLoadSummaryButton from "./DownLoadSummaryButton";

const SourceInfo = ({
  fileName,
  summaryText,
  originalFileUrl,
  title,
  createdAt,
}: {
  fileName: string;
  summaryText: {
    role: string;
    content: string;
  };
  originalFileUrl: string;
  title: string;
  createdAt: string;
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div
        className="flex items-center justify-center
    gap-2"
      >
        <FileText className="h-4 w-4 text-sky-400" />
        <span>Source: {fileName}</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3
                    text-sky-600
                    hover:text-sky-700
                    hover:bg-sky-50"
          asChild
        >
          <a href={originalFileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            View Original
          </a>
        </Button>
        <DownLoadSummaryButton 
                
            summaryText={summaryText.content}
            fileName={fileName}
            title={title}
            createdAt={createdAt}
        />
      </div>
    </div>
  );
};

export default SourceInfo;
