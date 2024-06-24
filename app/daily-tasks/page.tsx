import { AddDailyTask } from "@/components/add-daily-task";
import DailyTasksList from "@/components/daily-tasks-list";

export default function DailyTasksPage() {
  return (
    <div>
      <div className="flex gap-1 justify-between">
        <h1 className="text-5xl">daily tasks</h1>
        <AddDailyTask />
      </div>
      <DailyTasksList />
    </div>
  );
}
