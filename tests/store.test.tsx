import { render } from "@testing-library/react";
import { useEffect } from "react";
import { describe, expect, it, vi } from "vitest";
import useTaskStore from "../src/store";

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
});
