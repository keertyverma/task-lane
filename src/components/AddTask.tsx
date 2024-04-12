import { useState } from "react";
import useTaskStore, { Status } from "../store";
import "./AddTask.css";

interface Props {
  status: Status;
  onAdd: () => void;
}

const AddTask = ({ status, onAdd }: Props) => {
  const addTask = useTaskStore((store) => store.addTask);
  const [task, setTask] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const handleClick = () => {
    addTask({ ...task, status });
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
          <button onClick={handleClick}>Submit</button>
          <button onClick={onAdd}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
