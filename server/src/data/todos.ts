import fs from "fs";
import { Request, Response } from "express";
import { Todo } from "./models/todo";
import { v4 as uuidv4 } from "uuid";

const DATA_FILE = "./src/data/data.json";

const getTodos = (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  res.json(data.todos);
};

const createTodo = (req: Request, res: Response) => {
  const { description, dueDate, priority } = req.body as Todo;
  const newTodo: Todo = {
    id: uuidv4(),
    description,
    dueDate,
    priority,
  };

  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  data.todos.push(newTodo);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.status(201).json(newTodo);
};

const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

  const todoIndex = data.todos.findIndex((todo: Todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const [deletedTodo] = data.todos.splice(todoIndex, 1);

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.json({ message: "Todo deleted", todo: deletedTodo });
};

export { getTodos, createTodo, deleteTodo };
