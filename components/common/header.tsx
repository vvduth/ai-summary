import Link from "next/link";
import React from "react";
import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
const Header = () => {
  const isLoggingIn = false; // Replace with your authentication logic
  return (
    <nav
      className="container flex items-center 
    justify-between lg:px-8 px-2 mx-auto mt-2"
    >
      <div className="flex lg:flex-1">
        <NavLink
          href={"/"}
          className="flex items-center gap-1 lg:fap2
         shrink-0"
        >
          <FileText
            className="h-5 w-5 lg:w-8 lg:h-8 text-gray-900
        hover:rotate-12 transform duration-200 ease-in-out"
          />
          <span className="font-extrabold lg:text-xl text-gray-900">
            AI Summaryy
          </span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <SignedIn>
          <NavLink href={"/#dashboard"}>Your summaries</NavLink>
        </SignedIn>

        <NavLink href={"/#pricing"}>Pricing</NavLink>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href={"/upload"}>Upload a PDF</NavLink>
            <div className="px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded-md">
              Pro
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>

        <SignedOut>
          <NavLink href={"/sign-in"}>Login</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;
