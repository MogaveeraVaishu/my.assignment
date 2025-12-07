import React, { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>To-Do App</h1>

      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <button
        onClick={addTask}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      >
        Add
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {tasks.map((t, index) => (
          <li
            key={index}
            style={{
              background: "#eee",
              padding: "10px",
              margin: "5px auto",
              width: "300px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {t}
            <button
              onClick={() => deleteTask(index)}
              style={{ cursor: "pointer" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;