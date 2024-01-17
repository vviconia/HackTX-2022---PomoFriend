import { Button, Divider } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { useApp } from "./context";
import { StartScreen } from "./StartScreen";
import { TaskList } from "./TaskList";
import { Timer } from "./Timer";

function App() {
  const [started, setStarted] = useState(false);
  const { rest, study } = useApp();

  return (
    <div className="App">
      {started ? (
        <>
          <Timer study={study} rest={rest} />
          <Divider sx={{ margin: "10px" }} />
          <TaskList />
        </>
      ) : (
        <>
          <StartScreen />
          <Button
            variant="contained"
            sx={{ marginTop: "10px" }}
            onClick={() => {
              setStarted(true);
            }}
          >
            Begin!
          </Button>
        </>
      )}
    </div>
  );
}

export default App;
