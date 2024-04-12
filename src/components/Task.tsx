import classNames from "classnames";
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

  return (
    <div className="task">
      <div className="task__title">{title}</div>
      <p>{description}</p>
      <div className="bottom-wrapper">
        <div>
          <button onClick={() => deleteTask(id)} className="btn-delete">
            <FaTrash className="trash-icon" />
          </button>
        </div>
        <div className={classNames("status", status)}>{status}</div>
      </div>
    </div>
  );
};

export default Task;
