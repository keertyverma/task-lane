import "./Column.css";
import Task, { Status } from "./Task";

interface Props {
  status: Status;
}

const Column = ({ status }: Props) => {
  return (
    <div className="column">
      <p>{status}</p>
      <Task task={{ title: "task1" }} />
    </div>
  );
};

export default Column;
