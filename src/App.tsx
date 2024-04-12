import { mountStoreDevtool } from "simple-zustand-devtools";
import "./App.css";
import Column from "./components/Column";
import useTaskStore from "./store";

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Task Store", useTaskStore);
}

const App = () => {
  return (
    <div className="app">
      <Column status="TODO" />
      <Column status="IN_PROGRESS" />
      <Column status="DONE" />
    </div>
  );
};

export default App;
