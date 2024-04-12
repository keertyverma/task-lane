import { useMemo } from "react";
import useTaskStore, { Status } from "../store";
import "./Column.css";
import Task from "./Task";

interface Props {
  status: Status;
}

const Column = ({ status }: Props) => {
  const tasks = useTaskStore((store) => store.tasks);

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  );

  const renderTasks = () =>
    filteredTasks.map((task) => (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        status={task.status}
      />
    ));

  return (
    <div className="column">
      <p>{status}</p>
      {renderTasks()}
    </div>
  );
};

export default Column;
