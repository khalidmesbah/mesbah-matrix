"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaQuran } from "react-icons/fa";
import { Separator } from "./ui/separator";
import { FcSettings } from "react-icons/fc";
import { TbBrandMatrix, TbBrain } from "react-icons/tb";
import { BsChatLeftQuote } from "react-icons/bs";
import { MdAccountBox, MdLogin, MdTaskAlt } from "react-icons/md";
import { useUserSession } from "@/lib/hooks/use-user-session";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { createSession } from "@/lib/server-actions/auth-actions";
import { ReactNode } from "react";
import {
  BellRing,
  Bolt,
  BookHeart,
  CircleCheckBig,
  CircleUser,
  Feather,
  Grid2X2,
  LogIn,
  Quote,
  SquareUser,
} from "lucide-react";

export default function Navbar({ session }: { session: string | null }) {
  const userSessionId = useUserSession(session);

  const handleSignIn = async () => {
    const userUid = await signInWithGoogle();
    if (userUid) {
      await createSession(userUid);
    }
  };

  return (
    <div className="w-[56px] min-w-[56px] flex flex-col items-center gap-2 bg-background p-1 border border-r-1 border-r-white">
      <Icon name={icons[0].name} icon={icons[0].icon} link={icons[0].link} />
      <Separator />
      <div className="flex flex-col items-center gap-2 h-full">
        {icons.slice(1, icons.length - 1).map(({ name, icon, link }) => {
          return <Icon key={name} name={name} icon={icon} link={link} />;
        })}
      </div>
      <Separator className="mt-auto" />

      {!userSessionId ? (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger>
              <Button
                asChild
                size={"icon"}
                variant={"outline"}
                onClick={handleSignIn}
              >
                <LogIn />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Sign In</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Icon name={"Account"} link={"account"} icon={<SquareUser />} />
      )}

      <Icon
        name={icons[icons.length - 1].name}
        icon={icons[icons.length - 1].icon}
        link={icons[icons.length - 1].link}
      />
    </div>
  );
}

const icons = [
  { name: "The Matrix", link: "/", icon: <Grid2X2 /> },
  { name: "Daily Reminders", link: "/daily-reminders", icon: <BellRing /> },
  { name: "Quote", link: "/quote", icon: <Quote /> },
  { name: "Azkar", link: "/azkar", icon: <Feather /> },
  { name: "Quran", link: "/quran", icon: <BookHeart /> },
  { name: "Settings", link: "/settings", icon: <Bolt /> },
];

type iconProps = {
  name: string;
  icon: ReactNode;
  link: string;
};
function Icon({ link, name, icon }: iconProps) {
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
