"use client";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "../common";
import { LOGIN } from "@/app/constants";

const navLinks = [
  // { label: "Product", href: "#" },
  // { label: "Use Cases", href: "#"},
  // { label: "Pricing", href: "#" },
  // { label: "Blog", href: "#" },
  // { label: "Resources", href: "#" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-2 flex items-center justify-between">
    <nav className="sticky w-full flex items-center justify-center">
      <div className="hidden md:flex items-center gap-8 ">
        {/* {navLinks.map((link) => (
        <Link
        key={link.label}
        href={link.href}
        className="flex items-center gap-1 text-[15px] font-medium text-gray-500 !text-gray-500 hover:!text-gray-400 visited:!text-gray-500"
        >
        {link.label}
        </Link>
        ))} */}
      </div>
    </nav>
          <div>
        <Button
          buttonProps={{
            type: "primary",
            className: "!bg-black !border-black !rounded-full !px-6 !h-10 flex items-center gap-2 font-medium hover:!opacity-80 transition-opacity",
          }}
        >
          <span className="mr-1">{LOGIN}</span>
          <LogIn size={16} />
        </Button>
      </div>
    </nav>
  );
}
