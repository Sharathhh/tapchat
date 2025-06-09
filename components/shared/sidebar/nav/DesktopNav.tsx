'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip'; // ✅ Correct import
import { useNavigation } from '@/hooks/useNavigation';
import { UserButton } from '@clerk/nextjs';
import { Badge } from '@/components/ui/badge'; // ✅ Fixed Badge import

function DesktopNav() {
  
  const paths = useNavigation();

  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav>
        <ul className="flex flex-col items-center gap-4">
          {paths.map((path, id) => (
            <li key={id} className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={path.href}>
                    <Button
                      size="icon"
                      variant="outline"
                      className={`w-10 h-10 transition-colors duration-200 ${
                        path.active
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-transparent text-muted-foreground hover:bg-muted'
                      }`}
                      aria-label={path.name}
                    >
                      {path.icon || <span className="text-red-500">Icon Error</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{path.name}</p>
                </TooltipContent>
              </Tooltip>

              {path.count ? (
                <Badge className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-2 flex items-center justify-center z-10">
                  {path.count}
                </Badge>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </Card>
  );
}

export default DesktopNav;
