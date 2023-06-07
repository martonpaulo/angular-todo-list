import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getTodos, createTodo, deleteTodo } from "./data/todos";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Running API");
});

app.get("/todos", getTodos);
app.post("/todos", createTodo);
app.delete("/delete/:id", deleteTodo);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
