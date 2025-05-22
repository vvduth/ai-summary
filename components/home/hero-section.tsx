import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { MotionSection } from "../common/motion-wrapper";
import { containerVariannts } from "@/app/constants";

const HeroSection = () => {
  return (
    <MotionSection
      variants={containerVariannts}
      initial="hidden"
      whileInView="show"
      animate="visible"
      className="relative mx-auto flex flex-col z-0
    items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all
     animate-in lg:px-12 max-w-7xl"
    >
      <div
        className="relative p-[1px] overflow-hidden
      rounded-full bg-gradient-to-r from-sky-200 via-sky-500 to-sky-700 
      text-white font-semibold animate-gradient-x group"
      >
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium
      bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
        >
          <Sparkles className="h-6 w-6 mr-2 text-sky-700 animate-pulse" />
          <p className="text-base text-sky-600">Fueled by AI Magic</p>
        </Badge>
      </div>

      <h1 className="font-bold py-6 text-center">
        Turn your PDFs into{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">snappy</span>
          <span
            className="absolute inset-0 bg-sky-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>{" "}
        summaries
      </h1>

      <h2
        className="text-lg sm:text-xl lg:text-2xl text-center px-4 
      lg:px-0 lg:max-w-4xl text-gray-600"
      >
        {" "}
        Get the gist of your docs in no time, no sweat{" "}
      </h2>
      <div>
        <Button
          className=" text-white mt-6 
      text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-1 md:px-8
      lg:px-12 py-6 sm:py-7 lg:py-8"
          variant={"link"}
        >
          <Link className="flex items-center" href={"/#pricing"}>
            {" "}
            <span>Give it a whirl</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </MotionSection>
  );
};

export default HeroSection;
