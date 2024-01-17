import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";
import "./TaskList.css";

interface Todo {
  text: string;
  checked: boolean;
}

const deepClone = (object: unknown): unknown => {
  if (object === null || typeof object !== "object") return object;

  if (Array.isArray(object)) {
    return object.map(deepClone);
  }

  if (object instanceof Object) {
    return Object.fromEntries(
      Object.entries(object).map(([k, v]) => [k, deepClone(v)])
    );
  }

  throw new Error("Unsupported type to deep clone!");
};

export const TaskList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FormGroup className="todo">
        {todos.map((todo, i) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={todo.checked}
                  onClick={() => {
                    const copy = deepClone(todos) as Todo[];
                    copy[i].checked = !copy[i].checked;
                    setTodos(copy);
                  }}
                />
              }
              label={todo.text}
            />
            <Button
              variant="contained"
              onClick={() => {
                setTodos((prev) =>
                  prev.filter(({ text }) => text !== todo.text)
                );
              }}
            >
              Delete
            </Button>
          </div>
        ))}
      </FormGroup>
      <div>
        <TextField
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          placeholder="Todo..."
        />
        <Button
          variant="outlined"
          onClick={() => {
            setTodos((prev) => prev.concat({ text, checked: false }));
            setText("");
          }}
        >
          Add todo
        </Button>
      </div>
    </div>
  );
};
