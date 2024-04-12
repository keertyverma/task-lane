import { render } from "@testing-library/react";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { describe, expect, it, vi } from "vitest";
import useTaskStore, { ITask } from "../src/store";

// vi.mock("zustand");

const TestComponent = ({ selector, effect }) => {
  // selector is used in hook
  // effect is run when selector is changed
  const items = useTaskStore(selector);

  useEffect(() => effect(items), [items]);

  return null;
};

describe("store", () => {
  it("should return default value at the start", () => {
    const selector = (state) => state.tasks;
    const effect = vi.fn();

    render(<TestComponent selector={selector} effect={effect} />);

    expect(effect).toHaveBeenCalledWith([]);
  });

  it("should add an item to the store and rerun the effect", () => {
    const task: ITask = { id: uuid(), title: "Task 1", status: "TODO" };

    const selector = (state) => ({
      tasks: state.tasks,
      addTask: state.addTask,
    });
    const effect = vi.fn().mockImplementation((items) => {
      if (items.tasks.length === 0) {
        items.addTask(task);
      }
    });

    render(<TestComponent selector={selector} effect={effect} />);

    // effect() must be called 2 times, first time at initial render and second time when task is added
    expect(effect).toHaveBeenCalledTimes(2);
    expect(effect).toHaveBeenCalledWith(
      expect.objectContaining({ tasks: [task] })
    );
  });

  it("should delete an item and rerun the effect", () => {
    const id = uuid();
    const task: ITask = { id, title: "Task 1", status: "TODO" };

    const selector = (state) => ({
      tasks: state.tasks,
      addTask: state.addTask,
      deleteTask: state.deleteTask,
    });

    let currentItems;
    const effect = vi.fn().mockImplementation((items) => {
      currentItems = items;
      if (items.tasks.length === 0) {
        items.addTask(task);
      } else if (items.tasks.length === 1) {
        items.deleteTask(id);
      }
    });

    render(<TestComponent selector={selector} effect={effect} />);

    // effect() must be called 2 times, first time at initial render and second time when task is added
    expect(effect).toHaveBeenCalledTimes(3);
    expect(currentItems.tasks).toEqual([]);
  });
});
