import { v4 as uuid } from "uuid";
import { create } from "zustand";

export type Status = "TODO" | "IN_PROGRESS" | "DONE";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
}

interface TaskStore {
  tasks: Task[];
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [{ id: uuid(), title: "Task-1", status: "TODO" }],
}));

export default useTaskStore;
