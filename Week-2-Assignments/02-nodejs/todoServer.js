/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */

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





