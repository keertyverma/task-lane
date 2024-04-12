import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  moveTask: (id: string | null, status: Status) => void;
}

const useTaskStore = create<TaskStore>(
  persist(
    (set) => ({
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
      moveTask: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        })),
    }),
    { name: "task store" }
  )
);

export default useTaskStore;
