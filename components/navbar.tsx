"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";
import {
  BellRing,
  Bolt,
  BookHeart,
  Feather,
  Grid2X2,
  Home,
  LogIn,
  Quote,
  ScanEye,
  SquareKanban,
  SquareUser,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";

const routes = [
  { name: "Home", link: "/", icon: <Home /> },
  { name: "The Matrix", link: "/matrix", icon: <Grid2X2 /> },
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
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <div className="w-[56px] min-w-[56px] h-dvh flex flex-col items-center p-2 border-r border-r-1 border-r-primary">
      <Icon name={routes[0].name} icon={routes[0].icon} link={routes[0].link} />

      <Separator className="mt-2" />

      <ScrollArea className="">
        <div className="flex flex-col gap-2 p-2">
          {routes.slice(1, routes.length - 1).map(({ name, icon, link }, i) => {
            return <Icon key={i} name={name} icon={icon} link={link} />;
          })}
        </div>
      </ScrollArea>

      <Separator className="mt-auto mb-2" />

      <div className="mb-2">
        {isAuthenticated ? (
          <Icon name={"Account"} link={"/account"} icon={<SquareUser />} />
        ) : (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger tabIndex={-1}>
                <LoginLink
                  postLoginRedirectURL={pathname}
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                >
                  <LogIn />
                </LoginLink>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Sign In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

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
        <TooltipTrigger asChild>
          <Link
            className={`${buttonVariants({ variant: "outline", size: "icon" })} min-h-10 min-w-10`}
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
