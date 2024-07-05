"use client";

import { Button } from "@/components/ui/button";
import useTopBarStore from "@/lib/stores/top-bar-store";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { CircleAlertIcon, XIcon } from "lucide-react";

export default function TopBarAlert() {
  const { isClosed, setIsClosed } = useTopBarStore((state) => state);
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isClosed || isAuthenticated || isLoading) return null;

  return (
    <div className="w-full py-3 px-4 flex items-center justify-between border-b border-b-foreground">
      <div className="flex items-center gap-3">
        <CircleAlertIcon className="h-5 w-5" />
        <p>You are not authenticated. Please sign in to save your data.</p>
      </div>
      <Button variant="ghost" size="icon" onClick={() => setIsClosed(true)}>
        <XIcon className="h-5 w-5" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </div>
  );
}
