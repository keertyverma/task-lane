import classNames from "classnames";
import { Status } from "../store";
import "./Task.css";

interface Props {
  id?: string;
  title: string;
  description?: string;
  status: Status;
}

const Task = ({ id, title, description, status }: Props) => {
  return (
    <div className="task">
      <div className="task__title">{title}</div>
      <p>{description}</p>
      <div className="bottom-wrapper">
        <div></div>
        <div className={classNames("status", status)}>{status}</div>
      </div>
    </div>
  );
};

export default Task;
