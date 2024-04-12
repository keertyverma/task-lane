import { v4 as uuid } from "uuid";
import { create } from "zustand";

export type Status = "TODO" | "IN_PROGRESS" | "DONE";

export interface ITask {
  id: string;
  title: string;
  description?: string;
  status: Status;
}

interface TaskStore {
  tasks: ITask[];
  draggedTaskId: string | null;
  addTask: (task: ITask) => void;
  deleteTask: (id: string) => void;
  setDraggedTask: (id: string | null) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  draggedTaskId: null,
  addTask: (task) =>
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
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  setDraggedTask: (id) => set({ draggedTaskId: id }),
}));

export default useTaskStore;
