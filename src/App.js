import { useEffect } from "react";
import "./App.css";
import Board from "./components/Board";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function App() {
  useEffect(() => {
    alert("ARE YOU READY!");
  }, []);
  return (
    <div className="App" style={style}>
      <Board />
    </div>
  );
}

export default App;
