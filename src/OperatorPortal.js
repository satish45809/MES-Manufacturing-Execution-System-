import React, { useState } from "react";
import "./index.css";

function OperatorPortal({ entries, setEntries }) {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [filter, setFilter] = useState("pending");

  const mockTasks = [
    { _id: "1", name: "Assemble Widget A" },
    { _id: "2", name: "Inspect Widget B" },
    { _id: "3", name: "Package Widget C" }
  ];

  const handleLogin = () => {
    setUser({ username: login.username, _id: "operator1" });
    setTasks(mockTasks);
  };

  const handleStart = (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    const newEntry = {
      _id: Date.now().toString(),
      taskName: task.name,
      startTime: new Date(),
      status: "pending",
      operatorName: user.username 
    };
    setActiveTask(newEntry);
  };

  const handleStop = () => {
    const stopTime = new Date();
    const duration = Math.round((stopTime - new Date(activeTask.startTime)) / 60000);
    const completedEntry = {
      ...activeTask,
      stopTime,
      duration,
      status: "pending",
      operatorName: user.username 
    };
    setEntries([...entries, completedEntry]);
    setActiveTask(null);
  };

  const filteredEntries = entries.filter(e => e.status === filter && e.operatorName === (user && user.username));

  if (!user) {
    return (
      <div className="login-wrapper">
        <div className="login-box">
          <h2>Operator Login</h2>
          <div className="login-details-box">
            <input
              placeholder="Username"
              value={login.username}
              onChange={e => setLogin({ ...login, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={e => setLogin({ ...login, password: e.target.value })}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}</h2>
      <h3>Assigned Tasks</h3>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.name}
            {!activeTask && (
              <button onClick={() => handleStart(task._id)}>Start</button>
            )}
          </li>
        ))}
      </ul>
      {activeTask && (
        <div className="active-task-box">
          <h4>Working on: {activeTask.taskName}</h4>
          <button onClick={handleStop}>Stop</button>
        </div>
      )}
      <h3>My Entries</h3>
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <ul>
        {filteredEntries.map(entry => (
          <li key={entry._id}>
            Task: {entry.taskName} | Start: {new Date(entry.startTime).toLocaleString()} | 
            Stop: {entry.stopTime ? new Date(entry.stopTime).toLocaleString() : "In Progress"} | 
            Duration: {entry.duration ? `${entry.duration} min` : "-"} | 
            Status: {entry.status}
            {entry.status === "approved" && (
              <span style={{ color: "green", marginLeft: "10px" }}>Locked</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OperatorPortal;