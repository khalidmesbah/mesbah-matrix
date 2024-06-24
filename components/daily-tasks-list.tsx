"use client";

import useDailyTasksStore, {
  DailyTaskType,
} from "@/lib/stores/daily-tasks-store";
import { MdCheckCircle, MdCheckCircleOutline, MdDelete } from "react-icons/md";
import { AiOutlineHolder } from "react-icons/ai";

export default function DailyTasksList() {
  const dailyTasks = useDailyTasksStore((state) => state.dailyTasks);
  return (
    <div className="flex gap-1 flex-col bg-white">
      {dailyTasks.map((dt) => (
        <Task key={dt.id} task={dt} />
      ))}
    </div>
  );
}

function Task({ task }: { task: DailyTaskType }) {
  return (
    <div className="flex gap-1 items-center rounded-md bg-card max-w-[300px]">
      {task.done ? <MdCheckCircleOutline /> : <MdCheckCircle />}
      <p className={`${task.done && "line-through"} line-clamp-1`}>
        {task.text}
      </p>
      <MdDelete />
      <AiOutlineHolder />
    </div>
  );
}
