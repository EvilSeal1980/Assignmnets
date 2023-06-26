const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const path = require("path");
const cors = require("cors");
const port = 3000;

app.use(cors);

app.use(bodyParser.json());

let todos = new Map();
fs.readFile("./todos.json", "utf8", (err, data) => {
  if (!err) {
    todos = new Map(JSON.parse(data));
  }
});

function saveTodosToFile() {
  fs.writeFile(path, JSON.stringify([...todos]), "utf8", (err) => {
    if (err) {
      console.error("Error saving todos:", err);
    }
  });
}

const generateId = () => {
  return todos.size + 1;
};

app.get("/todos", (req, res) => {
  const todosArray = [...todos.values()];
  res.status(200).json(todosArray);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.get(parseInt(req.params.id));
  if (!todo) {
    res.status(404).json({ error: "Todo item not found" });
  } else {
    res.status(200).json(todo);
  }
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: generateId(),
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };

  todos.set(newTodo.id, newTodo);
  saveTodosToFile();
  res.status(201).json({ id: newTodo.id });
});

// Route: Update an existing todo item by ID
app.put("/todos/:id", (req, res) => {
  const todo = todos.get(parseInt(req.params.id));
  if (!todo) {
    res.status(404).json({ error: "Todo item not found" });
  } else {
    const updatedTodo = {
      ...todo,
      ...req.body,
    };
    todos.set(updatedTodo.id, updatedTodo);
    saveTodosToFile();
    res.status(200).send();
  }
});

app.delete("/todos/:id", (req, res) => {
  const todo = todos.get(parseInt(req.params.id));
  if (!todo) {
    res.status(404).json({ error: "Todo item not found" });
  } else {
    todos.delete(todo.id);
    saveTodosToFile();
    res.status(200).send();
  }
});


app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


module.exports = app;






