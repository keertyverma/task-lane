import classNames from "classnames";
import "./Task.css";

export type Status = "TODO" | "IN_PROGRESS" | "DONE";

interface Task {
  title: string;
}

interface Props {
  task: Task;
}

const Task = ({ task }: Props) => {
  const status: Status = "TODO";

  const { title } = task;

  return (
    <div className="task">
      <div>{title}</div>
      <div className="bottom-wrapper">
        <div></div>
        <div className={classNames("status", status)}>{status}</div>
      </div>
    </div>
  );
};

export default Task;
