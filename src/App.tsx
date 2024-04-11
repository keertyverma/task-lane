import "./App.css";
import Column from "./components/Column";

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
