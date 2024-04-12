import { useState } from "react";
import { v4 as uuid } from "uuid";
import useTaskStore from "../store";
import "./AddTask.css";

interface Props {
  onAdd: () => void;
}

const AddTask = ({ onAdd }: Props) => {
  const addTask = useTaskStore((store) => store.addTask);
  const [task, setTask] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const handleClick = () => {
    addTask({ id: uuid(), ...task, status: "TODO" });
    setTask({ title: "", description: "" });
    onAdd();
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <input
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          type="text"
          placeholder="title..."
        />
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          rows={3}
          cols={2}
          placeholder="description..."
        ></textarea>
        <div className="modal_control">
          <button className="btn btn-submit" onClick={handleClick}>
            Submit
          </button>
          <button className="btn btn-close" onClick={onAdd}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
