import classNames from "classnames";
import { useMemo, useState } from "react";
import useTaskStore, { Status } from "../store";
import AddTask from "./AddTask";
import "./Column.css";
import Task from "./Task";

interface Props {
  status: Status;
}

const Column = ({ status }: Props) => {
  const tasks = useTaskStore((store) => store.tasks);
  const setDraggedTask = useTaskStore((state) => state.setDraggedTask);
  const draggedTaskId = useTaskStore((state) => state.draggedTaskId);
  const moveTask = useTaskStore((state) => state.moveTask);

  const [isOpen, setIsOpen] = useState(false);
  const [isDrop, setIsDrop] = useState(false);

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
    <div
      className={classNames("column", { drop: isDrop })}
      onDragOver={(e) => {
        setIsDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setIsDrop(false);
        e.preventDefault();
      }}
      onDrop={() => {
        setIsDrop(false);
        moveTask(draggedTaskId, status);
        setDraggedTask(null);
      }}
    >
      <div className="title-wrapper">
        <p>{status}</p>
        <button onClick={() => setIsOpen(true)}>Add</button>
      </div>
      {isOpen && <AddTask status={status} onAdd={() => setIsOpen(false)} />}
      {renderTasks()}
    </div>
  );
};

export default Column;
