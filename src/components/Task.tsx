import { FaTrash } from "react-icons/fa";
import useTaskStore, { Status } from "../store";
import "./Task.css";

interface Props {
  id: string;
  title: string;
  description?: string;
  status: Status;
}

const Task = ({ id, title, description, status }: Props) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const setDraggedTask = useTaskStore((state) => state.setDraggedTask);

  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(id)}>
      <div className="task__title">{title}</div>
      <p>{description}</p>
      <div className="bottom-wrapper">
        <div>
          <button onClick={() => deleteTask(id)} className="btn-delete">
            <FaTrash className="trash-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
