import React, { useState } from "react";
import "./index.css";

function SupervisorPortal({ entries, setEntries }) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [user, setUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState("pending");
  const [filterOperator, setFilterOperator] = useState("");
  const [filterTask, setFilterTask] = useState("");

  const handleLogin = () => {
    setUser({ username: login.username });
  };

  const handleStatus = (entryId, status) => {
    setEntries(entries =>
      entries.map(e =>
        e._id === entryId ? { ...e, status } : e
      )
    );
  };

  const operators = [...new Set(entries.map(e => e.operatorName))];
  const tasks = [...new Set(entries.map(e => e.taskName))];

  const filteredEntries = entries
    .filter(e => (filterStatus ? e.status === filterStatus : true))
    .filter(e => (filterOperator ? e.operatorName === filterOperator : true))
    .filter(e => (filterTask ? e.taskName === filterTask : true));

  if (!user) {
    return (
      <div className="login-wrapper">
        <div className="login-box">
          <h2>Supervisor Login</h2>
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
      <h3>All Time Entries</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select value={filterOperator} onChange={e => setFilterOperator(e.target.value)}>
          <option value="">All Operators</option>
          {operators.map(op => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
        <select value={filterTask} onChange={e => setFilterTask(e.target.value)}>
          <option value="">All Tasks</option>
          {tasks.map(task => (
            <option key={task} value={task}>{task}</option>
          ))}
        </select>
      </div>
      <ul>
        {filteredEntries.map(entry => (
          <li key={entry._id}>
            <strong>Operator:</strong> {entry.operatorName} | <strong>Task:</strong> {entry.taskName} | 
            <strong>Start:</strong> {new Date(entry.startTime).toLocaleString()} | 
            <strong>Stop:</strong> {entry.stopTime ? new Date(entry.stopTime).toLocaleString() : "In Progress"} | 
            <strong>Duration:</strong> {entry.duration ? `${entry.duration} min` : "-"} | 
            <strong>Status:</strong> {entry.status}
            {entry.status === "pending" ? (
              <>
                <button onClick={() => handleStatus(entry._id, "approved")}>Approve</button>
                <button onClick={() => handleStatus(entry._id, "rejected")}>Reject</button>
              </>
            ) : entry.status === "approved" ? (
              <span style={{ color: "green", marginLeft: "10px" }}>Locked</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SupervisorPortal;