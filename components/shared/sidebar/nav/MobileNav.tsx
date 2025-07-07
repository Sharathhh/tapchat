"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { TooltipContent } from "@/components/ui/tooltip";
import { useConversation } from "@/hooks/useConversation";
import { useNavigation } from "@/hooks/useNavigation";
import { UserButton } from "@clerk/nextjs";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";

function MobileNav() {
  const paths = useNavigation();

  const { isActive } = useConversation();

  if (isActive) return null;

  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
          {paths.map((path, id) => {
            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        className={`w-10 h-10 transition-colors duration-200 ${
                          path.active
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-transparent text-gray-500 hover:bg-gray-100"
                        }`}
                        aria-label={path.name}
                      >
                        {path.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                  {path.count ? (
                    <Badge className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center z-10">
                      {path.count}
                    </Badge>
                  ) : null}
                </Link>
              </li>
            );
          })}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
}

export default MobileNav;
