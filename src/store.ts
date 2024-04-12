import { v4 as uuid } from "uuid";
import { create } from "zustand";

export type Status = "TODO" | "IN_PROGRESS" | "DONE";

export interface ITask {
  id?: string;
  title: string;
  description?: string;
  status: Status;
}

interface TaskStore {
  tasks: ITask[];
  addTask: (task: ITask) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task: ITask) =>
    set((state) => ({
      tasks: [
        {
          id: uuid(),
          title: task.title,
          description: task.description,
          status: task.status,
        },
        ...state.tasks,
      ],
    })),
}));

export default useTaskStore;
