import { useState } from "react";
import { mountStoreDevtool } from "simple-zustand-devtools";
import "./App.css";
import AddTask from "./components/AddTask";
import Column from "./components/Column";
import useTaskStore from "./store";

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Task Store", useTaskStore);
}

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app">
      <button className="btn" onClick={() => setIsOpen(true)}>
        Add Task
      </button>
      {isOpen && <AddTask onAdd={() => setIsOpen(false)} />}
      <div className="columns">
        <Column status="TODO" />
        <Column status="IN_PROGRESS" />
        <Column status="DONE" />
      </div>
    </div>
  );
};

export default App;
