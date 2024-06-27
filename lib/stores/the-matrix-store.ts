import { create } from "zustand";
import { _setMatrix } from "../server-actions/the-matrix-actions";

export interface TaskType {
  id: string;
  text: string;
  done: boolean;
}

export interface ColumnType {
  id: string;
  title: string;
  taskIds: string[];
}

export interface MatrixType {
  tasks: { [key: string]: TaskType };
  columns: { [key: string]: ColumnType };
  columnOrder: string[];
}

let initialMatrix: MatrixType = {
  tasks: {
    "task-1": { id: "task-1", text: "1", done: true },
    "task-2": { id: "task-2", text: "2", done: false },
    "task-3": { id: "task-3", text: "3", done: false },
    "task-4": { id: "task-4", text: "4", done: true },
    "task-5": { id: "task-5", text: "5", done: false },
    "task-6": { id: "task-6", text: "6", done: false },
    "task-7": { id: "task-7", text: "7", done: true },
    "task-8": { id: "task-8", text: "8", done: false },
    "task-9": { id: "task-9", text: "9", done: false },
    "task-10": { id: "task-10", text: "10", done: false },
    "task-11": { id: "task-11", text: "11", done: true },
    "task-12": { id: "task-12", text: "12", done: false },
    "task-13": { id: "task-13", text: "13", done: true },
    "task-14": { id: "task-14", text: "14", done: true },
    "task-15": { id: "task-15", text: "15", done: false },
    "task-16": { id: "task-16", text: "16", done: true },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "do",
      taskIds: ["task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "schedule",
      taskIds: [
        "task-1",
        "task-2",
        "task-5",
        "task-6",
        "task-7",
        "task-8",
        "task-9",
        "task-10",
        "task-11",
        "task-12",
      ],
    },
    "column-3": {
      id: "column-3",
      title: "delegate",
      taskIds: ["task-13", "task-14"],
    },
    "column-4": {
      id: "column-4",
      title: "delete",
      taskIds: ["task-15", "task-16"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

interface MatrixStore {
  matrix: MatrixType;
  setMatrix: (matrix: MatrixType) => void;
}

const useMatrixStore = create<MatrixStore>()((set) => ({
  matrix: initialMatrix,
  setMatrix: (newMatrix: MatrixType) => {
    // NOTE: i'm using optimistic updates cuz i trust google
    _setMatrix(newMatrix);

    return set((state) => {
      return { ...state, matrix: newMatrix };
    });
  },
}));

export default useMatrixStore;
