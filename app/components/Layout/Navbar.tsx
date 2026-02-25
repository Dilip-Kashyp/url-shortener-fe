"use client";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { Button, Flex, Typography } from "../common";
import { LOGIN } from "@/app/constants";
import { useCurrentUser, useLogout } from "@/app/Services";

export default function Navbar() {
  const { data: user, isLoading } = useCurrentUser();
  const logout = useLogout();

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-2 flex items-center justify-between bg-white border-b">
      <Link href="/" className="text-xl font-bold">
        Linkly
      </Link>
      
      <div className="flex items-center gap-4">
        {isLoading ? (
          <div className="w-20 h-8 bg-gray-100 animate-pulse rounded-full" />
        ) : user ? (
          <Flex flexProps={{ gap: 4, align: "center" }}>
            <Typography typographyProps={{ level: 5, className: "!mb-0" }}>
              Hi, {user?.data?.[0]?.name || "User"}
            </Typography>
            <Button
              buttonProps={{
                type: "text",
                icon: <LogOut size={16} />,
                onClick: logout,
                className: "flex items-center gap-2",
              }}
            >
              Logout
            </Button>
          </Flex>
        ) : (
          <Link href="/login">
            <Button
              buttonProps={{
                type: "primary",
                className: "!bg-black !border-black !rounded-full !px-6 !h-10 flex items-center gap-2 font-medium hover:!opacity-80 transition-opacity",
              }}
            >
              <span className="mr-1">{LOGIN}</span>
              <LogIn size={16} />
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
