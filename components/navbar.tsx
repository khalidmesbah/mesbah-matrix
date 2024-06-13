import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaQuran } from 'react-icons/fa';
import { Separator } from "./ui/separator";
import { FcSettings } from "react-icons/fc";
import { TbBrandMatrix, TbBrain } from "react-icons/tb";
import { BsChatLeftQuote } from "react-icons/bs";
import { MdLogin, MdTaskAlt } from "react-icons/md";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="w-[56px] flex flex-col items-center gap-2 bg-background p-1">
      <Icon name={icons[0].name} icon={icons[0].icon} link={icons[0].link} />
      <Separator />
      <div className="flex flex-col items-center gap-2 h-full">
        {icons.slice(1, icons.length - 1).map(({ name, icon, link }) => {
          return <Icon key={name} name={name} icon={icon} link={link} />
        })}
      </div>
      <Separator className="mt-auto" />

      <SignedOut>
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger>
              <SignInButton>
                <Button size={"icon"} variant={"outline"}>
                  <MdLogin />
                </Button>
              </SignInButton>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Sign In</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SignedOut>

      <SignedIn>
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger>
              <UserButton />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Account</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SignedIn>

      <Icon name={icons[icons.length - 1].name} icon={icons[icons.length - 1].icon} link={icons[icons.length - 1].link} />
    </div>
  )
}

const icons = [
  { name: 'Home', link: '/', icon: <TbBrandMatrix /> },
  { name: 'Tasks', link: '/tasks', icon: <MdTaskAlt /> },
  { name: 'Daily Reminders', link: '/daily-reminders', icon: <TbBrain /> },
  { name: 'Quote', link: '/quote', icon: <BsChatLeftQuote /> },
  { name: 'Quran', link: '/quran', icon: <FaQuran /> },
  { name: 'Settings', link: '/settings', icon: <FcSettings /> },
];

type iconProps = {
  name: string,
  icon: React.ReactNode
  link: string,
}
function Icon({ link, name, icon }: iconProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <Link className={buttonVariants({ variant: "outline", size: "icon" })} href={link}>{icon}</Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
