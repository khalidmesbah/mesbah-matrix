"use client";

import { Button } from "@/components/ui/button";
import useTopBarStore from "@/lib/stores/top-bar-store";
import { CircleAlertIcon, XIcon } from "lucide-react";

export default function TopBar() {
  const { isClosed, setIsClosed } = useTopBarStore((state) => state);

  if (isClosed) return null;

  return (
    <div className="p-2 flex items-center justify-between border rounded-md gap-2">
      <div className="flex items-center gap-2">
        <CircleAlertIcon className="h-5 w-5 min-h-5 min-w-5" />
        <p className="text-sm md:text-lg">
          You are not authenticated. Please sign in to save your data.
        </p>
      </div>
      <Button
        variant="ghost"
        className="min-w-5 min-h-5 size-5"
        size="icon"
        onClick={() => setIsClosed(true)}
      >
        <XIcon className="h-5 w-5" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </div>
  );
}
