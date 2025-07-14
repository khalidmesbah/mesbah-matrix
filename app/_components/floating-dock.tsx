"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Lock, LockOpen, Save, Settings2 } from "lucide-react"; // Importing Lucide icons
import { toast } from "sonner";
import Icon from "@/components/icon";
import { setWidgets } from "@/lib/server-actions/widgets";
import useWidgetsStore from "@/lib/stores/widgets";
import type { WidgetsT } from "@/lib/types/widgets";
import WidgetsSlider from "./widgets-slider";

export default function FloatingDock() {
  const { layouts, widgetStates, isLayoutLocked, setIsLayoutLocked } =
    useWidgetsStore();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (newWidgets: WidgetsT) => setWidgets(newWidgets),
    onSuccess: () => {
      toast.success("The new layout has been saved successfully");
    },
    onError: (error) => {
      toast.error(
        `Something went wrong while saving the layouts ${JSON.stringify(error)}`,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["widgets"] });
    },
  });

  return (
    <div
      className={
        "fc bg-card fixed bottom-4 left-[50%] w-fit translate-x-[-50%] gap-1 rounded-full p-1"
      }
    >
      <WidgetsSlider />
      {isLayoutLocked ? (
        <Icon
          key={"locked"}
          icon={<Lock />}
          onClick={() => setIsLayoutLocked(false)}
          size="icon"
          description={"Locked"}
          className="size-10! rounded-full [&>svg]:size-5!"
        />
      ) : (
        <Icon
          key={"unlocked"}
          icon={<LockOpen />}
          onClick={() => setIsLayoutLocked(true)}
          size="icon"
          description={"Unlocked"}
          className="size-10! rounded-full [&>svg]:size-5!"
        />
      )}
      <Icon
        key={"save"}
        icon={<Save />}
        onClick={() => mutate({ layouts, states: widgetStates })}
        disabled={isPending}
        loading={isPending}
        size="icon"
        description={"Save"}
        className="size-10! rounded-full [&>svg]:size-5!"
      />
      <Icon
        key={"settings"}
        icon={<Settings2 />}
        size="icon"
        description={"Settings"}
        className="size-10! rounded-full [&>svg]:size-5!"
      />
    </div>
  );
}
