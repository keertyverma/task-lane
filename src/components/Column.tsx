import "./Column.css";

type Status = "TODO" | "IN_PROGRESS" | "DONE";

interface Props {
  status: Status;
}

const Column = ({ status }: Props) => {
  return <div className="column">{status}</div>;
};

export default Column;
