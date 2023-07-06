import React, { useEffect } from "react";

function App() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [todos, setTodos] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos", {
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setTodos(data);
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
    };
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (response.ok) {
      setTodos([...todos, newTodo]);
      console.log("new todo added");
    } else {
      console.log("Failed to add todo");
    }
  };

  const handleDelete = async (id) => {
    const path = "http://localhost:3000/todos/" + id;
    const response = await fetch(path, {
      method: "DELETE", 
    });
    if(response.ok) {
      setTodos(todos.filter((todo) => todo.id !== id));
      console.log("todo deleted");
    }
    else {
      console.log("Failed to delete todo");
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            id="todo"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          {` `}
          <label htmlFor="description">Description : </label>
          <input
            type="text"
            id="description"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          {` `}
          <button type="submit">Add Todo</button>
          <br/>
        </form>
      </div>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              {`Todo: ${todo.title} - ${todo.description}`}
              {`    `}
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
              <br/>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
