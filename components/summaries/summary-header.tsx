import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Calendar, Clock, Sparkles } from "lucide-react";

const Summaryheader = ({ title,createdAt,readingTime }: { createdAt:string ,title: string,
  readingTime: number, 
 }) => {
  return (
    <div className="flex gap-4 justify-between mb-4">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Badge 
          variant={"secondary"}
          className="relative px-4 py-1.5 text-sm font-medium bg-white/80
          backdrop-blur-xs rounded-full shadow-xs">
            <Sparkles className="h-4 w-4 mr-1.5 text-sky-500"/>
            AI summary
          </Badge>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Calendar  className="h-4 w-4 text-sky-400"/>
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Clock  className="h-4 w-4 text-sky-400"/>
            {readingTime} mins read
          </div>
        </div>
        <h1 className="text-2xl lg:text-4xl font-bold lg:tracking-tight">
          <span className="bg-linear-to-r from-sky-600 to-blue-900 
          bg-clip-text text-transparent">
          {title}
          </span>
        </h1>
      </div>
      <div>
        <Link href={"/dashboard"} className="self-start">
          <Button
            variant={"link"}
            size={"sm"}
            className="text-sm sm:text-base text-white font-semibold"
          >
            <span className="text-xs sm:text-sm font-medium">
              Back to Dashboard
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Summaryheader;
