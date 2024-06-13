// import Navbar from "@/components/navbar";
// import Image from "next/image";
// import { DragDropContext } from '@hello-pangea/dnd';

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface InitialData {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

const initialData: InitialData = {
  tasks: {
    'task-1': { id: 'task-1', content: '1' },
    'task-2': { id: 'task-2', content: '2' },
    'task-3': { id: 'task-3', content: '3' },
    'task-4': { id: 'task-4', content: '4' },
  },
  columns: {
    'column-1': {
      id: "column-1",
      title: "to do",
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    }
  },
  columnOrder: ['column-1']
}

export default function Home() {
  return (
    <>
      {initialData.columnOrder.map(columnId => {
        const column = initialData.columns[columnId];
        const tasks = column.taskIds.map(taskId => initialData.tasks[taskId])
        return <Column key={column.id} column={column} tasks={tasks}></Column>
      })}
    </>
  );
}

function Column({ column, tasks }: { column: Column, tasks: Task[] }) {

  return <div>
    {column.title}
  </div>

}
