"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "./ui/separator";
import { ReactNode, Suspense, useEffect, useState } from "react";
import {
  BellRing,
  Bolt,
  BookHeart,
  Feather,
  Grid2X2,
  LogIn,
  Quote,
  ScanEye,
  SquareKanban,
  SquareUser,
} from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";

const routes = [
  { name: "The Matrix", link: "/", icon: <Grid2X2 /> },
  { name: "Focus", link: "/focus", icon: <ScanEye /> },
  { name: "Daily Reminders", link: "/daily-reminders", icon: <BellRing /> },
  { name: "Quotes", link: "/quotes", icon: <Quote /> },
  { name: "Azkar", link: "/azkar", icon: <Feather /> },
  { name: "Quran", link: "/quran", icon: <BookHeart /> },
  { name: "Kanban", link: "/kanban", icon: <SquareKanban /> },
  { name: "Settings", link: "/settings", icon: <Bolt /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useKindeBrowserClient();

  return (
    <div className="w-[56px] min-w-[56px] max-h-[100vh] min-h-[100vh] flex flex-col items-center gap-2 bg-background p-1 border border-r-1 border-r-white">
      <Icon name={routes[0].name} icon={routes[0].icon} link={routes[0].link} />

      <Separator />

      <ScrollArea className="flex flex-col items-center gap-2 rounded-md border bg-red-500 flex-1 flex-shrink h-20">
        {routes.slice(1, routes.length - 1).map(({ name, icon, link }) => {
          return <Icon key={name} name={name} icon={icon} link={link} />;
        })}
      </ScrollArea>

      <Separator className="mt-auto" />

      <Icon name={"Account"} link={"account"} icon={<SquareUser />} />

      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger>
            <div
              className={buttonVariants({
                variant: "outline",
                size: "icon",
              })}
            >
              <LoginLink postLoginRedirectURL={pathname}>
                <LogIn />
              </LoginLink>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Sign In</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Icon
        name={routes[routes.length - 1].name}
        icon={routes[routes.length - 1].icon}
        link={routes[routes.length - 1].link}
      />
    </div>
  );
}

type IconProps = {
  name: string;
  icon: ReactNode;
  link: string;
};

function Icon({ link, name, icon }: IconProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <Link
            className={buttonVariants({ variant: "outline", size: "icon" })}
            href={link}
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
