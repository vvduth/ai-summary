"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        `transition-colors text-md duration-200 text-gray-600
        hover:text-sky-600`,
        className,
        isActive && "text-sky-600 font-bold"
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
